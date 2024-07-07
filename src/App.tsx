import { useState } from "react";
import "./App.css"

// give notes a type using typescript
type Note = {
  id: number;
  title: string;
  content: string;
}

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1, 
      title: "title 1",
      content: "content 1",
    },
    {
      id: 2, 
      title: "title 2",
      content: "content 2",
    },
    {
      id: 3, 
      title: "title 3",
      content: "content 3",
    },
    {
      id: 4, 
      title: "title 4",
      content: "content 4",
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [selectedNote, setSelectedNote] = 
    useState<Note | null>(null);
  
  const handleNoteClick = (note:Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  }

  const handleAddNote = (
    event: React.FormEvent
  ) => {
    event.preventDefault(); // stops the form from trying to post and refresh the page

    const newNote: Note = {
      id: notes.length + 1,
      title: title,
      content: content
    };

    setNotes([newNote, ...notes]); // adding the new note to the top of the list
    // below: refreshing the form input areas
    setTitle("");
    setContent("");
  };

  

  return (
    <div className="app-container">
      <form 
        className="note-form"
        onSubmit={(event) => handleAddNote(event)}>
        <input
          value={title}
          onChange={(event) => 
            setTitle(event.target.value)
          }
          placeholder="Title"
          required
        ></input>
        <textarea
          value={content}
          onChange={(event) => 
            setContent(event.target.value)
          }
          placeholder="Content"
          rows={10}
          required
        ></textarea>
        <button type="submit">
          Add Note
        </button>
      </form>
      <div className="notes-grid">
        {notes.map((note) => (
          <div 
            className="note-item"
            onClick={()=> handleNoteClick(note)}>
            <div className="notes-header">
              <button>x</button>
            </div>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;