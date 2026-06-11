import { Moon, Palette, Sun } from "lucide-react";

// Maps every theme name to an icon shown on the button.
const themeIcons = {
  minimal: Sun,
  dark: Moon,
  colorful: Palette,
};

export default function ThemeSwitcher({ theme, themes, onThemeChange }) {
  return (
    <div className="theme-panel">
      <div>
        <p className="panel-label">Theme</p>
        <h2>Choose a style</h2>
      </div>
      <div className="theme-grid">
        {Object.entries(themes).map(([themeId, themeInfo]) => {
          const Icon = themeIcons[themeId];
          // Active state highlights the currently selected theme.
          const isActive = theme === themeId;

          return (
            <button
              key={themeId}
              className={`theme-option ${isActive ? "active" : ""}`}
              onClick={() => onThemeChange(themeId)}
              aria-pressed={isActive}
              title={themeInfo.description}
            >
              <Icon size={18} />
              <span>{themeInfo.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
