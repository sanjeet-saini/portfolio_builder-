import { Camera, Lightbulb, Plus, Trash2 } from "lucide-react";

export default function Form({ portfolio, onPortfolioChange, suggestions }) {
  // Updates any top-level portfolio field like name, bio, education, skills, etc.
  function updateField(field, value) {
    onPortfolioChange({ ...portfolio, [field]: value });
  }

  // Contact is nested inside portfolio, so it needs a separate safe update.
  function updateContact(field, value) {
    onPortfolioChange({
      ...portfolio,
      contact: { ...portfolio.contact, [field]: value },
    });
  }

  // Skills are stored as an array, so this edits only one skill by its index.
  function updateSkill(index, value) {
    const nextSkills = [...portfolio.skills];
    nextSkills[index] = value;
    updateField("skills", nextSkills);
  }

  function addSkill() {
    updateField("skills", [...portfolio.skills, ""]);
  }

  function removeSkill(index) {
    updateField(
      "skills",
      portfolio.skills.filter((_, skillIndex) => skillIndex !== index)
    );
  }

  // Projects are stored as cards. This updates one field inside one project card.
  function updateProject(index, field, value) {
    const nextProjects = [...portfolio.projects];
    nextProjects[index] = { ...nextProjects[index], [field]: value };
    updateField("projects", nextProjects);
  }

  function addProject() {
    updateField("projects", [...portfolio.projects, { title: "", description: "", link: "" }]);
  }

  function removeProject(index) {
    updateField(
      "projects",
      portfolio.projects.filter((_, projectIndex) => projectIndex !== index)
    );
  }

  function moveProject(fromIndex, toIndex) {
    if (fromIndex === toIndex) return;

    // Drag-and-drop reorder: remove the dragged project and insert it at the drop position.
    const nextProjects = [...portfolio.projects];
    const [draggedProject] = nextProjects.splice(fromIndex, 1);
    nextProjects.splice(toIndex, 0, draggedProject);
    updateField("projects", nextProjects);
  }

  // Experience works like projects, but with role/company/duration fields.
  function updateExperience(index, field, value) {
    const nextExperience = [...portfolio.experience];
    nextExperience[index] = { ...nextExperience[index], [field]: value };
    updateField("experience", nextExperience);
  }

  function addExperience() {
    updateField("experience", [
      ...portfolio.experience,
      { role: "", company: "", duration: "", description: "" },
    ]);
  }

  function removeExperience(index) {
    updateField(
      "experience",
      portfolio.experience.filter((_, itemIndex) => itemIndex !== index)
    );
  }

  // FileReader converts the uploaded image into a data URL so it can be saved in localStorage.
  function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => updateField("profileImage", reader.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="form-stack">
      <section className="form-card">
        <div className="form-card-heading">
          <div>
            <p className="panel-label">Profile</p>
            <h2>Your story</h2>
          </div>
          <label className="image-upload" title="Upload profile image">
            <Camera size={18} />
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </label>
        </div>

        <label>
          Name
          <input value={portfolio.name} onChange={(event) => updateField("name", event.target.value)} />
        </label>

        <label>
          Bio
          <textarea rows="4" value={portfolio.bio} onChange={(event) => updateField("bio", event.target.value)} />
        </label>

        <label>
          Education
          <input value={portfolio.education} onChange={(event) => updateField("education", event.target.value)} />
        </label>
      </section>

      <section className="form-card">
        <div className="form-card-heading">
          <div>
            <p className="panel-label">Experience</p>
            <h2>Work history</h2>
          </div>
          <button className="icon-button" aria-label="Add experience" title="Add experience" onClick={addExperience}>
            <Plus size={18} />
          </button>
        </div>

        <div className="project-edit-list">
          {portfolio.experience.map((item, index) => (
            <article className="project-editor" key={`experience-${index}`}>
              <div className="project-editor-heading">
                <span>Experience {index + 1}</span>
                <button className="ghost-icon" aria-label="Remove experience" onClick={() => removeExperience(index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                value={item.role}
                onChange={(event) => updateExperience(index, "role", event.target.value)}
                placeholder="Frontend Developer"
              />
              <input
                value={item.company}
                onChange={(event) => updateExperience(index, "company", event.target.value)}
                placeholder="Company name"
              />
              <input
                value={item.duration}
                onChange={(event) => updateExperience(index, "duration", event.target.value)}
                placeholder="2024 - Present"
              />
              <textarea
                rows="3"
                value={item.description}
                onChange={(event) => updateExperience(index, "description", event.target.value)}
                placeholder="What did you do there?"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="form-card">
        <div className="form-card-heading">
          <div>
            <p className="panel-label">Skills</p>
            <h2>What you do well</h2>
          </div>
          <button className="icon-button" aria-label="Add skill" title="Add skill" onClick={addSkill}>
            <Plus size={18} />
          </button>
        </div>

        <div className="mini-list">
          {portfolio.skills.map((skill, index) => (
            <div className="inline-editor" key={`skill-${index}`}>
              <input value={skill} onChange={(event) => updateSkill(index, event.target.value)} placeholder="React" />
              <button className="ghost-icon" aria-label="Remove skill" onClick={() => removeSkill(index)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="form-card">
        <div className="form-card-heading">
          <div>
            <p className="panel-label">Projects</p>
            <h2>Proof of work</h2>
          </div>
          <button className="icon-button" aria-label="Add project" title="Add project" onClick={addProject}>
            <Plus size={18} />
          </button>
        </div>

        <div className="project-edit-list">
          {portfolio.projects.map((project, index) => (
            <article
              className="project-editor"
              key={`project-${index}`}
              draggable
              onDragStart={(event) => event.dataTransfer.setData("projectIndex", index)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={(event) => moveProject(Number(event.dataTransfer.getData("projectIndex")), index)}
            >
              <div className="project-editor-heading">
                <span>Project {index + 1}</span>
                <button className="ghost-icon" aria-label="Remove project" onClick={() => removeProject(index)}>
                  <Trash2 size={16} />
                </button>
              </div>
              <input
                value={project.title}
                onChange={(event) => updateProject(index, "title", event.target.value)}
                placeholder="Project title"
              />
              <textarea
                rows="3"
                value={project.description}
                onChange={(event) => updateProject(index, "description", event.target.value)}
                placeholder="Short project description"
              />
              <input
                value={project.link}
                onChange={(event) => updateProject(index, "link", event.target.value)}
                placeholder="https://example.com"
              />
            </article>
          ))}
        </div>
      </section>

      <section className="form-card">
        <p className="panel-label">Contact</p>
        <h2>Where people find you</h2>
        <label>
          Email
          <input value={portfolio.contact.email} onChange={(event) => updateContact("email", event.target.value)} />
        </label>
        <label>
          Phone
          <input value={portfolio.contact.phone} onChange={(event) => updateContact("phone", event.target.value)} />
        </label>
        <label>
          LinkedIn
          <input
            value={portfolio.contact.linkedin}
            onChange={(event) => updateContact("linkedin", event.target.value)}
          />
        </label>
        <label>
          GitHub
          <input value={portfolio.contact.github} onChange={(event) => updateContact("github", event.target.value)} />
        </label>
      </section>

      <section className="suggestion-card">
        <div className="suggestion-title">
          <Lightbulb size={18} />
          <h2>Smart Suggestions</h2>
        </div>
        {suggestions.length ? (
          <ul>
            {suggestions.map((suggestion) => (
              <li key={suggestion}>{suggestion}</li>
            ))}
          </ul>
        ) : (
          <p>Your portfolio has the essentials covered.</p>
        )}
      </section>
    </div>
  );
}
