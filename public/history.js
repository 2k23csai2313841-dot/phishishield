// History Page JavaScript Implementation
class HistoryManager {
  constructor(historyData) {
    this.historyData = historyData || [];
    this.init();
  }

  init() {
    // Wait for DOM to be fully loaded
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", () => this.render());
    } else {
      this.render();
    }
  }

  render() {
    const tbody = document.querySelector("tbody");

    if (!tbody) {
      console.warn("tbody element not found");
      return;
    }

    if (this.historyData.length === 0) {

      return;
    }


    this.renderHistory(tbody);
  }

  getStatusClass(result) {
    const resultText = result.toLowerCase();

    if (resultText.includes("safe")) {
      return {
        class: "bg-green-500/20 text-green-400",
        emoji: "✅",
      };
    } else if (resultText.includes("suspicious")) {
      return {
        class: "bg-yellow-500/20 text-yellow-400",
        emoji: "⚠️",
      };
    } else if (
      resultText.includes("phishing") ||
      resultText.includes("malicious")
    ) {
      return {
        class: "bg-red-500/20 text-red-400",
        emoji: "🚨",
      };
    }

    return {
      class: "bg-gray-600 text-gray-100",
      emoji: "❓",
    };
  }

  formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });
  }

  renderHistory(tbody) {
    // Clear existing rows
    tbody.innerHTML = "";

    // Create rows for each history item
    this.historyData.forEach((item) => {
      const status = this.getStatusClass(item.result);

      const row = document.createElement("tr");
      row.className = "hover:bg-gray-700/50 transition-colors duration-150";

      row.innerHTML = `
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
          ${this.formatTimestamp(item.timestamp)}
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-300 max-w-md truncate">
          <a
            href="${item.url}"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-blue-400 hover:underline"
            title="${item.url}"
          >
            ${item.url}
          </a>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <span
            class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              status.class
            }"
          >
            <span class="mr-2">${status.emoji}</span>
            ${item.result}
          </span>
        </td>
      `;

      tbody.appendChild(row);
    });
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  // Get history data from the page (passed via EJS)
  const historyDataElement = document.getElementById("historyData");

  if (historyDataElement) {
    try {
      const rawData = historyDataElement.textContent.trim();

      const historyData = JSON.parse(rawData);
      new HistoryManager(historyData);
    } catch (error) {
      console.error("Error parsing history data:", error);
      console.error("Raw content:", historyDataElement.textContent);
    }
  } else {
    console.warn("historyData element not found");
  }
});
