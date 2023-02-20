import React, { Fragment } from 'react'
import { useDispatch } from 'react-redux'
function Note({note}) {
    const dispatch = useDispatch()
    console.log(note)
    const handleDelete =(id) => {
        dispatch({payload:id,type:'deleteTodo'})
    }
  return (
    <Fragment>
        {note.notename} 
        <button onClick={() => handleDelete(note.id)}>X</button>
        <button>Edit</button>
    </Fragment>
  )
}

export default Note