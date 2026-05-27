import { useState } from 'react';

import './App.css';
import NoteCard from './components/NoteCard';
import NoteModal from './components/NoteModal';
import Sidebar from './components/Sidebar';
import { useNotes } from './hooks/useNotes';

function App() {
  const {
    notes,
    filteredNotes,
    tags,
    loading,
    error,
    search,
    setSearch,
    activeTag,
    setActiveTag,
    createNote,
    deleteNote,
  } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this note?');
    if (!confirmDelete) return;

    await deleteNote(id);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">FastAPI + React</p>
          <h1>Mini Notes</h1>
          <p className="hero-copy">
            Create, search, and filter simple notes stored in SQLite.
          </p>
        </div>

        <button className="primary-button" onClick={() => setIsModalOpen(true)}>
          New note
        </button>
      </header>

      <section className="toolbar">
        <div className="search-box">
          <label htmlFor="search-notes">Search</label>
          <input
            id="search-notes"
            type="search"
            placeholder="Search title, content, or tags"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <div className="stat-card">
          <span className="stat-value">{notes.length}</span>
          <span className="stat-label">saved notes</span>
        </div>
      </section>

      <main className="layout">
        <Sidebar tags={tags} activeTag={activeTag} onTagSelect={setActiveTag} />

        <section className="content-panel">
          {loading && <p className="state-message">Loading notes...</p>}
          {error && <p className="state-message error">{error}</p>}

          {!loading && !error && filteredNotes.length === 0 && (
            <p className="state-message">No notes found. Create one to get started.</p>
          )}

          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard key={note.id} note={note} onDelete={handleDelete} />
            ))}
          </div>
        </section>
      </main>

      <NoteModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={async (noteData) => {
          await createNote(noteData);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default App;