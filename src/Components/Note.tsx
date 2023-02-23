import React, { Fragment, useState } from 'react'
import {auth } from '../firebase'
import db from '../firebase'
import "../styles/style.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { collection, deleteDoc, doc, query, updateDoc, where } from 'firebase/firestore'
function Note({note}) {
  const [editedName,setEditedName] = useState('')
  const [inputsShow , setInputsShow] = useState(true)
  const handleEdit = async(id,notename) => {
    console.log(editedName)
    if(editedName==''){
      alert('invalid todo')
      return;
    }
    if(inputsShow){
      
      setEditedName(notename)
      setInputsShow(!inputsShow)
      editedName('')
      return
    }
    
    await updateDoc(doc(db, "notes", id), { notename: editedName });
    setInputsShow(!inputsShow)
    editedName('')
  }
    const handleDelete =async (note) => {
         console.log(note)
         await deleteDoc(doc(db,'notes',note.id))
    }
  
  return (
    <div class='note' key={note.id}>
        {inputsShow ?
         <>{note.notename} </>
          : <textarea value={editedName} onChange={e => setEditedName(e.target.value)}/>
          }
        <div class='buttons'>  
        <button onClick={() => handleDelete(note)}><DeleteIcon/></button>
        <button onClick={() => handleEdit(note.id,note.notename)}>Edit</button>
        </div>
      
    </div>
  )
}

export default Note