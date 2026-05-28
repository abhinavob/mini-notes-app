import { useEffect, useRef, useState } from 'react';

import { EMPTY_NOTE_FORM, parseTags } from '../data/notes';

export default function NoteModal({ open, note, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [saving, setSaving] = useState(false);
  const contentRef = useRef(null);

  const resizeContentArea = () => {
    if (!contentRef.current) return;

    contentRef.current.style.height = 'auto';
    contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    if (!open) return;

    setTitle(note?.title || EMPTY_NOTE_FORM.title);
    setContent(note?.content || EMPTY_NOTE_FORM.content);
    setTagsInput((note?.tags || []).join(', '));
  }, [open, note]);

  useEffect(() => {
    if (!open) return;

    resizeContentArea();
  }, [open, content]);

  if (!open) return null;

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setSaving(true);
    try {
      await onSave({
        title: title.trim(),
        content: content.trim(),
        tags: parseTags(tagsInput),
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="overlay" onClick={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal" role="dialog" aria-modal="true" aria-labelledby="note-modal-title">
        <div className="modal-header">
          <span id="note-modal-title" className="modal-kicker">
            {note ? 'Edit note' : 'New note'}
          </span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          <input
            className="modal-note-title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="A simple note title"
            aria-label="Note title"
          />

          <textarea
            ref={contentRef}
            className="modal-note-content"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="Write your note here..."
            rows="12"
            aria-label="Note content"
          />

          <label className="modal-field">
            Tags
            <input
              type="text"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="work, ideas, school"
            />
          </label>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button" disabled={saving}>
              {saving ? 'Saving...' : note ? 'Update note' : 'Save note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
