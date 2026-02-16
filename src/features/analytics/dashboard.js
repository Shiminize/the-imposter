// dashboard.js - Analytics Dashboard UI
// Renders the hidden owner view for stats.

window.AnalyticsDashboard = (function () {
    const CONTAINER_ID = 'analytics-dashboard';
    const TRIGGER_SEQUENCE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown'];
    let keyBuffer = [];

    function init() {
        renderDashboard();
        setupTrigger();
        try {
            injectIntoSettings();
        } catch (e) {
            console.warn("Analytics: Could not inject into settings", e);
        }
    }

    function setupTrigger() {
        document.addEventListener('keydown', (e) => {
            keyBuffer.push(e.code);
            if (keyBuffer.length > TRIGGER_SEQUENCE.length) {
                keyBuffer.shift();
            }

            if (keyBuffer.join(',') === TRIGGER_SEQUENCE.join(',')) {
                toggleDashboard();
                keyBuffer = [];
            }
        });
    }

    function injectIntoSettings() {
        const settingsDrawer = document.getElementById('settings-drawer');
        if (settingsDrawer) {
            const statsBtn = document.createElement('button');
            statsBtn.className = 'theme-btn';
            statsBtn.style.marginTop = '20px';
            statsBtn.style.width = '100%';
            statsBtn.textContent = 'View Analytics';
            statsBtn.onclick = toggleDashboard;
            settingsDrawer.appendChild(statsBtn);
        }
    }

    function renderDashboard() {
        if (document.getElementById(CONTAINER_ID)) return;

        const modal = document.createElement('div');
        modal.id = CONTAINER_ID;
        modal.style.display = 'none';
        modal.style.position = 'fixed';
        modal.style.top = '50%';
        modal.style.left = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.background = 'var(--bg-color, #fff)';
        modal.style.color = 'var(--text-color, #000)';
        modal.style.padding = '2rem';
        modal.style.borderRadius = '12px';
        modal.style.boxShadow = '0 10px 25px rgba(0,0,0,0.5)';
        modal.style.zIndex = '10000';
        modal.style.minWidth = '400px';
        modal.style.maxWidth = '90vw';
        modal.style.maxHeight = '80vh';
        modal.style.overflowY = 'auto';
        modal.style.textAlign = 'left';

        modal.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center; border-bottom: 1px solid currentColor; margin-bottom: 1rem; padding-bottom: 0.5rem;">
                <h2 style="margin:0;">Traffic Insights</h2>
                <span id="analytics-badge" style="background:#333; color:#fff; padding:2px 8px; border-radius:4px; font-size:0.8em;">Linear</span>
            </div>
            
            <div id="analytics-stats" style="margin-bottom: 1.5rem;">
                <!-- Stats injected here -->
            </div>

            <h3 style="margin-top:1rem; font-size:1em; opacity:0.8;">Recent Sessions</h3>
            <div id="analytics-history" style="font-family:monospace; background:rgba(0,0,0,0.05); padding:10px; border-radius:8px; max-height:200px; overflow-y:auto; font-size:0.85em;">
                <!-- History injected here -->
            </div>

            <div style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 1.5rem;">
                 <button id="reset-analytics" class="theme-btn" style="background: #e74c3c; color: white; border: none; font-size:0.8rem;">Reset</button>
                 <button id="close-analytics" class="theme-btn">Close</button>
            </div>
        `;

        document.body.appendChild(modal);

        document.getElementById('close-analytics').onclick = () => {
            modal.style.display = 'none';
        }

        document.getElementById('reset-analytics').onclick = () => {
            if (confirm("Are you sure you want to clear all analytics data?")) {
                window.AnalyticsLogic.resetStats();
                updateView();
            }
        }
    }

    function updateView() {
        const stats = window.Analytics.getStats();
        const container = document.getElementById('analytics-stats');
        const historyContainer = document.getElementById('analytics-history');
        const badge = document.getElementById('analytics-badge');

        if (container) {
            container.innerHTML = `
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                    <div>
                        <div style="opacity:0.6; font-size:0.8em;">Opens</div>
                        <div style="font-size:1.5em; font-weight:bold;">${stats.opens || 0}</div>
                    </div>
                    <div>
                        <div style="opacity:0.6; font-size:0.8em;">Max Progress</div>
                        <div style="font-size:1.5em; font-weight:bold;">${stats.maxProgress || 0}%</div>
                    </div>
                </div>
            `;
        }

        // Update Session History & Badge
        if (stats.sessions && stats.sessions.length > 0) {
            const lastSession = stats.sessions[stats.sessions.length - 1];

            // Set badge based on LAST session
            if (badge) {
                const style = lastSession.style || 'Linear';
                badge.textContent = style;
                badge.style.background = style === 'Linear' ? '#27ae60' : (style === 'Skipper' ? '#c0392b' : '#f39c12');
            }

            // Render History List (Reversed)
            if (historyContainer) {
                historyContainer.innerHTML = stats.sessions.slice().reverse().map(s => {
                    const date = new Date(s.startTime).toLocaleTimeString();
                    const pathStr = s.path.map(p => {
                        // Add indicator for jumps
                        return p.isJump ? `<span style="color:red; font-weight:bold;">${p.chapter}*</span>` : p.chapter;
                    }).join(' → ');
                    return `<div style="margin-bottom:4px; border-bottom:1px solid rgba(0,0,0,0.1); padding-bottom:4px;">
                        <div style="display:flex; justify-content:space-between;">
                            <span>${date}</span>
                            <span>${s.style || 'Linear'}</span>
                        </div>
                        <div style="opacity:0.7;">Path: ${pathStr}</div>
                    </div>`;
                }).join('');
            }
        } else {
            if (historyContainer) historyContainer.innerHTML = 'No history yet.';
            if (badge) badge.textContent = '-';
        }
    }

    function toggleDashboard() {
        const modal = document.getElementById(CONTAINER_ID);
        if (modal.style.display === 'none') {
            updateView();
            modal.style.display = 'block';
        } else {
            modal.style.display = 'none';
        }
    }

    return {
        init,
        toggleDashboard
    };
})();
