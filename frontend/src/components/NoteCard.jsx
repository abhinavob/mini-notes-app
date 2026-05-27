export default function NoteCard({ note, onDelete }) {
  return (
    <article className="note-card">
      <div className="note-card-header">
        <h3>{note.title}</h3>
        <button type="button" className="danger-button" onClick={() => onDelete(note.id)}>
          Delete
        </button>
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
