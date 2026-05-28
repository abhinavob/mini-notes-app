export default function NoteCard({ note, onOpen, onDelete }) {
  const handleCardKeyDown = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onOpen(note);
    }
  };

  return (
    <article
      className="note-card"
      role="button"
      tabIndex={0}
      onClick={() => onOpen(note)}
      onKeyDown={handleCardKeyDown}
      aria-label={`Open note ${note.title}`}
    >
      <div className="note-card-header">
        <h3>{note.title}</h3>
        <div className="note-card-actions">
          <button
            type="button"
            className="danger-button danger-button-icon"
            onClick={(event) => {
              event.stopPropagation();
              onDelete(note.id);
            }}
            aria-label="Delete note"
          >
            ✕
          </button>
        </div>
      </div>

      <p className="note-card-content">{note.content || 'No content added yet.'}</p>

      {note.tags && note.tags.length > 0 && (
        <div className="note-tags">
          {note.tags.map((tag) => (
            <span key={tag} className="tag-chip">
              {tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
