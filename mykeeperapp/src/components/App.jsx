import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import CreateArea from "./CreateArea";
import AllNotes from "./AllNotes";
import getUserLogIn, {getUserRegister, getAllNotes, createNote, deleteNote, updateNote} from "../api";



function App() {
  const [notes, setNotes] = useState([]);
  const [username, setUsername] = useState("none");
  const [editableNoteId, setEditableNoteId] = useState("");
  const [editableNote, setEditableNote] = useState({});
  const [note, setNote] = useState({
      title: "",
      content: "",
    });
    const [isExpanded, setExpanded] = useState(false);
  


  function addNote(newNote) {
    setNotes(prevNotes => {
      return [...prevNotes, newNote];
    });
  }

  // function deleteNote(id) {
    // setNotes(prevNotes => {
    //   return prevNotes.filter((noteItem, index) => {
    //     return (index +1) !== id;
    //   });
    // });
  // }

  function goTORegister(){
    setUsername("register");
  }



  const handleEditClick = ()=>{
    
    if(editableNoteId){
      setNote({title: editableNote.title, content: editableNote.content});

    }
    

  }

  
     

  

    return ( <div>
      <Header />

      {(username == "none") ? (<Login setNotes={setNotes} getAllNotes={getAllNotes} onUserChange={setUsername}

       onSubmit ={getUserLogIn} onRegister = {goTORegister} />) : 

      ((username == "register") ? (<Register onUserChange={setUsername} onSubmit={getUserRegister} />) :  

      ( <div><CreateArea isExpanded={isExpanded} setExpanded={setExpanded} note={note} setNote={setNote} username={username} setUsername={setUsername} createNote={createNote}
       onAdd={addNote} editableNoteId={editableNoteId} notes={notes} editableNote={editableNote} setEditableNote={setEditableNote} updateNote={updateNote}
        setNotes={setNotes} setEditableNoteId={setEditableNoteId} /> 
       
       <AllNotes setExpanded={setExpanded} username={username}  notes={notes} setNotes={setNotes} deleteNote={deleteNote} updateNote={updateNote} setEditableNoteId={setEditableNoteId}
       setEditableNote={setEditableNote} handleEditClick={handleEditClick} setNote={setNote} editableNote={editableNote} /> </div>))
    }

      <Footer />

    </div>)
      
     
}

export default App;
