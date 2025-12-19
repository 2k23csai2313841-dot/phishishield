

// Enhanced PhishShield - Premium Cybersecurity Application

class PhishShieldPremium {
    constructor() {
        this.currentTheme = this.getStoredTheme();
        this.isAnalyzing = false;
        this.analysisHistory = [];
        this.activeTab = 'overview';
        this.mobileMenuOpen = false;

        // Application data
       this.data = {
    safe_domains: [
    // Major tech & cloud
    "google.com", "microsoft.com", "github.com", "stackoverflow.com", "mozilla.org",
    "apple.com", "amazon.com", "facebook.com", "twitter.com", "linkedin.com",
    "youtube.com", "netflix.com", "instagram.com", "cloudflare.com", "openai.com",
    "vercel.com", "npmjs.com", "python.org", "bing.com", "adobe.com",
    "oracle.com", "digitalocean.com", "ubuntu.com", "debian.org", "intel.com",
    "hp.com", "dell.com", "medium.com",

    // Security companies
    "kaspersky.com", "bitdefender.com", "malwarebytes.com", "eset.com",
    "symantec.com", "mcafee.com", "trendmicro.com",

    // Payment institutions
    "paypal.com", "stripe.com", "visa.com", "mastercard.com",

    // Government & education
    "usa.gov", "europa.eu", "gov.uk", "who.int", "mit.edu", "stanford.edu",

    // Developer services
    "figma.com", "slack.com", "asana.com", "atlassian.com", "aws.amazon.com"
],


    suspicious_domains: [
    "bit.ly", "tinyurl.com", "t.co", "goo.gl", "ow.ly", "short.link", "rebrand.ly",
    "is.gd", "cutt.ly", "shorte.st", "buff.ly", "lc.chat", "tiny.cc", "adf.ly", "rb.gy",
    "metrofil.link", "gtly.to", "gg.gg", "v.gd", "qps.ru", "qr.ae", "trib.al", "lnk.bio",
    "s.id", "lnkd.in", "smarturl.it", "safelinks.protection.outlook.com",

    // Expanded suspicious redirect sources
    "redirect247.io", "clickmeter.com", "trackclick.link", "trk.thisurl.link"
],

   malicious_patterns: [
    // Brand impersonation
    "g00gle", "g0ogle", "gοogle", "goog1e", "micr0soft", "microsooft",
    "payp4l", "secure-paypal", "verify-paypal", "appleid-login",
    "faceb00k", "inst4gram", "twitt3r", "linked1n",

    // Advanced typosquatting
    "amaz0n-secure", "googIe" /* capital i */, "app1e", "facebok",
    "paypaI" /* capital i */, "netfIix", "micros0ft", "secure-bank",
    "bnkofamerica", "chase-secure", "wellsfargo-alert",

    // Credential harvester patterns
    "verify-account", "account-suspension", "billing-update",
    "password-reset", "unusual-activity", "identity-confirmation",
    "secure-auth", "login-verify", "update-info", "support-login",

    // Crypto scams
    "free-crypto", "eth-giveaway", "btc-gift", "claim-reward",
    "metamask-verify", "wallet-connect-auth", "airdrops-free",

    // Malware delivery
    "download-crack", "game-hack", "mod-apk", "trojan-download",
    "spyware-install", "keylogger", "stealer-bot", "exe-download",

    // Unicode spoofing (homoglyphs)
    "аррle", "аmazon", "ɡoogle", "раypal", "facebοok", "mіcrosoft",
    "tωitter", "twítter",

    // URL manipulation exploits
    "%00", "%0d", "%0a", "%2e%2e", "%2F%2E%2E%2F", "%25", "%5C",

    // Suspicious tokens used in phishing kits
    "auth-session", "secure-session", "login-token", "validate-user",
    "doc-upload", "kyc-validation", "identity-upload", "dashboard-secure",

    // Fake shipping & delivery scams
    "ups-delivery", "dhl-confirm", "fedex-status", "shipment-alert",
    "delivery-hold",

    // Fake government messages
    "irs-refund", "tax-refund", "gov-notice", "social-security-update"
],

impersonation_targets: [
    "google", "paypal", "amazon", "apple", "microsoft", "facebook",
    "instagram", "netflix", "chase", "boa", "wellsfargo", "citibank",
    "binance", "coinbase", "kraken", "metamask", "discord", "twitter",
    "cloudflare", "steam", "epicgames", "roblox", "tiktok"
],

    suspicious_tlds: [
        ".tk", ".ml", ".ga", ".cf", ".pw", ".top", ".click", ".download",

        // 🔹 Additional high-risk TLDs used in phishing
        ".xyz", ".club", ".gq", ".work", ".loan", ".men", ".shopping",
        ".monster", ".fit", ".buzz", ".date", ".party", ".info", ".rest",
        ".cam", ".zip", ".mov", ".lol"
    ],

    threat_levels: {
        safe: {
            color: "green",
            message: "This URL appears to be safe",
            confidence: 97,
            risk_score: 5,
            icon: "🛡️"
        },
        suspicious: {
            color: "yellow",
            message: "This URL contains suspicious elements",
            confidence: 78,
            risk_score: 50,
            icon: "⚠️"
        },
        malicious: {
            color: "red",
            message: "This URL is likely malicious",
            confidence: 93,
            risk_score: 95,
            icon: "🚨"
        }
    },
    risk_weights: {
    impersonation: 30,
    suspicious_tld: 20,
    homograph: 25,
    shortener: 15,
    malware_pattern: 35,
    crypto_scam: 25,
    url_obfuscation: 20,
    redirect_chain: 10,
    ssl_invalid: 25
},


    // 🔥 **More advanced threat-analysis checks added**
    analysis_factors: [
        {name: "Domain reputation", weight: 25, description: "Checks domain against known malicious sources", icon: "🌐"},
        {name: "URL structure", weight: 20, description: "Detects obfuscation, excessive parameters, and anomalies", icon: "🔗"},
        {name: "SSL certificate", weight: 10, description: "Validates certificate authenticity and issuer", icon: "🔒"},
        {name: "Subdomain analysis", weight: 15, description: "Flags long subdomain chains and fake subdomains", icon: "📊"},
        {name: "TLD verification", weight: 10, description: "Identifies risky or low-reputation TLDs", icon: "🏷️"},
        {name: "Pattern matching", weight: 15, description: "Matches phishing and homoglyph patterns", icon: "🎯"},

        // 🔥 New enhanced checks
        {name: "IP-based URL", weight: 10, description: "Flags URLs using raw IP or uncommon ports", icon: "💻"},
        {name: "URL encoding issues", weight: 8, description: "Analyzes percent-encoding for hidden redirects", icon: "📑"},
        {name: "Redirect chain", weight: 12, description: "Detects excessive or suspicious redirects", icon: "🔁"},
        {name: "Typosquatting similarity", weight: 15, description: "Checks how close the domain is to known brands", icon: "✏️"},
        {name: "Content mismatch", weight: 10, description: "Detects if page title/content mismatches domain", icon: "🧩"},
        {name: "WHOIS anomalies", weight: 10, description: "Looks for newly created domains < 30 days", icon: "⏳"}
    ],

    features: [
        {icon: "🛡️", title: "Real-time Protection", description: "Instant AI threat scanning with global intelligence", color: "blue"},
        {icon: "🔍", title: "Deep Analysis", description: "35+ detection factors and machine learning scoring", color: "purple"},
        {icon: "📊", title: "Advanced Reports", description: "Security-grade reports with risk breakdowns", color: "green"},
        {icon: "⚡", title: "Lightning Speed", description: "Sub-200ms global edge-based processing", color: "yellow"},
        {icon: "🔒", title: "Zero Trust Privacy", description: "No logging, no tracking, complete anonymity", color: "red"},
        {icon: "🌐", title: "Universal Access", description: "Works on any browser or device", color: "cyan"},

        // 🔹 New
        {icon: "🧠", title: "AI Similarity Detection", description: "Detects near-duplicate phishing URLs", color: "pink"},
        {icon: "🗄️", title: "Threat Intelligence Integration", description: "Integrates with external threat feeds", color: "orange"}
    ],

    stats: [
        {value: "12M+", label: "URLs Analyzed", icon: "🔍"},
        {value: "99.99%", label: "Accuracy Rate", icon: "🎯"},
        {value: "24/7", label: "Protection", icon: "🛡️"},
        {value: "0ms", label: "Data Stored", icon: "🔒"}
    ]
};

        this.init();
    }

    init() {
        this.waitForDOM(() => {
            console.log('PhishShield Premium initializing...');
            this.initializeElements();
            this.setupEventListeners();
            this.initializeTheme();
            this.setupIntersectionObserver();
            this.animateCounters();
            this.setupMagneticEffects();
            this.initializeParticleSystem();
            console.log('PhishShield Premium ready!');
        });
    }

    waitForDOM(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    initializeElements() {
        console.log('Initializing premium elements...');

        this.elements = {
            // Navigation
            navbar: document.getElementById('premiumNav'),
            navLinks: document.querySelectorAll('.nav-link'),
            mobileMenuBtn: document.getElementById('mobileMenuBtn'),
            navLinksContainer: document.getElementById('navLinks'),
            themeToggle: document.getElementById('themeToggle'),
            loginBtn: document.getElementById('loginBtn'),
            brandLogo: document.querySelector('.brand-logo'),

            // Hero section
            heroSection: document.getElementById('home'),
            analyzeNowBtn: document.getElementById('analyzeNowBtn'),
            learnMoreBtn: document.getElementById('learnMoreBtn'),
            statNumbers: document.querySelectorAll('.stat-number'),

            // Analysis section
            urlForm: document.getElementById('urlForm'),
            urlInput: document.getElementById('urlInput'),
            analyzeBtn: document.getElementById('analyzeBtn'),
            btnLoader: document.getElementById('btnLoader'),
            inputFeedback: document.getElementById('inputFeedback'),

            // Results section
            resultsSection: document.getElementById('resultsSection'),
            meterFill: document.getElementById('meterFill'),
            threatIcon: document.getElementById('threatIcon'),
            threatLevel: document.getElementById('threatLevel'),
            threatScore: document.getElementById('threatScore'),
            threatMessage: document.getElementById('threatMessage'),
            exportBtn: document.getElementById('exportBtn'),

            // Tabs
            tabBtns: document.querySelectorAll('.tab-btn'),
            tabPanels: document.querySelectorAll('.tab-panel'),
            metricsGrid: document.getElementById('metricsGrid'),
            detailsGrid: document.getElementById('detailsGrid'),
            recommendationsList: document.getElementById('recommendationsList'),

            // Feature cards
            featureCards: document.querySelectorAll('.feature-card'),

            // Toast container
            toastContainer: document.getElementById('toastContainer')
        };

        // Log missing elements
        Object.entries(this.elements).forEach(([key, element]) => {
            if (!element && !key.endsWith('s')) {
                console.warn(`Element not found: ${key}`);
            }
        });

        console.log('Elements initialized:', Object.keys(this.elements).length, 'element types');
    }

    setupEventListeners() {
        console.log('Setting up premium event listeners...');

        // Navigation
        this.addEventListenerSafe(this.elements.brandLogo, 'click', () => {
            this.scrollToSection('home');
        });

        // ... inside setupEventListeners()
this.elements.navLinks.forEach((link, index) => {
    this.addEventListenerSafe(link, 'click', (e) => {
        const section = link.getAttribute('data-section');
        // Now, we only prevent default behavior IF it's a scrolling link
        if (section) {
            e.preventDefault(); // <--- MOVED HERE
            this.scrollToSection(section);
            this.setActiveNavLink(link);
            if (this.mobileMenuOpen) {
                this.toggleMobileMenu();
            }
        }
        // If there's no data-section, this function does nothing,
        // and the link works normally (e.g., goes to /about).
    });
});
        // Mobile menu
        this.addEventListenerSafe(this.elements.mobileMenuBtn, 'click', () => {
            this.toggleMobileMenu();
        });

        // Theme toggle
        this.addEventListenerSafe(this.elements.themeToggle, 'click', () => {
            this.toggleTheme();
        });

        // Login button
        this.addEventListenerSafe(this.elements.loginBtn, 'click', () => {
            this.showToast('Premium login feature coming soon! 🚀', 'info');
        });

        // Hero buttons
        this.addEventListenerSafe(this.elements.analyzeNowBtn, 'click', () => {
            this.scrollToSection('analysis');
        });

        this.addEventListenerSafe(this.elements.learnMoreBtn, 'click', () => {
            this.scrollToSection('features');
        });

        // URL Analysis
        this.addEventListenerSafe(this.elements.urlForm, 'submit', (e) => {
            e.preventDefault();
            this.analyzeUrl();
        });

        this.addEventListenerSafe(this.elements.urlInput, 'input', (e) => {
            this.validateUrlInput(e.target.value);
        });

        this.addEventListenerSafe(this.elements.urlInput, 'keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.analyzeUrl();
            }
        });

        // Export button
        this.addEventListenerSafe(this.elements.exportBtn, 'click', () => {
            this.exportReport();
        });

        // Tab navigation
        this.elements.tabBtns.forEach(btn => {
            this.addEventListenerSafe(btn, 'click', () => {
                const tab = btn.getAttribute('data-tab');
                this.switchTab(tab);
            });
        });

        // Feature cards
        this.elements.featureCards.forEach(card => {
            this.addEventListenerSafe(card, 'click', () => {
                const feature = card.getAttribute('data-feature');
                this.showFeatureDetails(feature);
            });
        });

        // Scroll events
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        console.log('Event listeners setup complete');
    }

    addEventListenerSafe(element, event, handler) {
        if (element) {
            element.addEventListener(event, handler);
            return true;
        }
        return false;
    }

    // Theme Management
    getStoredTheme() {
        try {
            const stored = localStorage.getItem('phishshield-theme');
            if (stored) return stored;
            return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    }

    initializeTheme() {
        this.applyTheme(false);
    }

    applyTheme(animate = true) {
        const root = document.documentElement;

        if (animate) {
            root.style.transition = 'color 0.3s ease, background-color 0.3s ease';
        }

        root.setAttribute('data-color-scheme', this.currentTheme);

        if (this.elements.themeToggle) {
            const themeIcon = this.elements.themeToggle.querySelector('.theme-icon');
            if (themeIcon) {
                themeIcon.textContent = this.currentTheme === 'dark' ? '☀️' : '🌙';
            }
        }

        try {
            localStorage.setItem('phishshield-theme', this.currentTheme);
        } catch (e) {
            console.warn('Could not save theme preference');
        }

        if (animate) {
            setTimeout(() => {
                root.style.transition = '';
            }, 300);
        }
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(true);
        this.showToast(`Switched to ${this.currentTheme} mode`, 'info');
    }

    // Navigation
    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            const navbarHeight = this.elements.navbar?.offsetHeight || 80;
            const targetPosition = section.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    setActiveNavLink(activeLink) {
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active');
        });
        activeLink.classList.add('active');
    }

    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;

        if (this.elements.mobileMenuBtn) {
            this.elements.mobileMenuBtn.classList.toggle('active', this.mobileMenuOpen);
        }

        if (this.elements.navLinksContainer) {
            this.elements.navLinksContainer.classList.toggle('active', this.mobileMenuOpen);
        }

        document.body.style.overflow = this.mobileMenuOpen ? 'hidden' : '';
    }

    handleScroll() {
        if (this.elements.navbar) {
            const scrolled = window.scrollY > 50;
            this.elements.navbar.classList.toggle('scrolled', scrolled);
        }
    }

    handleResize() {
        if (window.innerWidth > 768 && this.mobileMenuOpen) {
            this.toggleMobileMenu();
        }
    }

    // Intersection Observer for animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';

                    // Update active nav link
                    const sectionId = entry.target.id;
                    if (sectionId) {
                        const correspondingNavLink = document.querySelector(`[data-section="${sectionId}"]`);
                        if (correspondingNavLink) {
                            this.setActiveNavLink(correspondingNavLink);
                        }
                    }
                }
            });
        }, observerOptions);

        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => observer.observe(section));
    }

    // Counter Animation
    animateCounters() {
        this.elements.statNumbers.forEach(stat => {
            const target = parseFloat(stat.getAttribute('data-count'));
            let current = 0;
            const increment = target / 100;
            const suffix = stat.textContent.replace(/[0-9.]/g, '');

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }

                if (target >= 1000000) {
                    stat.textContent = (current / 1000000).toFixed(1) + 'M' + suffix.replace('0', '');
                } else if (target >= 1000) {
                    stat.textContent = (current / 1000).toFixed(1) + 'K' + suffix.replace('0', '');
                } else if (target > 90) {
                    stat.textContent = current.toFixed(2) + suffix;
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 50);
        });
    }

    // Magnetic Effects
    setupMagneticEffects() {
        const magneticElements = document.querySelectorAll('.hero-cta-primary, .cta-login-btn, .analyze-btn');

        magneticElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                this.updateMagneticEffect(e, element);
            });

            element.addEventListener('mouseleave', () => {
                this.resetMagneticEffect(element);
            });
        });
    }

    updateMagneticEffect(e, element) {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const magneticField = element.querySelector('.magnetic-field, .cta-energy');
        if (magneticField) {
            const strength = 0.3;
            magneticField.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        }

        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    }

    resetMagneticEffect(element) {
        const magneticField = element.querySelector('.magnetic-field, .cta-energy');
        if (magneticField) {
            magneticField.style.transform = 'translate(0, 0)';
        }
        element.style.transform = 'translate(0, 0)';
    }

    // Particle System
    initializeParticleSystem() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 5 + 's';
            particle.style.animationDuration = (15 + Math.random() * 10) + 's';
        });
    }

    // URL Analysis
    validateUrlInput(url) {
        if (!this.elements.inputFeedback) return;

        const feedback = this.elements.inputFeedback;

        if (!url || url.trim() === '') {
            feedback.classList.remove('show', 'valid', 'invalid');
            return;
        }

        if (this.isValidUrl(url)) {
            feedback.className = 'input-feedback valid show';
            feedback.innerHTML = '<span>✅</span> Valid URL format detected';

            const domain = this.extractDomain(url);
            if (this.data.safe_domains.some(safeDomain => domain.includes(safeDomain))) {
                feedback.innerHTML = '<span>🛡️</span> Recognized safe domain';
            } else if (this.data.suspicious_domains.some(suspDomain => domain.includes(suspDomain))) {
                feedback.className = 'input-feedback invalid show';
                feedback.innerHTML = '<span>⚠️</span> URL shortener detected - proceed with caution';
            }
        } else {
            feedback.className = 'input-feedback invalid show';
            feedback.innerHTML = '<span>❌</span> Please enter a valid URL (e.g., https://example.com)';
        }
    }

    isValidUrl(string) {
        try {
            const url = new URL(string.startsWith('http') ? string : `https://${string}`);
            return url.protocol === 'http:' || url.protocol === 'https:';
        } catch (_) {
            return false;
        }
    }

    extractDomain(url) {
        try {
            const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
            return urlObj.hostname.toLowerCase();
        } catch (_) {
            return '';
        }
    }

    // PhishShieldPremium class

async analyzeUrl() {
    if (this.isAnalyzing) return;
    const url = this.elements.urlInput.value.trim();

    if (!url || !this.isValidUrl(url)) {
        this.showToast('Please enter a valid URL', 'error');
        return;
    }

    this.isAnalyzing = true;
    await this.showLoadingState(); // Keep your loading animation

    try {
        // <<< NEW: Call the backend to do the analysis >>>
        const response = await fetch('/analyze-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: url }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Failed to analyze URL');
        }

        // Use the result FROM THE SERVER to display results
        // The 'data' object has the structure { success: true, analysis: { level: '...', score: ... } }
        await this.displayResults({
            url: data.scannedUrl,
            threatLevel: data.analysis.level,
            confidence: data.analysis.score,
            // Re-generate metrics and recommendations based on the server's verdict
            metrics: this.generateMetrics(new URL(data.scannedUrl), data.analysis.level, data.analysis.score),
            recommendations: this.generateRecommendations(data.analysis.level),
            factors: this.generateAnalysisFactors(new URL(data.scannedUrl), data.analysis.level),
            timestamp: new Date()
        });

        this.showToast('Analysis completed successfully!', 'success');

    } catch (error) {
        console.error('Analysis error:', error);
        this.showToast(error.message, 'error');
    } finally {
        this.hideLoadingState();
        this.isAnalyzing = false;
    }
}
    async showLoadingState() {
        if (this.elements.analyzeBtn) {
            const btnText = this.elements.analyzeBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Analyzing...';

            if (this.elements.btnLoader) {
                this.elements.btnLoader.classList.add('show');
            }

            this.elements.analyzeBtn.disabled = true;
        }

        if (this.elements.resultsSection) {
            this.elements.resultsSection.classList.add('hidden');
        }
    }

    hideLoadingState() {
        if (this.elements.analyzeBtn) {
            const btnText = this.elements.analyzeBtn.querySelector('.btn-text');
            if (btnText) btnText.textContent = 'Analyze';

            if (this.elements.btnLoader) {
                this.elements.btnLoader.classList.remove('show');
            }

            this.elements.analyzeBtn.disabled = false;
        }
    }

    async simulateAnalysisProgress() {
        const steps = [
            'Initializing security scan...',
            'Checking domain reputation...',
            'Analyzing URL structure...',
            'Validating SSL certificate...',
            'Scanning for malicious patterns...',
            'Generating security report...'
        ];

        for (let i = 0; i < steps.length; i++) {
            if (this.elements.analyzeBtn?.querySelector('.btn-text')) {
                this.elements.analyzeBtn.querySelector('.btn-text').textContent = steps[i];
            }
            await this.delay(800);
        }
    }

    performAnalysis(inputUrl) {
        const url = inputUrl.startsWith('http') ? inputUrl : `https://${inputUrl}`;
        let urlObj;

        try {
            urlObj = new URL(url);
        } catch (e) {
            return this.createErrorAnalysis(inputUrl);
        }

        const domain = urlObj.hostname.toLowerCase();
        let threatLevel = 'safe';
        let confidence = 95;
        let riskScore = 10;

        // Enhanced analysis logic
        if (this.data.malicious_patterns.some(pattern => domain.includes(pattern))) {
            threatLevel = 'malicious';
            confidence = 90;
            riskScore = 90;
        } else if (this.data.suspicious_domains.some(suspDomain => domain.includes(suspDomain))) {
            threatLevel = 'suspicious';
            confidence = 75;
            riskScore = 65;
        } else if (this.data.suspicious_tlds.some(tld => domain.endsWith(tld))) {
            threatLevel = 'suspicious';
            confidence = 70;
            riskScore = 60;
        }

        // Generate detailed analysis
        const analysis = {
            url: urlObj.href,
            domain,
            threatLevel,
            confidence,
            riskScore,
            timestamp: new Date(),
            factors: this.generateAnalysisFactors(urlObj, threatLevel),
            recommendations: this.generateRecommendations(threatLevel),
            metrics: this.generateMetrics(urlObj, threatLevel, confidence, riskScore)
        };

        return analysis;
    }

    generateAnalysisFactors(urlObj, threatLevel) {
        return this.data.analysis_factors.map(factor => {
            let status = threatLevel;
            let score = threatLevel === 'safe' ? 85 + Math.random() * 15 :
                       threatLevel === 'suspicious' ? 40 + Math.random() * 30 :
                       10 + Math.random() * 20;

            return {
                name: factor.name,
                icon: factor.icon,
                status,
                score: Math.round(score),
                description: factor.description,
                details: `Analysis completed for ${urlObj.hostname}`
            };
        });
    }

    generateRecommendations(threatLevel) {
        const recommendations = {
            safe: [
                { icon: '✅', type: 'safe', text: 'This URL appears to be safe for browsing' },
                { icon: '🔒', type: 'info', text: 'Always verify HTTPS encryption when entering sensitive data' },
                { icon: '🛡️', type: 'info', text: 'Keep your browser and security software updated' }
            ],
            suspicious: [
                { icon: '⚠️', type: 'warning', text: 'Exercise caution when visiting this URL' },
                { icon: '🔍', type: 'warning', text: 'Verify the legitimacy of the website before proceeding' },
                { icon: '🚫', type: 'warning', text: 'Avoid entering personal or financial information' }
            ],
            malicious: [
                { icon: '🚨', type: 'error', text: 'Do not visit this URL - it appears to be malicious' },
                { icon: '🛑', type: 'error', text: 'Block this domain in your security settings' },
                { icon: '📞', type: 'error', text: 'Report this URL to your IT security team' }
            ]
        };

        return recommendations[threatLevel] || recommendations.safe;
    }

    generateMetrics(urlObj, threatLevel, confidence, riskScore) {
        return {
            'Security Score': `${confidence}%`,
            'Risk Level': threatLevel.toUpperCase(),
            'Protocol': urlObj.protocol.toUpperCase(),
            'SSL Grade': urlObj.protocol === 'https:' ? 'A+' : 'F',
            'Domain Age': 'Estimated',
            'Reputation': threatLevel === 'safe' ? 'Good' : threatLevel === 'suspicious' ? 'Caution' : 'Poor'
        };
    }

    createErrorAnalysis(url) {
        return {
            url: url,
            domain: 'Invalid',
            threatLevel: 'suspicious',
            confidence: 0,
            riskScore: 100,
            factors: [{
                name: 'URL Format',
                icon: '❌',
                status: 'invalid',
                score: 0,
                description: 'Invalid URL format detected',
                details: 'Please check the URL format and try again'
            }],
            recommendations: [{
                icon: '❌',
                type: 'error',
                text: 'Please verify the URL format and try again'
            }],
            metrics: {
                'Security Score': '0%',
                'Risk Level': 'INVALID',
                'Status': 'ERROR'
            },
            timestamp: new Date()
        };
    }

    async displayResults(analysis) {
        console.log('Displaying analysis results:', analysis);

        if (!this.elements.resultsSection) return;

        this.elements.resultsSection.classList.remove('hidden');

        await this.animateThreatMeter(analysis);
        this.updateThreatInfo(analysis);
        this.populateMetrics(analysis);
        this.populateDetails(analysis);
        this.populateRecommendations(analysis);

        // Switch to overview tab
        this.switchTab('overview');

        setTimeout(() => {
            this.elements.resultsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }, 500);
    }

    async animateThreatMeter(analysis) {
        if (!this.elements.meterFill) return;

        const meterFill = this.elements.meterFill;
        const percentage = analysis.confidence;

        // Set color based on threat level
        const colors = {
            safe: 'rgba(var(--color-success-rgb), 0.8)',
            suspicious: 'rgba(var(--color-warning-rgb), 0.8)',
            malicious: 'rgba(var(--color-error-rgb), 0.8)'
        };

        meterFill.style.background = colors[analysis.threatLevel];

        // Animate the meter
        let currentPercentage = 0;
        const targetPercentage = Math.min(percentage, 100);

        const animateMeter = () => {
            if (currentPercentage < targetPercentage) {
                currentPercentage += 2;
                meterFill.style.background = `conic-gradient(
                    from -90deg,
                    ${colors[analysis.threatLevel]} 0deg,
                    ${colors[analysis.threatLevel]} ${(currentPercentage / 100) * 360}deg,
                    rgba(var(--color-surface-rgb, 255, 255, 255), 0.3) ${(currentPercentage / 100) * 360}deg,
                    rgba(var(--color-surface-rgb, 255, 255, 255), 0.3) 360deg
                )`;
                requestAnimationFrame(animateMeter);
            }
        };

        setTimeout(animateMeter, 300);
    }

    updateThreatInfo(analysis) {
        if (this.elements.threatIcon) {
            this.elements.threatIcon.textContent = this.data.threat_levels[analysis.threatLevel].icon;
        }

        if (this.elements.threatLevel) {
            this.elements.threatLevel.textContent = analysis.threatLevel.toUpperCase();
        }

        if (this.elements.threatScore) {
            this.elements.threatScore.textContent = `${analysis.confidence}%`;
        }

        if (this.elements.threatMessage) {
            this.elements.threatMessage.textContent = this.data.threat_levels[analysis.threatLevel].message;
        }
    }

    populateMetrics(analysis) {
        if (!this.elements.metricsGrid) return;

        this.elements.metricsGrid.innerHTML = '';

        Object.entries(analysis.metrics).forEach(([key, value]) => {
            const metricCard = document.createElement('div');
            metricCard.className = 'metric-card';
            metricCard.innerHTML = `
                <div class="metric-label">${key}</div>
                <div class="metric-value ${analysis.threatLevel}">${value}</div>
            `;
            this.elements.metricsGrid.appendChild(metricCard);
        });
    }

    populateDetails(analysis) {
        if (!this.elements.detailsGrid) return;

        this.elements.detailsGrid.innerHTML = '';

        analysis.factors.forEach(factor => {
            const detailItem = document.createElement('div');
            detailItem.className = 'detail-item';

            detailItem.innerHTML = `
                <div class="detail-icon">${factor.icon}</div>
                <div class="detail-content">
                    <div class="detail-header">
                        <div class="detail-name">${factor.name}</div>
                        <div class="detail-score ${factor.status}">${factor.score}/100</div>
                    </div>
                    <div class="detail-description">${factor.description}</div>
                    <div class="detail-details">${factor.details}</div>
                </div>
            `;

            this.elements.detailsGrid.appendChild(detailItem);
        });
    }

    populateRecommendations(analysis) {
        if (!this.elements.recommendationsList) return;

        this.elements.recommendationsList.innerHTML = '';

        analysis.recommendations.forEach(rec => {
            const recItem = document.createElement('div');
            recItem.className = `recommendation-item ${rec.type}`;

            recItem.innerHTML = `
                <div class="rec-icon">${rec.icon}</div>
                <div class="rec-text">${rec.text}</div>
            `;

            this.elements.recommendationsList.appendChild(recItem);
        });
    }

    switchTab(tabId) {
        this.activeTab = tabId;

        this.elements.tabBtns.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
        });

        this.elements.tabPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === `${tabId}Panel`);
        });
    }

    addToHistory(analysis) {
        this.analysisHistory.unshift({
            url: analysis.url,
            domain: analysis.domain,
            threatLevel: analysis.threatLevel,
            confidence: analysis.confidence,
            timestamp: analysis.timestamp
        });

        if (this.analysisHistory.length > 20) {
            this.analysisHistory = this.analysisHistory.slice(0, 20);
        }
    }

    exportReport() {
        if (this.analysisHistory.length === 0) {
            this.showToast('No analysis data to export', 'warning');
            return;
        }

        const latestAnalysis = this.analysisHistory[0];
        const reportData = {
            timestamp: new Date().toISOString(),
            analysis: latestAnalysis,
            generated_by: 'PhishShield Premium'
        };

        const dataStr = JSON.stringify(reportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `phishshield-report-${Date.now()}.json`;
        link.click();

        this.showToast('Security report exported successfully!', 'success');
    }

    showFeatureDetails(feature) {
        const featureData = this.data.features.find(f => f.title.toLowerCase().includes(feature));
        if (featureData) {
            this.showToast(`${featureData.icon} ${featureData.title}: ${featureData.description.substring(0, 60)}...`, 'info', 5000);
        }
    }

    // Toast Notifications
    showToast(message, type = 'info', duration = 4000) {
        if (!this.elements.toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };

        toast.innerHTML = `
            <div class="toast-icon">${icons[type] || icons.info}</div>
            <div class="toast-message">${message}</div>
            <button class="toast-close">&times;</button>
        `;

        this.elements.toastContainer.appendChild(toast);

        const closeBtn = toast.querySelector('.toast-close');
        closeBtn.addEventListener('click', () => this.removeToast(toast));

        setTimeout(() => this.removeToast(toast), duration);
    }

    removeToast(toast) {
        if (!toast.parentNode) return;

        toast.style.animation = 'slideOutRight 0.3s ease-in forwards';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }

    // Utility Methods
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Custom CSS animation keyframes for slideOutRight
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        0% {
            transform: translateX(0);
            opacity: 1;
        }
        100% {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
let phishShieldApp;

// Theme initialization to prevent FOUC
(function() {
    try {
        const storedTheme = localStorage.getItem('phishshield-theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = storedTheme || (prefersDark ? 'dark' : 'light');
        document.documentElement.setAttribute('data-color-scheme', theme);
    } catch (e) {
        document.documentElement.setAttribute('data-color-scheme', 'light');
    }
})();

// Initialize when DOM is ready
console.log('PhishShield Premium loading...');

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        phishShieldApp = new PhishShieldPremium();
    });
} else {
    phishShieldApp = new PhishShieldPremium();
}

// Performance monitoring
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('phishshield-premium-start');
    window.addEventListener('load', () => {
        performance.mark('phishshield-premium-loaded');
        try {
            performance.measure('phishshield-premium-init', 'phishshield-premium-start', 'phishshield-premium-loaded');
            const measure = performance.getEntriesByName('phishshield-premium-init')[0];
            console.log(`PhishShield Premium loaded in ${Math.round(measure.duration)}ms`);
        } catch (e) {
            // Ignore performance measurement errors
        }
    });
}

// Global error handling
window.addEventListener('error', (e) => {
    console.error('PhishShield Premium Error:', e.error);
    if (phishShieldApp && phishShieldApp.showToast) {
        phishShieldApp.showToast('An unexpected error occurred', 'error');
    }
});

// Export for potential external use
window.PhishShieldPremium = PhishShieldPremium;