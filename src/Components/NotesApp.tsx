import { useState } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import Note from './Note'
import addNoteAction from '../redux/actions'
function NotesApp() {
  const notes = useSelector(state => state.notes)
  const [textNote , setTextNote] = useState('')
  const dispatch = useDispatch()
  console.log(notes)
  const handleAdd = () => {
    addNoteAction(textNote)
  dispatch({type:'addTodo', payload:textNote})
  setTextNote('')
  }
  return (
    <div>
     <h1>Note App</h1>
     <label>todo :</label>
     <input value={textNote} onChange={(e) => setTextNote(e.target.value)} type="text" />
     <button onClick={handleAdd}>+</button>
     {notes.map((note) => {
      return(
       
        <Note note={note}/>
        
      )
     })}
    </div>
  )
}

export default NotesApp