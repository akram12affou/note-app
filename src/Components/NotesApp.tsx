import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import {addNoteAction} from "../redux/actions";
function NotesApp() {
  const notes = useSelector((state) => state.notes);
  const [textNote, setTextNote] = useState("");
  const dispatch = useDispatch();
  console.log(notes);
  const handleAdd = () => {
    addNoteAction(dispatch(addNoteAction(textNote)));
    setTextNote("");
  };
  return (
    <Fragment>
      <h1>Note App</h1>
      <label>Note :</label>
      <input
        value={textNote}
        onChange={(e) => setTextNote(e.target.value)}
        type="text"
      />
      <button onClick={handleAdd}>+</button>
      {notes.map((note) => {
        return <Note note={note} />;
      })}
    </Fragment>
  );
}

export default NotesApp;
