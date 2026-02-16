// index.js - Analytics Public API
// The entry point for the Analytics feature.

window.Analytics = (function () {
    function init() {
        // Ensure dependencies are loaded
        if (!window.AnalyticsRepository || !window.AnalyticsLogic) {
            console.error("Analytics: Dependencies missing (Repository or Logic).");
            return;
        }

        window.AnalyticsLogic.init();

        // Initialize Dashboard if available
        if (window.AnalyticsDashboard) {
            window.AnalyticsDashboard.init();
        }
    }

    function trackView(chapterIndex, totalChapters) {
        if (window.AnalyticsLogic) {
            window.AnalyticsLogic.trackView(chapterIndex, totalChapters);
        }
    }

    function getStats() {
        return window.AnalyticsLogic ? window.AnalyticsLogic.getStats() : {};
    }

    return {
        init,
        trackView,
        getStats
    };
})();
