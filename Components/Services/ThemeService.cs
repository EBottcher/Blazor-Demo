namespace Blazor_Demo.Services;

/// <summary>
/// Manages the application theme state for interactive Blazor components.
/// Note: The authoritative theme state is stored in the browser's localStorage
/// and applied via themeInterop (wwwroot/js/theme.js). This service provides
/// a C# representation of the theme for interactive server components that
/// need to react to theme changes.
/// </summary>
public class ThemeService
{
    public bool IsDarkMode { get; private set; }

    public event Action? OnThemeChanged;

    public void SetDarkMode(bool isDarkMode)
    {
        if (IsDarkMode != isDarkMode)
        {
            IsDarkMode = isDarkMode;
            OnThemeChanged?.Invoke();
        }
    }

    public void Toggle()
    {
        SetDarkMode(!IsDarkMode);
    }
}
