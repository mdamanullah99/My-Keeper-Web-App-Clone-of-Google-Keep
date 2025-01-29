import react from "react";
import Note from "./Note";



function AllNotes({notes, setNotes, deleteNote, username, updateNote, setEditableNoteId, setEditableNote,handleEditClick, setNote, editableNote, setExpanded}){
 


    return (
    
      notes.map((noteItem) => {
        return (
          <Note
            key={noteItem.id}
            id={noteItem.id}
            title={noteItem.title}
            content={noteItem.content}
            deleteNote={deleteNote}
            setNotes={setNotes}
            username={username}
            updateNote={updateNote}
            setEditableNoteId={setEditableNoteId}
            setEditableNote={setEditableNote}
            handleEditClick={handleEditClick}
            setNote={setNote}
            editableNote={editableNote}
            setExpanded={setExpanded}
          />)
    })
  );

}

export default AllNotes;