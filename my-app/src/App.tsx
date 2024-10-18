// src/App.tsx
import React from 'react';
import './App.css';
import { ToDoList } from './toDoList';
import { Route, Routes } from 'react-router-dom';
import { StickyNotes } from './stickyNotes';
import { Navbar } from './navbar';

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<StickyNotes />} />
        <Route path="/todolist/:name" element={<ToDoList />} />
      </Routes>
    </div>
  );
};

export default App;


// import React, { useState, useEffect } from "react";
// import './App.css';
// import { Label, Note } from "./types"; 
// import { dummyNotesList } from "./constants"; 
// import { ThemeContext, themes } from './ThemeContext';

// interface NoteWithFavorite extends Note {
//   isFavorite: boolean; // Track if the note is favorited
// }

// function App() {
//   // State to handle form inputs
//   // the whole react structure is used for excersie part 4
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [label, setLabel] = useState<Label>(Label.other); // Default label

//   const [notes, setNotes] = useState<Note[]>(dummyNotesList); // To store all notes

//   // Theme state management
//   const [currentTheme, setCurrentTheme] = useState(themes.light);

//   const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

//   // Function to handle form submission
//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (selectedNoteId !== null) {
//       // Update the existing note
//       const updatedNotes = notes.map((note) =>
//         note.id === selectedNoteId ? { ...note, title, content, label } : note
//       );
//       setNotes(updatedNotes);
//     } else {
//       // Create a new note
//       const newNote: Note = {
//         id: notes.length + 1,
//         title,
//         content,
//         label,
//         isFavorite: false,
//       };
//       setNotes([newNote, ...notes]);
//     }

//     // Reset form fields and selected note
//     resetForm();
//   };

//   const resetForm = () => {
//     setTitle("");
//     setContent("");
//     setLabel(Label.other);
//     setSelectedNoteId(null);
//   };

//   const toggleFavorite = (id: number) => {
//     setNotes(notes.map(note =>
//       note.id === id ? { ...note, isFavorite: !note.isFavorite } : note
//     ));
//   };

//   // Function to handle note deletion
//   const handleDelete = (id: number) => {
//     const updatedNotes = notes.filter(note => note.id !== id); // Remove the note with matching id
//     setNotes(updatedNotes); // Update the state
//   };

//   // Theme toggle function
//   const toggleTheme = () => {
//     setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
//   };

//   useEffect(() => {
//     document.body.style.backgroundColor = currentTheme.background;
//     document.body.style.color = currentTheme.foreground;
//   }, [currentTheme]); // Run effect when the theme changes

//   const handleEdit = (note: Note) => {
//     setTitle(note.title);
//     setContent(note.content);
//     setLabel(note.label);
//     setSelectedNoteId(note.id);
//   };

//   const favoriteNotes = notes.filter(note => note.isFavorite);

//   return (
//     <ThemeContext.Provider value={currentTheme}>
//       <div
//         className="app-container"
//         style={{
//           background: currentTheme.background,
//           color: currentTheme.foreground,
//         }}
//       >
        
//       <form className="note-form" onSubmit={handleSubmit}>
//         <div>
//           <input 
//             placeholder="Note Title" 
//             value={title} 
//             onChange={(e) => setTitle(e.target.value)} // Handle title change
//             required 
//           />
//         </div>

//         <div>
//           <textarea 
//             placeholder="Note Content" 
//             value={content} 
//             onChange={(e) => setContent(e.target.value)} // Handle content change
//             required
//           />
//         </div>

//         <div>
//           <select 
//             value={label} 
//             onChange={(e) => setLabel(e.target.value as Label)} // Handle label change
//             required
//           >
//             <option value={Label.personal}>Personal</option>
//             <option value={Label.study}>Study</option>
//             <option value={Label.work}>Work</option>
//             <option value={Label.other}>Other</option>
//           </select>
//         </div>

//         <div>
//           <button type="submit">Create Note</button>
//         </div>
//         {/* Toggle Theme Button */}
//         <div>
//             <button
//               type="button"
//               className="toggle-theme-button"
//               onClick={toggleTheme}
//             >
//               Toggle Theme
//             </button>
//           </div>
//       </form>

//       <div className="notes-grid">
//         {notes.map((note) => (
//           <div key={note.id} className="note-item">
//             <div className="notes-header">
//               <button onClick={() => handleDelete(note.id)}>x</button>
//               <button onClick={() => handleEdit(note)}>Edit</button> 
//               <button onClick={() => toggleFavorite(note.id)}>
//                   {note.isFavorite ? '❤️' : '🤍'}
//                 </button>
//             </div>
//             <h2>{note.title}</h2>
//             <p>{note.content}</p>
//             <p>{note.label}</p>
//           </div>
//         ))}
//       </div>
//       <div className="favorites-list">
//           <h3>List of Favorites:</h3>
//           <ul>
//             {favoriteNotes.map(note => (
//               <li key={note.id}>{note.title}</li>
//             ))}
//           </ul>
//         </div>
//     </div>
//     </ThemeContext.Provider>
//   );
// }

// export default App;



