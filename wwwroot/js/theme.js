window.themeInterop = {
    getTheme: function () {
        return localStorage.getItem('theme');
    },
    setTheme: function (isDark) {
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        this._updateButton(isDark);
    },
    toggle: function () {
        var isDark = !document.documentElement.classList.contains('dark-mode');
        this.setTheme(isDark);
    },
    _updateButton: function (isDark) {
        var btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.textContent = isDark ? '\u2600\uFE0F' : '\uD83C\uDF19';
            btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
        }
    },
    _applyStoredTheme: function () {
        var isDark = localStorage.getItem('theme') === 'dark';
        if (isDark) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
        this._updateButton(isDark);
    }
};

// Apply stored theme on initial DOMContentLoaded
document.addEventListener('DOMContentLoaded', function () {
    themeInterop._applyStoredTheme();
});

// Re-apply after Blazor enhanced navigation completes
document.addEventListener('enhancedload', function () {
    themeInterop._applyStoredTheme();
});

// MutationObserver fallback: if Blazor removes the dark-mode class
// during enhanced navigation, immediately restore it based on stored preference
(function () {
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === 'class') {
                var isDark = localStorage.getItem('theme') === 'dark';
                if (isDark && !document.documentElement.classList.contains('dark-mode')) {
                    document.documentElement.classList.add('dark-mode');
                    // Defer button update until the next animation frame so the
                    // new button element from Blazor's DOM update is available
                    requestAnimationFrame(function () {
                        themeInterop._updateButton(true);
                    });
                }
            }
        });
    });

    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
    });
})();
