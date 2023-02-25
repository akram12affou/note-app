import React, { Fragment, useState,FC } from "react";
import { auth } from "../firebase";
import db from "../firebase";
import "../styles/style.css";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  collection,
  deleteDoc,
  doc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
function Note({ note,setModalOpen }) {
  const [editedName, setEditedName] = useState("");
  const [inputsShow, setInputsShow] = useState(true);
  const handleEdit = async (id  , notename ) => {
    if (inputsShow) {
      setEditedName(notename);
      setInputsShow(!inputsShow);
      return;
    }
    if (editedName.trim() == "") {
      setModalOpen(true)
      console.log('h')
      return;
    }
    await updateDoc(doc(db, "notes", id), { notename: editedName });
    setInputsShow(!inputsShow);
    setEditedName('')
  };
  const handleDelete = async (note ) => {
    await deleteDoc(doc(db, "notes", note.id));
  };
 const handleDone = async(id ,done ) => {
  await updateDoc(doc(db, "notes", id), {done : !done});
 }
  return (
    <div class="note" key={note.id}>
      <div class='note-text'>
        {inputsShow ? (
          <>{note.done ? <CheckBoxIcon  onClick={() => handleDone(note.id,note.done)}/> : <CheckBoxOutlineBlankIcon  onClick={() => handleDone(note.id,note.done)}/>} <span style={{
            textDecoration: note.done && 'line-through',
          }}>{note.notename}</span> </>
        ) : (
          <textarea
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        )}
      </div>
      <div class="buttons">
        <button onClick={() => handleDelete(note)}>
          <DeleteIcon />
        </button>
        <button onClick={() => handleEdit(note.id, note.notename)}>Edit</button>
      </div>
    </div>
  );
}

export default Note;
