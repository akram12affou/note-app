import React, { Fragment, useState } from 'react'
import {auth } from '../firebase'
import db from '../firebase'
import "../styles/style.css";
import { collection, deleteDoc, doc, query, updateDoc, where } from 'firebase/firestore'
function Note({note}) {
  
  const [inputsShow , setInputsShow] = useState(false)
  const handleEdit = async(e) => {
    setInputsShow(!inputsShow)
    await updateDoc(doc(db, "notes", e), { notename: 'note.notename' });
  }
    const handleDelete =async (note) => {
         console.log(note)
         await deleteDoc(doc(db,'notes',note.id))
    }
  
  return (
    <div class='note' key={note.id}>
        {inputsShow ? <>{note.notename} </> : <input value={note.notename} />}
        <div class='buttons'>  
        <button onClick={() => handleDelete(note)}>X</button>
        <button onClick={() => handleEdit(note.id)}>Edit</button>
        </div>
      
    </div>
  )
}

export default Note