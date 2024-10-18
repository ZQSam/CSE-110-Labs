// src/stickyNotes.tsx
import React, { useState, useEffect } from 'react';
import './App.css';
import { Label, Note } from './types';
import { dummyNotesList } from './constants';  // Import dummyNotesList
import { ThemeContext, themes } from './ThemeContext';

interface NoteWithFavorite extends Note {
  isFavorite: boolean;
}

export const StickyNotes = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [label, setLabel] = useState<Label>(Label.other);
  const [notes, setNotes] = useState<NoteWithFavorite[]>(dummyNotesList); // Initialize with dummy notes
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState(themes.light);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedNoteId !== null) {
      const updatedNotes = notes.map((note) =>
        note.id === selectedNoteId ? { ...note, title, content, label } : note
      );
      setNotes(updatedNotes);
    } else {
      const newNote: NoteWithFavorite = {
        id: notes.length + 1,
        title,
        content,
        label,
        isFavorite: false,
      };
      setNotes([newNote, ...notes]);
    }
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setLabel(Label.other);
    setSelectedNoteId(null);
  };

  const toggleFavorite = (id: number) => {
    setNotes(
      notes.map((note) =>
        note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
      )
    );
  };

  const handleDelete = (id: number) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleEdit = (note: NoteWithFavorite) => {
    setTitle(note.title);
    setContent(note.content);
    setLabel(note.label);
    setSelectedNoteId(note.id);
  };

  useEffect(() => {
    document.body.style.backgroundColor = currentTheme.background;
    document.body.style.color = currentTheme.foreground;
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  const favoriteNotes = notes.filter((note) => note.isFavorite);

  return (
    <div className="app-container">
      <form className="note-form" onSubmit={handleSubmit}>
        <div>
          <input
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <div>
          <select
            value={label}
            onChange={(e) => setLabel(e.target.value as Label)}
            required
          >
            <option value={Label.personal}>Personal</option>
            <option value={Label.study}>Study</option>
            <option value={Label.work}>Work</option>
            <option value={Label.other}>Other</option>
          </select>
        </div>
        <div>
          <button type="submit">
            {selectedNoteId !== null ? 'Update Note' : 'Create Note'}
          </button>
        </div>
        <div>
          <button type="button" className="toggle-theme-button" onClick={toggleTheme}>
            Toggle Theme
          </button>
        </div>
      </form>

      <div className="notes-grid">
        {notes.map((note) => (
          <div key={note.id} className="note-item">
            <div className="notes-header">
              <button onClick={() => handleDelete(note.id)}>x</button>
              <button onClick={() => handleEdit(note)}>Edit</button>
              <button onClick={() => toggleFavorite(note.id)}>
                {note.isFavorite ? '❤️' : '🤍'}
              </button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{note.label}</p>
          </div>
        ))}
      </div>

      <div className="favorites-list">
        <h3>List of Favorites:</h3>
        <ul>
          {favoriteNotes.map((note) => (
            <li key={note.id}>{note.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};
