import { useEffect, useState } from 'react'
import './App.css'
import { Sidebar } from './components/Sidebar'
import { Main } from './components/Main'
import uuid from "react-uuid";

function App() {
  const [notes, setNotes] = useState(JSON.parse(localStorage.getItem("notes")) || []);
  const [activeNote, setActiveNote] = useState(null);

  useEffect(() => { 
    localStorage.setItem("notes", JSON.stringify(notes));
   }, [notes]);
 
  useEffect(() => {
     setActiveNote(notes[0])
   }, [])

  const onAddNote = () => {
    const newNote = {
      id: uuid(),
      title: "新しいノート",
      content: "",
      modDate: Date.now()
    };
    setNotes([...notes, newNote]);
  }

  const onDeleteNote = (id) => {
    const newNotes = notes.filter(note => id !== note.id);
    setNotes(newNotes);
    setActiveNote(null);
  }

  const onActiveNote = (id) => {
    const activeNote = notes.find(note => id === note.id);
    setActiveNote(activeNote);
  }

  const onUpdateNote = (updatedNote) => {
    const updateNoteArray = notes.map(note => {
      return note.id === updatedNote.id ? updatedNote : note
    });
    setNotes(updateNoteArray);
  }

  return (
    <div className="App">
      <Sidebar notes={notes}
        setNotes={setNotes}
        onAddNote={onAddNote}
        onDeleteNote={onDeleteNote}
        onActiveNote={onActiveNote}
        activeNote={activeNote}
     
      />
      <Main activeNote={activeNote} onUpdateNote={onUpdateNote} setActiveNote={setActiveNote} />
    </div>
  )
}

export default App
