import { useEffect, useMemo, useState } from "react";
import Form from "../components/Form.jsx";
import Preview from "../components/Preview.jsx";
import ThemeSwitcher from "../components/ThemeSwitcher.jsx";
import { defaultPortfolio, defaultSectionOrder, portfolioTemplates, themes } from "../utils/defaultData.js";
import { exportPortfolioHtml, printPortfolioCv } from "../utils/exportPortfolio.js";
import { loadFromStorage, saveToStorage } from "../utils/storage.js";
import { Download, FileDown, Printer, RotateCcw, Smartphone, Sparkles, ZoomIn, ZoomOut } from "lucide-react";

// Old saved data may not have newly added fields, so this safely fills missing values.
function normalizePortfolio(savedPortfolio) {
  return {
    ...defaultPortfolio,
    ...savedPortfolio,
    contact: {
      ...defaultPortfolio.contact,
      ...(savedPortfolio?.contact || {}),
    },
    skills: savedPortfolio?.skills || defaultPortfolio.skills,
    experience: savedPortfolio?.experience || defaultPortfolio.experience,
    projects: savedPortfolio?.projects || defaultPortfolio.projects,
  };
}

// Keeps the saved drag order valid when a new section is added later.
function normalizeSectionOrder(savedOrder) {
  const existingSections = Array.isArray(savedOrder) ? savedOrder : defaultSectionOrder;
  const allowedSections = defaultSectionOrder.filter((sectionId) => existingSections.includes(sectionId));
  const missingSections = defaultSectionOrder.filter((sectionId) => !existingSections.includes(sectionId));
  return [...allowedSections, ...missingSections];
}

export default function App() {
  // Main app state. Each value starts from localStorage first, then falls back to demo data.
  const [portfolio, setPortfolio] = useState(() => normalizePortfolio(loadFromStorage("portfolioData", defaultPortfolio)));
  const [theme, setTheme] = useState(() => loadFromStorage("portfolioTheme", "minimal"));
  const [template, setTemplate] = useState(() => loadFromStorage("portfolioTemplate", "developer"));
  const [sectionOrder, setSectionOrder] = useState(() =>
    normalizeSectionOrder(loadFromStorage("portfolioSectionOrder", defaultSectionOrder))
  );
  const [zoom, setZoom] = useState(() => loadFromStorage("portfolioZoom", 90));
  const [isMobilePreview, setIsMobilePreview] = useState(() => loadFromStorage("portfolioMobilePreview", false));

  // Auto-save every important change so refresh/reopen does not erase the builder data.
  useEffect(() => saveToStorage("portfolioData", portfolio), [portfolio]);
  useEffect(() => saveToStorage("portfolioTheme", theme), [theme]);
  useEffect(() => saveToStorage("portfolioTemplate", template), [template]);
  useEffect(() => saveToStorage("portfolioSectionOrder", sectionOrder), [sectionOrder]);
  useEffect(() => saveToStorage("portfolioZoom", zoom), [zoom]);
  useEffect(() => saveToStorage("portfolioMobilePreview", isMobilePreview), [isMobilePreview]);

  // Simple rule-based "AI" suggestions. It checks missing or weak portfolio parts.
  const suggestions = useMemo(() => {
    const tips = [];

    if (!portfolio.bio.trim()) {
      tips.push("Add a short professional bio.");
    }

    if (portfolio.projects.filter((project) => project.title.trim()).length < 2) {
      tips.push("Add at least 2 projects.");
    }

    if (portfolio.skills.filter(Boolean).length < 3) {
      tips.push("Add more skills.");
    }

    if (portfolio.experience.filter((item) => item.role.trim() || item.company.trim()).length === 0) {
      tips.push("Add at least one experience entry.");
    }

    if (!portfolio.contact.email.trim() && !portfolio.contact.linkedin.trim()) {
      tips.push("Add one reliable contact method.");
    }

    return tips;
  }, [portfolio]);

  // Restores the sample portfolio without leaving the app in an empty/broken state.
  function resetDemo() {
    setPortfolio(defaultPortfolio);
    setTheme("minimal");
    setTemplate("developer");
    setSectionOrder(defaultSectionOrder);
    setZoom(90);
    setIsMobilePreview(false);
  }

  // One-click reset clears localStorage and returns the UI to the default demo portfolio.
  function clearAllData() {
    localStorage.removeItem("portfolioData");
    localStorage.removeItem("portfolioTheme");
    localStorage.removeItem("portfolioTemplate");
    localStorage.removeItem("portfolioSectionOrder");
    localStorage.removeItem("portfolioZoom");
    localStorage.removeItem("portfolioMobilePreview");
    resetDemo();
  }

  return (
    <main className="app-shell">
      <section className="sidebar">
        <div className="brand-block">
          <div className="brand-mark">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="eyebrow">AI + Drag & Drop</p>
            <h1>Smart Portfolio Builder</h1>
          </div>
        </div>

        <ThemeSwitcher theme={theme} themes={themes} onThemeChange={setTheme} />

        <div className="template-panel">
          <div>
            <p className="panel-label">Template</p>
            <h2>Portfolio type</h2>
          </div>
          <div className="template-grid">
            {Object.entries(portfolioTemplates).map(([templateId, templateInfo]) => (
              <button
                key={templateId}
                className={`template-option ${template === templateId ? "active" : ""}`}
                onClick={() => setTemplate(templateId)}
                title={templateInfo.description}
                aria-pressed={template === templateId}
              >
                <span>{templateInfo.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="action-row">
          <button className="primary-button" onClick={() => exportPortfolioHtml(portfolio, theme, sectionOrder, template)}>
            <Download size={18} />
            Export HTML
          </button>
          <button
            className="icon-button"
            aria-label="Printable CV"
            title="Printable CV"
            onClick={() => printPortfolioCv(portfolio, theme, sectionOrder, template)}
          >
            <Printer size={18} />
          </button>
          <button
            className="icon-button"
            aria-label="Save as PDF"
            title="Save as PDF"
            onClick={() => printPortfolioCv(portfolio, theme, sectionOrder, template)}
          >
            <FileDown size={18} />
          </button>
          <button className="icon-button" aria-label="Reset all data" title="Reset all data" onClick={clearAllData}>
            <RotateCcw size={18} />
          </button>
        </div>

        <button
          className={`mobile-preview-toggle ${isMobilePreview ? "active" : ""}`}
          onClick={() => setIsMobilePreview(!isMobilePreview)}
          aria-pressed={isMobilePreview}
        >
          <Smartphone size={18} />
          {isMobilePreview ? "Mobile preview on" : "Mobile preview"}
        </button>

        <div className="zoom-control" aria-label="Preview zoom">
          <ZoomOut size={17} />
          <input
            type="range"
            min="70"
            max="110"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
          />
          <ZoomIn size={17} />
          <span>{zoom}%</span>
        </div>

        <Form portfolio={portfolio} onPortfolioChange={setPortfolio} suggestions={suggestions} />
      </section>

      <section className="preview-pane">
        <Preview
          portfolio={portfolio}
          theme={theme}
          template={template}
          sectionOrder={sectionOrder}
          setSectionOrder={setSectionOrder}
          zoom={zoom}
          isMobilePreview={isMobilePreview}
        />
      </section>
    </main>
  );
}
