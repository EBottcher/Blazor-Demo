window.themeManager = {
    initialize: function () {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.setTheme(savedTheme);
        return savedTheme;
    },
    
    setTheme: function (theme) {
        if (theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.removeAttribute('data-theme');
        }
        localStorage.setItem('theme', theme);
    },
    
    getTheme: function () {
        return localStorage.getItem('theme') || 'light';
    },
    
    toggleTheme: function () {
        const currentTheme = this.getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        return newTheme;
    }
};
