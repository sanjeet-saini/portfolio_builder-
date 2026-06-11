import { GripVertical } from "lucide-react";

// Reusable wrapper for each portfolio preview section.
// It also receives drag handlers from Preview.jsx.
export default function Section({ id, title, children, onDragStart, onDragOver, onDrop }) {
  return (
    <section
      className="portfolio-section"
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <div className="section-toolbar">
        <button className="drag-handle" aria-label={`Drag ${title}`} title={`Drag ${title}`}>
          <GripVertical size={17} />
        </button>
        <span>{title}</span>
      </div>
      <div className={`section-content section-${id}`}>{children}</div>
    </section>
  );
}
