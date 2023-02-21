import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
import {deleteNoteAction} from '../redux/actions'
import {auth } from '../firebase'
function Note({note }) {
   
    const dispatch = useDispatch()
    const handleDelete =(id) => {
        dispatch(deleteNoteAction(id))
    }
  
  return (
    <Fragment key={note.id}>
        {note.notename} 
        <button onClick={() => handleDelete(note.id)}>X</button>
        <button>Edit</button>
    </Fragment>
  )
}

export default Note