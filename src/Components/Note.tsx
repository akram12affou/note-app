import React, { Fragment } from 'react'
import {auth } from '../firebase'
import db from '../firebase'
import { collection, deleteDoc, doc, query, where } from 'firebase/firestore'
function Note({note}) {

    const handleDelete =async (note) => {
         console.log(note)
         await deleteDoc(doc(db,'notes',note.id))
    }
  
  return (
    <Fragment key={note.id}>
        {note.notename} 
        <button onClick={() => handleDelete(note)}>X</button>
        <button>Edit</button>
    </Fragment>
  )
}

export default Note