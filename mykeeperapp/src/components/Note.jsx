import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';

function Note(props) {

  const handleClick = async () => {
    console.log(props.username);
    console.log(props.id);
    const result = await props.deleteNote(props.id, props.username);
    if(result){
      props.setNotes(result);
    }
  }

  const handleEditNote = async () =>{
    props.setExpanded(true);
    props.setNote({title: props.title, content: props.content});

     props.setEditableNoteId(props.id);
     props.setEditableNote({title: props.title, content: props.content});
  

  }

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button style={{float: "left"}} onClick={handleClick}>
        <DeleteIcon />
      </button>
      <button onClick={handleEditNote}>
        <EditIcon />
      </button>
      
    </div>
  );
}

export default Note;
