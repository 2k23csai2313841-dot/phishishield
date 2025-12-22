import History from "../models/historyModel.js";
import axios from "axios";

/**
 * Comprehensive URL validation function
 * Checks format, structure, and common patterns
 */
function validateUrlFormat(urlString) {
  try {
    // Trim whitespace
    const trimmedUrl = urlString.trim();

    if (trimmedUrl.length === 0) {
      return { valid: false, error: "URL cannot be empty" };
    }

    if (trimmedUrl.length > 2048) {
      return { valid: false, error: "URL is too long (max 2048 characters)" };
    }

    // Normalize URL by adding protocol if missing
    const url = new URL(
      trimmedUrl.startsWith("http") ? trimmedUrl : `https://${trimmedUrl}`
    );

    // Validate protocol
    if (url.protocol !== "http:" && url.protocol !== "https:") {
      return {
        valid: false,
        error: "Invalid protocol. Use http:// or https://",
      };
    }

    // Validate hostname
    const hostname = url.hostname;
    if (!hostname || hostname.length === 0) {
      return { valid: false, error: "Invalid hostname" };
    }

    // Hostname should have at least one dot (except localhost)
    if (hostname !== "localhost" && !hostname.includes(".")) {
      return { valid: false, error: "Invalid domain format" };
    }

    // Validate TLD (at least 2 characters)
    const parts = hostname.split(".");
    const tld = parts[parts.length - 1];
    if (tld.length < 2) {
      return { valid: false, error: "Invalid domain extension" };
    }

    // Check for invalid characters
    if (!/^[a-z0-9.-]+$/i.test(hostname)) {
      return { valid: false, error: "Invalid characters in domain" };
    }

    // Check for empty parts (e.g., "example..com")
    if (parts.some((part) => part === "")) {
      return { valid: false, error: "Invalid domain format (empty parts)" };
    }

    // Max domain length is 253 characters
    if (hostname.length > 253) {
      return { valid: false, error: "Domain name is too long" };
    }

    // Check each label length (max 63 chars per label)
    if (parts.some((part) => part.length > 63)) {
      return { valid: false, error: "Domain label too long" };
    }

    // Validate path/query/hash length
    const fullPath = url.pathname + url.search + url.hash;
    if (fullPath.length > 2048) {
      return { valid: false, error: "URL path is too long" };
    }

    return { valid: true };
  } catch (error) {
    return { valid: false, error: "Invalid URL format" };
  }
}

export const result = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    // Get total count
    const totalCount = await History.countDocuments({
      userId: req.session.userId,
    });

    // Get paginated history
    const history = await History.find({ userId: req.session.userId })
      .sort({ timestamp: -1 })
      .limit(limit)
      .skip(skip);

    const totalPages = Math.ceil(totalCount / limit);

    res.render("history", {
      history,
      currentPage: page,
      totalPages,
      totalCount,
      pageTitle: "History",
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    });
  } catch (err) {
    console.error(" History fetch error:", err);
    res.status(500).render("error");
  }
};

export const analyzeUrl = async (req, res) => {
  const { url } = req.body;

  // Check if user is logged in
  if (!req.session.userId) {
    return res.status(401).json({ error: "Please login to analyze URLs" });
  }

  if (!url) {
    return res.status(400).json({ error: "URL is required" });
  }

  // Validate URL format
  const urlValidation = validateUrlFormat(url);
  if (!urlValidation.valid) {
    return res.status(400).json({ error: urlValidation.error });
  }

  try {
    // =============================
    // 1. LOCAL HEURISTIC (BASE)
    // =============================
    const safe_domains = [
      "google.com",
      "microsoft.com",
      "github.com",
      "stackoverflow.com",
      "mozilla.org",
      "apple.com",
      "amazon.com",
      "facebook.com",
      "twitter.com",
      "linkedin.com",
      "youtube.com",
      "netflix.com",
      "linkedin.com",
      "slack.com",
      "notion.so",
      "figma.com",
    ];

    const suspicious_domains = [
      "bit.ly",
      "tinyurl.com",
      "t.co",
      "goo.gl",
      "ow.ly",
      "short.link",
    ];
    const malicious_patterns = [
      "g00gle",
      "micr0soft",
      "payp4l",
      "amaz0n",
      "faceb00k",
      "twitt3r",
      "appl3",
      "netfIix",
      "inst4gram",
      "linked1n",
      "yah00",
      "gmai1",
      "secure-paypal",
      "verify-account",
    ];
    const suspicious_tlds = [
      ".tk",
      ".ml",
      ".ga",
      ".cf",
      ".pw",
      ".top",
      ".click",
      ".download",
      ".xyz",
    ];

    const urlObj = new URL(url.startsWith("http") ? url : `https://${url}`);
    const domain = urlObj.hostname.toLowerCase();
    const pathname = urlObj.pathname.toLowerCase();
    const isSafeProtocol = urlObj.protocol === "https:";

    let level = "safe";
    let confidence = 95;
    let detectionFlags = [];
    let metrics = {};

    // Check for malicious patterns
    if (malicious_patterns.some((p) => domain.includes(p))) {
      level = "malicious";
      confidence = 90;
      detectionFlags.push("Malicious domain impersonation detected");
    } else if (suspicious_domains.some((d) => domain.includes(d))) {
      level = "suspicious";
      confidence = 75;
      detectionFlags.push("URL shortener detected");
    } else if (suspicious_tlds.some((tld) => domain.endsWith(tld))) {
      level = "suspicious";
      confidence = 70;
      detectionFlags.push("Suspicious TLD detected");
    }

    // Check for SQL injection
    if (
      /(\bunion\b|\bselect\b|\bdrop\b|\binsert\b|\bupdate\b|'|--|;|\*)/i.test(
        pathname
      )
    ) {
      level = "malicious";
      confidence = 95;
      detectionFlags.push("SQL injection pattern detected");
    }

    // Check for XSS patterns
    if (/(script|javascript:|onerror|onload|onclick)/i.test(url)) {
      level = "malicious";
      confidence = 95;
      detectionFlags.push("XSS pattern detected");
    }

    // Check domain length
    if (domain.length > 50) {
      detectionFlags.push("Unusually long domain");
      confidence = Math.max(confidence - 5, 0);
    }

    // Check if IP-based URL
    if (/^(\d{1,3}\.){3}\d{1,3}$/.test(domain)) {
      level = "suspicious";
      confidence = Math.min(85, confidence);
      detectionFlags.push("IP address used instead of domain");
    }

    // Check for safe domain
    const isSafeDomain = safe_domains.some((sd) => domain.includes(sd));
    if (!isSafeDomain && level === "safe") {
      confidence = Math.min(confidence, 80);
    }

    // SSL/HTTPS check
    const sslGrade = isSafeProtocol ? "A+" : "F";

    // =============================
    // 2. GOOGLE SAFE BROWSING (OPTIONAL)
    // =============================
    let googleVerdict = "unknown";
    try {
      if (process.env.GOOGLE_SAFE_BROWSING_KEY) {
        const googleRes = await axios.post(
          `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${process.env.GOOGLE_SAFE_BROWSING_KEY}`,
          {
            client: { clientId: "url-analyzer", clientVersion: "1.0" },
            threatInfo: {
              threatTypes: [
                "MALWARE",
                "SOCIAL_ENGINEERING",
                "UNWANTED_SOFTWARE",
              ],
              platformTypes: ["ANY_PLATFORM"],
              threatEntryTypes: ["URL"],
              threatEntries: [{ url }],
            },
          },
          { headers: { "Content-Type": "application/json" }, timeout: 5000 }
        );

        if (googleRes.data?.matches?.length > 0) {
          googleVerdict = "malicious";
          detectionFlags.push("Google Safe Browsing flagged this URL");
          level = "malicious";
          confidence = 95;
        } else {
          googleVerdict = "safe";
        }
      }
    } catch (e) {
      console.warn("⚠️ Google API failed:", e.message);
      googleVerdict = "unknown";
    }

    // =============================
    // 3. VIRUSTOTAL (OPTIONAL)
    // =============================
    let vtVerdict = "unknown";
    let vtEngines = 0;
    try {
      if (process.env.VIRUSTOTAL_API_KEY) {
        const vtScan = await axios.post(
          "https://www.virustotal.com/api/v3/urls",
          new URLSearchParams({ url }).toString(),
          {
            headers: {
              "x-apikey": process.env.VIRUSTOTAL_API_KEY,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            timeout: 5000,
          }
        );

        const vtId = vtScan.data.data.id;
        await new Promise((r) => setTimeout(r, 2000));

        const vtResult = await axios.get(
          `https://www.virustotal.com/api/v3/analyses/${vtId}`,
          {
            headers: { "x-apikey": process.env.VIRUSTOTAL_API_KEY },
            timeout: 5000,
          }
        );

        const stats = vtResult.data.data.attributes.stats;
        vtEngines = stats.malicious || 0;

        if (stats.malicious > 0 || stats.suspicious > 2) {
          vtVerdict = "malicious";
          detectionFlags.push(
            `VirusTotal flagged by ${stats.malicious} engines`
          );
          level = "malicious";
          confidence = 95;
        } else {
          vtVerdict = "safe";
        }
      }
    } catch (e) {
      console.warn("⚠️ VirusTotal API failed:", e.message);
      vtVerdict = "unknown";
    }

    // =============================
    // 4. ANALYSIS FACTORS
    // =============================
    const analysisFactors = [
      {
        name: "Domain Reputation",
        icon: "🌐",
        status: isSafeDomain ? "safe" : level,
        score: isSafeDomain ? 95 : confidence,
        description: "Checks domain against known malicious sources",
      },
      {
        name: "SSL Certificate",
        icon: "🔒",
        status: isSafeProtocol ? "safe" : "suspicious",
        score: isSafeProtocol ? 95 : 40,
        description: `SSL Grade: ${sslGrade}`,
      },
      {
        name: "URL Structure",
        icon: "🔗",
        status: domain.length > 50 ? "suspicious" : "safe",
        score: domain.length > 50 ? 60 : 90,
        description: "Detects obfuscation and anomalies",
      },
      {
        name: "Suspicious Indicators",
        icon: "⚠️",
        status: detectionFlags.length > 0 ? level : "safe",
        score: detectionFlags.length > 0 ? confidence : 95,
        description: `${detectionFlags.length} flags detected`,
      },
    ];

    // =============================
    // 5. METRICS
    // =============================
    metrics = {
      "Security Score": `${confidence}%`,
      "Threat Level": level.charAt(0).toUpperCase() + level.slice(1),
      Protocol: urlObj.protocol.toUpperCase(),
      "SSL Grade": sslGrade,
      "Domain Length": domain.length,
      "Detection Sources": [
        googleVerdict !== "unknown" ? "Google Safe Browsing" : null,
        vtVerdict !== "unknown" ? "VirusTotal" : null,
        "Local Analysis",
      ]
        .filter(Boolean)
        .join(", "),
    };

    // =============================
    // 6. BUILD RESPONSE
    // =============================
    const analysis = {
      level,
      score: confidence,
      flags: detectionFlags,
      factors: analysisFactors,
      metrics,
      sources: {
        local: true,
        googleSafeBrowsing: googleVerdict,
        virusTotal: { verdict: vtVerdict, engines: vtEngines },
      },
      timestamp: new Date().toISOString(),
    };

    // Save to history
    await History.create({
      userId: req.session.userId,
      action: "Analyze",
      url,
      result: level.charAt(0).toUpperCase() + level.slice(1),
    });

    // Return JSON for API consumption
    res.json({
      success: true,
      scannedUrl: url,
      analysis,
      reportUrl: `/result-report?url=${encodeURIComponent(url)}`,
    });
  } catch (err) {
    console.error("Analysis error:", err);
    res.status(500).json({
      error: "URL analysis failed",
      message: err.message,
    });
  }
};

// New endpoint to display detailed report
export const resultReport = async (req, res) => {
  try {
    // Check if user is logged in
    if (!req.session.userId) {
      return res.redirect("/login");
    }

    const { url } = req.query;
    if (!url) {
      return res.status(400).render("error", {
        error: "URL parameter is required",
      });
    }

    // Get user's history for this URL
    const history = await History.findOne({
      userId: req.session.userId,
      url: url,
    }).sort({ timestamp: -1 });

    if (!history) {
      return res.status(404).render("error", {
        error: "Analysis not found",
        currentPage: "error",
        pageTitle: "Error",
      });
    }

    res.render("resultReport", {
      url,
      history,
      currentPage: "report",
      pageTitle: "Analysis Report",
    });
  } catch (err) {
    console.error("Report fetch error:", err);
    res.status(500).render("error", {
      error: "Failed to load report",
    });
  }
};
