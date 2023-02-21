import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Note from "./Note";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import db from "../firebase";
import { addNoteAction } from "../redux/actions";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { fetchNotes } from "../redux/actions";
function NotesApp() {
  const [user, setUser] = useState("");
  const notes = useSelector((state) => state.notes);
  const [textNote, setTextNote] = useState("");
  const dispatch = useDispatch();
  
  const notecollection = collection(db, "notes");
 
  useEffect(async () => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
    const  q = query(collection(db, "notes"), where("user" , '==',user.?email ));
    const data = await getDocs(q);
  dispatch(fetchNotes(data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))))
  }, []);
  const handleAdd = async () => {
    addNoteAction(dispatch(addNoteAction(textNote)));

    await addDoc(notecollection, {
      name: textNote,
      done: false,
      user: auth.currentUser?.email,
    });
    setTextNote("");
  };
  //   const getTodos = async () => {
  //     setTodoList([])
  //     const  qk = query(collection(db, "todos"), where("user" , '==',  window.localStorage.getItem('user')))
  //     const data = await getDocs(qk);
  //     setTodoList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  //     console.log(window.localStorage.getItem('user'))
  //   };

  return (
    <Fragment>
      {/* {JSON.stringify(user.displayName)} */}
      {JSON.stringify(user.email)}
      <h1>Note App</h1>
      <label>Note :</label>
      <input
        value={textNote}
        onChange={(e) => setTextNote(e.target.value)}
        type="text"
      />
      <button onClick={handleAdd}>+</button>
      {notes.map((note) => {
        return <Note note={note} handleAdd={handleAdd} />;
      })}
    </Fragment>
  );
}

export default NotesApp;
