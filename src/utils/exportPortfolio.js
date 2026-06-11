function escapeHtml(value) {
  // Prevents exported HTML from breaking if the user types symbols like <, >, or quotes.
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

// Builds one section at a time for the exported standalone portfolio file.
function renderSection(id, portfolio) {
  const safeName = escapeHtml(portfolio.name || "Your Name");
  const safeBio = escapeHtml(portfolio.bio || "Add a short bio to introduce your work.");

  if (id === "hero") {
    return `
      <section class="hero">
        ${portfolio.profileImage ? `<img src="${portfolio.profileImage}" alt="${safeName}" />` : ""}
        <p>Portfolio</p>
        <h1>${safeName}</h1>
        <strong>${safeBio}</strong>
        ${portfolio.education ? `<span>${escapeHtml(portfolio.education)}</span>` : ""}
      </section>`;
  }

  if (id === "skills") {
    return `
      <section>
        <h2>Skills</h2>
        <div class="skills">
          ${portfolio.skills.map((skill) => `<span>${escapeHtml(skill)}</span>`).join("")}
        </div>
      </section>`;
  }

  if (id === "projects") {
    return `
      <section>
        <h2>Projects</h2>
        <div class="projects">
          ${portfolio.projects
            .map(
              (project) => `
                <article>
                  <h3>${escapeHtml(project.title || "Untitled project")}</h3>
                  <p>${escapeHtml(project.description || "Project description coming soon.")}</p>
                  ${project.link ? `<a href="${escapeHtml(project.link)}">View project</a>` : ""}
                </article>`
            )
            .join("")}
        </div>
      </section>`;
  }

  if (id === "experience") {
    return `
      <section>
        <h2>Experience</h2>
        <div class="experience">
          ${portfolio.experience
            .map(
              (item) => `
                <article>
                  <h3>${escapeHtml(item.role || "Role title")}</h3>
                  ${item.company ? `<strong>${escapeHtml(item.company)}</strong>` : ""}
                  ${item.duration ? `<span>${escapeHtml(item.duration)}</span>` : ""}
                  <p>${escapeHtml(item.description || "Experience summary coming soon.")}</p>
                </article>`
            )
            .join("")}
        </div>
      </section>`;
  }

  return `
    <section>
      <h2>Contact</h2>
      <div class="contact">
        ${portfolio.contact.email ? `<a href="mailto:${escapeHtml(portfolio.contact.email)}">${escapeHtml(portfolio.contact.email)}</a>` : ""}
        ${portfolio.contact.phone ? `<span>${escapeHtml(portfolio.contact.phone)}</span>` : ""}
        ${portfolio.contact.linkedin ? `<a href="${escapeHtml(portfolio.contact.linkedin)}">LinkedIn</a>` : ""}
        ${portfolio.contact.github ? `<a href="${escapeHtml(portfolio.contact.github)}">GitHub</a>` : ""}
      </div>
    </section>`;
}

// Creates a full HTML document that can be downloaded, printed, or saved as PDF.
export function buildPortfolioHtml(portfolio, theme, sectionOrder, template = "developer") {
  const themeClass = `theme-${theme}`;
  const templateClass = `template-${template}`;
  const title = escapeHtml(portfolio.name || "Portfolio");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title} Portfolio</title>
    <style>
      * { box-sizing: border-box; }
      body { margin: 0; font-family: Inter, Arial, sans-serif; background: #eef2f7; color: #182033; }
      main { width: min(980px, calc(100% - 32px)); margin: 32px auto; border-radius: 20px; overflow: hidden; box-shadow: 0 24px 60px rgba(16, 24, 40, .16); }
      .page { padding: 38px; }
      .theme-minimal { background: #ffffff; color: #172033; }
      .theme-dark { background: #111827; color: #f8fafc; }
      .theme-colorful { background: linear-gradient(135deg, #fff7ed, #eff6ff 45%, #ecfdf5); color: #1f2937; }
      .template-designer h1 { font-family: Georgia, serif; }
      .template-student .hero { min-height: 220px; }
      .template-freelancer article { border-style: dashed; }
      section { padding: 26px 0; border-top: 1px solid rgba(148, 163, 184, .28); }
      section:first-child { border-top: 0; }
      .hero { min-height: 300px; display: grid; align-content: center; gap: 12px; }
      .hero img { width: 112px; height: 112px; object-fit: cover; border-radius: 999px; border: 4px solid currentColor; }
      h1 { margin: 0; font-size: clamp(42px, 7vw, 76px); line-height: .95; }
      h2 { margin: 0 0 18px; font-size: 26px; }
      h3, p { margin-top: 0; }
      .skills, .contact { display: flex; flex-wrap: wrap; gap: 10px; }
      .skills span, .contact a, .contact span { padding: 9px 13px; border: 1px solid rgba(148, 163, 184, .38); border-radius: 999px; color: inherit; text-decoration: none; }
      .projects { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px; }
      .experience { display: grid; gap: 12px; }
      .experience article { display: grid; gap: 6px; }
      .experience span { opacity: .72; font-weight: 700; }
      article { padding: 18px; border: 1px solid rgba(148, 163, 184, .35); border-radius: 14px; background: rgba(255,255,255,.08); }
      a { color: inherit; font-weight: 700; }
      @media print {
        body { background: white; }
        main { box-shadow: none; margin: 0; width: 100%; }
        .page { padding: 24px; }
        section { break-inside: avoid; }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="page ${themeClass} ${templateClass}">
        ${sectionOrder.map((sectionId) => renderSection(sectionId, portfolio)).join("")}
      </div>
    </main>
  </body>
</html>`;
}

// Downloads the generated portfolio as a real .html file using Blob.
export function exportPortfolioHtml(portfolio, theme, sectionOrder, template) {
  const html = buildPortfolioHtml(portfolio, theme, sectionOrder, template);
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const fileName = `${(portfolio.name || "portfolio").toLowerCase().replace(/[^a-z0-9]+/g, "-")}.html`;

  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);
}

// Opens a print window. The browser print dialog can print paper CV or save as PDF.
export function printPortfolioCv(portfolio, theme, sectionOrder, template) {
  const html = buildPortfolioHtml(portfolio, theme, sectionOrder, template);
  const printWindow = window.open("", "_blank", "width=900,height=1100");

  if (!printWindow) {
    alert("Please allow popups to print or save as PDF.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();

  setTimeout(() => {
    printWindow.print();
  }, 250);
}
