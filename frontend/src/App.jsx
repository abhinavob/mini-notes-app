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
    selectedTags,
    toggleTag,
    clearTags,
    createNote,
    updateNote,
    deleteNote,
  } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const openCreateModal = () => {
    setSelectedNote(null);
    setIsModalOpen(true);
  };

  const openEditModal = (note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Delete this note?');
    if (!confirmDelete) return;

    await deleteNote(id);
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          {/* <p className="eyebrow">FastAPI + React</p> */}
          <h1>Mini Notes</h1>
          <p className="hero-copy">
            Create, search, and filter mini notes.
          </p>
        </div>

        <button className="primary-button new-note-button" onClick={openCreateModal}>
          <span className="new-note-icon" aria-hidden="true">
            +
          </span>
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
        <Sidebar
          tags={tags}
          selectedTags={selectedTags}
          onToggleTag={toggleTag}
          onClearTags={clearTags}
        />

        <section className="content-panel">
          {loading && <p className="state-message">Loading notes...</p>}
          {error && <p className="state-message error">{error}</p>}

          {!loading && !error && filteredNotes.length === 0 && (
            <p className="state-message">No notes found. Create one to get started.</p>
          )}

          <div className="notes-grid">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onOpen={openEditModal}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      </main>

      <NoteModal
        open={isModalOpen}
        note={selectedNote}
        onClose={closeModal}
        onSave={async (noteData) => {
          if (selectedNote) {
            await updateNote(selectedNote.id, noteData);
          } else {
            await createNote(noteData);
          }
          closeModal();
        }}
      />
    </div>
  );
}

export default App;