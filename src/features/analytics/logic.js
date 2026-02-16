// logic.js - Analytics Business Logic
// Handles session tracking, progress updates, and data aggregation.

window.AnalyticsLogic = (function () {
    const DEBUG = true;

    // Session State
    let sessionStartTime = Date.now();
    let currentSessionId = null;
    let lastChapter = null;
    let lastChapterTime = null;

    /**
     * Initialize Analytics Logic
     */
    function init() {
        startSession();
        trackOpen();
    }

    function startSession() {
        currentSessionId = Date.now().toString(36) + Math.random().toString(36).substr(2);
        sessionStartTime = Date.now();
        lastChapter = null;
        lastChapterTime = null;
    }

    /**
     * Track a new application open/session.
     */
    function trackOpen() {
        const isNewSession = !sessionStorage.getItem('analytics_session_active');

        if (isNewSession) {
            sessionStorage.setItem('analytics_session_active', 'true');

            const data = window.AnalyticsRepository.load();
            data.opens = (data.opens || 0) + 1;

            // Initialize new session in history
            if (!data.sessions) data.sessions = [];
            data.sessions.push({
                id: currentSessionId,
                startTime: sessionStartTime,
                path: [],
                style: 'Linear' // Default, will update
            });

            // Limit session history to last 50 to prevent bloat
            if (data.sessions.length > 50) data.sessions.shift();

            window.AnalyticsRepository.save(data);

            // LOG REMOTE EVENT
            window.AnalyticsRepository.logEvent('session_start', {
                session_id: currentSessionId,
                start_time: sessionStartTime,
                total_opens: data.opens
            });

            if (DEBUG) console.log(`Analytics: Open tracked. Total opens: ${data.opens}`);
        }
    }

    /**
     * Track a specific chapter view.
     * @param {number} chapterIndex - The 1-based chapter number
     * @param {number} totalChapters - Total number of chapters
     */
    function trackView(chapterIndex, totalChapters) {
        const now = Date.now();
        const data = window.AnalyticsRepository.load();

        // 1. Calculate Time on Previous Page
        if (lastChapter !== null && lastChapterTime !== null) {
            const timeonPage = (now - lastChapterTime) / 1000; // seconds

            // Update the LAST entry in the current session's path
            const session = data.sessions.find(s => s.id === currentSessionId);
            if (session && session.path.length > 0) {
                const lastEntry = session.path[session.path.length - 1];
                if (lastEntry.chapter === lastChapter) {
                    lastEntry.duration = Math.round(timeonPage);
                }
            }
        }

        // 2. Detect Jumps & Reading Style
        let isJump = false;
        if (lastChapter !== null) {
            // If they skipped more than 1 chapter forward, or went backward
            // (Linear is +1. Staying same is refresh. Backward is re-reading.)
            // We define "Jump" as skipping ahead > 1.
            if (chapterIndex > lastChapter + 1) {
                isJump = true;
            }
        }

        // 3. Record Path
        // Find current session (or create if missing - e.g. from reload)
        let session = data.sessions.find(s => s.id === currentSessionId);
        if (!session) {
            // It might be a continuation of the last session if reload? 
            // For now, attach to the latest session or create new one data structure
            session = data.sessions[data.sessions.length - 1];
            if (!session) {
                session = { id: currentSessionId, startTime: now, path: [], style: 'Linear' };
                data.sessions.push(session);
            }
            // Update local tracking ID to match
            currentSessionId = session.id;
        }

        session.path.push({
            chapter: chapterIndex,
            timestamp: now,
            duration: 0, // Placeholder, updated on next navigation
            isJump: isJump
        });

        // 4. Update Reading Style
        // Simple Heuristic: If > 2 jumps in one session -> "Skipper"
        const jumpCount = session.path.filter(p => p.isJump).length;
        if (jumpCount > 2) {
            session.style = "Skipper";
        } else {
            // Check for "Skimmer" (Avg time < 10s per chapter)
            const closedPages = session.path.filter(p => p.duration > 0);
            if (closedPages.length >= 3) {
                const avgTime = closedPages.reduce((acc, p) => acc + p.duration, 0) / closedPages.length;
                if (avgTime < 10) session.style = "Skimmer";
                else session.style = "Linear";
            }
        }

        // 5. Standard Progress Update
        const percentage = Math.round((chapterIndex / totalChapters) * 100);
        data.currentProgress = percentage;
        if (percentage > (data.maxProgress || 0)) {
            data.maxProgress = percentage;
        }

        // Save
        window.AnalyticsRepository.save(data);

        // LOG REMOTE EVENT
        // Calculate info for the *current* view event
        let durationOfPrevious = 0;
        if (lastChapter !== null && lastChapterTime !== null) {
            durationOfPrevious = (now - lastChapterTime) / 1000;
        }

        window.AnalyticsRepository.logEvent('chapter_view', {
            chapter_index: chapterIndex,
            title: `Chapter ${chapterIndex}`, // Optional
            total_chapters: totalChapters,
            progress_percentage: percentage,
            previous_chapter_duration: Math.round(durationOfPrevious),
            is_jump: isJump,
            reading_style: session.style,
            session_id: currentSessionId
        });

        // Update Accessors
        lastChapter = chapterIndex;
        lastChapterTime = now;

        if (DEBUG) console.log(`Analytics: View tracked Ch${chapterIndex}. Style: ${session.style}`);
    }

    function getStats() {
        return window.AnalyticsRepository.load();
    }

    function resetStats() {
        window.AnalyticsRepository.clear();
        sessionStorage.removeItem('analytics_session_active');
        // Reset local state
        startSession();
    }

    return {
        init,
        trackView,
        getStats,
        resetStats
    };
})();
