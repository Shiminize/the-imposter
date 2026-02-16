// repository.js - Analytics Data Persistence Layer
// Handles saving/loading analytics data.
// Currently uses localStorage, but designed to sway to a remote API.

const AnalyticsRepository = (function () {
    const STORAGE_KEY = 'pocket_reader_analytics';
    const POSTHOG_API_KEY = 'phc_rdsRG7990jK9zZIOo7pQr03DgDQpGJQO3ZvrTBh8tPO';
    const POSTHOG_HOST = 'https://us.i.posthog.com'; // Default US host, can be EU if needed

    // Initialize PostHog
    if (window.posthog) {
        try {
            posthog.init(POSTHOG_API_KEY, {
                api_host: POSTHOG_HOST,
                person_profiles: 'always' // Ensure all users are tracked
            });
        } catch (e) {
            console.warn("Analytics: PostHog init failed", e);
        }
    } else {
        // Dynamically load PostHog if not present (optional, but good for standalone)
        !function (t, e) { var o, n, p, r; e.__SV || (window.posthog = e, e._i = [], e.init = function (i, s, a) { function g(t, e) { var o = e.split("."); 2 == o.length && (t = t[o[0]], e = o[1]), t[e] = function () { t.push([e].concat(Array.prototype.slice.call(arguments, 0))) } } (p = t.createElement("script")).type = "text/javascript", p.async = !0, p.src = s.api_host + "/static/array.js", (r = t.getElementsByTagName("script")[0]).parentNode.insertBefore(p, r); var u = e; for (void 0 !== a ? u = e[a] = [] : a = "posthog", u.people = u.people || [], u.toString = function (t) { var e = "posthog"; return "posthog" !== a && (e += "." + a), t || (e += " (stub)"), e }, u.people.toString = function () { return u.toString(1) + ".people (stub)" }, o = "capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys getNextSurveyStep".split(" "), n = 0; n < o.length; n++)g(u, o[n]); e._i.push([i, s, a]) }, e.__SV = 1) }(document, window.posthog || []);

        try {
            posthog.init(POSTHOG_API_KEY, {
                api_host: POSTHOG_HOST,
                person_profiles: 'always' // Ensure all users are tracked
            });
        } catch (e) { console.warn("Analytics: PostHog lazy load init failed", e); }
    }

    // Default empty state
    const defaultData = {
        opens: 0,
        maxProgress: 0,
        currentProgress: 0,
        sessions: [] // Array of { startTime, endTime, path: [], style: '' }
    };

    /**
     * Load current analytics data from storage
     * @returns {Object} The analytics data object
     */
    function load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return { ...defaultData };
            return { ...defaultData, ...JSON.parse(raw) };
        } catch (e) {
            console.error("Analytics: Failed to load data", e);
            return { ...defaultData };
        }
    }

    /**
     * Save analytics data to storage
     * @param {Object} data - The data object to save
     */
    function save(data) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error("Analytics: Failed to save data", e);
        }
    }

    /**
     * Log an event to remote analytics (PostHog)
     * @param {string} eventName 
     * @param {Object} properties 
     */
    function logEvent(eventName, properties) {
        if (window.posthog) {
            posthog.capture(eventName, properties);
        }
        // Also log to console for local Verification
        console.log(`[RemoteAnalytics] ${eventName}`, properties);
    }

    /**
     * Clear all analytics data (Debug/Owner use)
     */
    function clear() {
        localStorage.removeItem(STORAGE_KEY);
        if (window.posthog) posthog.reset();
    }

    return {
        load,
        save,
        logEvent,
        clear
    };
})();

// Export for module usage (if using ES modules later, but sticking to IIFE pattern for now)
window.AnalyticsRepository = AnalyticsRepository;
