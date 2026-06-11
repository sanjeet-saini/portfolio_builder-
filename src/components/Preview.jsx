import { Briefcase, Github, Linkedin, Mail, Phone } from "lucide-react";
import Section from "./Section.jsx";

const sectionTitles = {
  hero: "Hero",
  skills: "Skills",
  experience: "Experience",
  projects: "Projects",
  contact: "Contact",
};

export default function Preview({ portfolio, theme, template, sectionOrder, setSectionOrder, zoom, isMobilePreview }) {
  // Reorders preview sections when the user drags Hero/Skills/Experience/etc.
  function moveSection(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;

    const nextOrder = [...sectionOrder];
    const [draggedSection] = nextOrder.splice(fromIndex, 1);
    nextOrder.splice(toIndex, 0, draggedSection);
    setSectionOrder(nextOrder);
  }

  // Decides which portfolio section UI to show based on the section id.
  function renderSection(sectionId) {
    if (sectionId === "hero") {
      return (
        <div className="hero-layout">
          {portfolio.profileImage ? (
            <img className="profile-image" src={portfolio.profileImage} alt={portfolio.name || "Profile"} />
          ) : (
            <div className="profile-placeholder">{(portfolio.name || "Y").slice(0, 1)}</div>
          )}
          <div>
            <p className="portfolio-kicker">Available for opportunities</p>
            <h2>{portfolio.name || "Your Name"}</h2>
            <p>{portfolio.bio || "Add a short professional bio to make the hero section feel complete."}</p>
            {portfolio.education && <span className="education-pill">{portfolio.education}</span>}
          </div>
        </div>
      );
    }

    if (sectionId === "skills") {
      const skills = portfolio.skills.filter(Boolean);

      return (
        <div className="skill-cloud">
          {skills.length ? skills.map((skill) => <span key={skill}>{skill}</span>) : <p>Add skills to fill this section.</p>}
        </div>
      );
    }

    if (sectionId === "projects") {
      const projects = portfolio.projects.filter((project) => project.title || project.description);

      return (
        <div className="portfolio-projects">
          {projects.length ? (
            projects.map((project, index) => (
              <article key={`${project.title}-${index}`} className="portfolio-project-card">
                <span>0{index + 1}</span>
                <h3>{project.title || "Untitled project"}</h3>
                <p>{project.description || "Project description coming soon."}</p>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noreferrer">
                    View project
                  </a>
                )}
              </article>
            ))
          ) : (
            <p>Add projects to show your best work.</p>
          )}
        </div>
      );
    }

    if (sectionId === "experience") {
      const experience = portfolio.experience.filter((item) => item.role || item.company || item.description);

      return (
        <div className="experience-list">
          {experience.length ? (
            experience.map((item, index) => (
              <article className="experience-card" key={`${item.role}-${index}`}>
                <Briefcase size={20} />
                <div>
                  <div className="experience-heading">
                    <h3>{item.role || "Role title"}</h3>
                    {item.duration && <span>{item.duration}</span>}
                  </div>
                  {item.company && <strong>{item.company}</strong>}
                  <p>{item.description || "Add a short summary of your responsibilities and impact."}</p>
                </div>
              </article>
            ))
          ) : (
            <p>Add experience to show your work history.</p>
          )}
        </div>
      );
    }

    return (
      <div className="contact-grid">
        {portfolio.contact.email && (
          <a href={`mailto:${portfolio.contact.email}`}>
            <Mail size={18} />
            {portfolio.contact.email}
          </a>
        )}
        {portfolio.contact.phone && (
          <a href={`tel:${portfolio.contact.phone}`}>
            <Phone size={18} />
            {portfolio.contact.phone}
          </a>
        )}
        {portfolio.contact.linkedin && (
          <a href={portfolio.contact.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={18} />
            LinkedIn
          </a>
        )}
        {portfolio.contact.github && (
          <a href={portfolio.contact.github} target="_blank" rel="noreferrer">
            <Github size={18} />
            GitHub
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="preview-wrap">
      <div className="preview-header">
        <div>
          <p className="eyebrow">Live Preview</p>
          <h2>{isMobilePreview ? "Mobile preview" : "Drag sections to reorder"}</h2>
        </div>
      </div>

      <div
        // The mobile-frame class makes the same portfolio appear inside a phone-sized preview.
        className={`portfolio-frame ${isMobilePreview ? "mobile-frame" : ""}`}
        style={{ transform: `scale(${zoom / 100})` }}
      >
        {/* Theme and template are CSS classes, so changing them updates the design instantly. */}
        <div className={`portfolio-page theme-${theme} template-${template}`}>
          {sectionOrder.map((sectionId, index) => (
            <Section
              key={sectionId}
              id={sectionId}
              title={sectionTitles[sectionId]}
              onDragStart={(event) => event.dataTransfer.setData("sectionIndex", index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => moveSection(Number(event.dataTransfer.getData("sectionIndex")), index)}
            >
              {renderSection(sectionId)}
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
}
