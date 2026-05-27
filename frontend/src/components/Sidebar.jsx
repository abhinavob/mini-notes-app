export default function Sidebar({ tags, activeTag, onTagSelect }) {
  return (
    <aside className="sidebar">
      <h2>Tags</h2>

      <button
        type="button"
        className={`tag-filter ${activeTag === '' ? 'active' : ''}`}
        onClick={() => onTagSelect('')}
      >
        All notes
      </button>

      <div className="tag-list">
        {tags.length === 0 && <p className="sidebar-empty">No tags yet.</p>}

        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`tag-filter ${activeTag === tag ? 'active' : ''}`}
            onClick={() => onTagSelect(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </aside>
  );
}
