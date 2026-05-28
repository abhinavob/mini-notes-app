export default function Sidebar({ tags, selectedTags, onToggleTag, onClearTags }) {
  const hasSelectedTags = selectedTags.length > 0;

  return (
    <aside className="sidebar">
      <h2>Tags</h2>

      <button
        type="button"
        className={`tag-filter tag-filter-all ${!hasSelectedTags ? 'active' : ''}`}
        onClick={onClearTags}
      >
        All notes
      </button>

      <div className="tag-list">
        {tags.length === 0 && <p className="sidebar-empty">No tags yet.</p>}

        {tags.map((tag) => (
          <button
            key={tag}
            type="button"
            className={`tag-filter ${selectedTags.includes(tag) ? 'active' : ''}`}
            onClick={() => onToggleTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </aside>
  );
}
