import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {
  

  // const [note, setNote] = useState({
  //   title: "",
  //   content: "",
  // });

  function handleChange(event) {
    const { name, value } = event.target;

    props.setNote((prevNote) => {
      return {
        ...prevNote,
        [name]: value,
      };
    });
  }

  const submitNote = async (event)=> {
    if(props.editableNoteId){
      const result = await props.updateNote(props.editableNoteId, props.note.title, props.note.content, props.username);
      if(result){
        props.setNotes(result);
      }

      props.setEditableNoteId("");
      props.setEditableNote({});
      props.setNote({
        title: "",
        content: "",
      });



    }
    else{
      const result = await props.createNote({...props.note, id:  props.username})
      console.log(result);
      props.onAdd(result);
     props.setNote({
      title: "",
      content: "",
    });

    }


    
    event.preventDefault();
  }

  function expand() {
    props.setExpanded(true);
  }

  function handleClick(){
    props.setUsername("none");
    props.setNote({
      title: "",
      content: "",
    });
    props.setNotes([]);
    props.setEditableNoteId("");
    props.setEditableNote({});
    props.setExpanded(false);

    // const [notes, setNotes] = useState([]);
    //   const [username, setUsername] = useState("none");
    //   const [editableNoteId, setEditableNoteId] = useState("");
    //   const [editableNote, setEditableNote] = useState({});
    //   const [note, setNote] = useState({
    //       title: "",
    //       content: "",
    //     });
    //     const [isExpanded, setExpanded] = useState(false);
      

  }

  

  return (
    <div>
      
      <button onClick={handleClick} style={{fontWeight: "bolder", position: "fixed", top: "25px", right: "20%" }} type="button"
       className="btn btn-outline-danger">Log Out</button>

      <form className="create-note">
        {props.isExpanded && (
          <input
            name="title"
            onChange={handleChange}
            value={props.note.title}
            placeholder="Title"
          />
        )}

        <textarea
          name="content"
          onClick={expand}
          onChange={handleChange}
          value={props.note.content}
          placeholder="Take a note..."
          rows={props.isExpanded ? 3 : 1}
        />
        <Zoom in={props.isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
