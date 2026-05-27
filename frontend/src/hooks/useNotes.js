import { useEffect, useMemo, useState } from 'react';

import { createNote, deleteNote, getNotes } from '../api/notes';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState('');

  const loadNotes = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getNotes();
      setNotes(data);
    } catch (err) {
      setError('Could not connect to the backend. Make sure FastAPI is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotes();
  }, []);

  const tags = useMemo(() => {
    const tagSet = new Set();

    notes.forEach((note) => {
      (note.tags || []).forEach((tag) => tagSet.add(tag));
    });

    return Array.from(tagSet).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const searchText = search.trim().toLowerCase();

    return notes.filter((note) => {
      const title = (note.title || '').toLowerCase();
      const content = (note.content || '').toLowerCase();
      const noteTags = note.tags || [];

      const matchesSearch =
        searchText === '' ||
        title.includes(searchText) ||
        content.includes(searchText) ||
        noteTags.some((tag) => tag.toLowerCase().includes(searchText));

      const matchesTag = activeTag === '' || noteTags.includes(activeTag);

      return matchesSearch && matchesTag;
    });
  }, [notes, search, activeTag]);

  const handleCreate = async (note) => {
    await createNote(note);
    await loadNotes();
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    await loadNotes();
  };

  return {
    notes,
    filteredNotes,
    tags,
    loading,
    error,
    search,
    setSearch,
    activeTag,
    setActiveTag,
    createNote: handleCreate,
    deleteNote: handleDelete,
  };
}
