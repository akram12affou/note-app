import { Fragment, useEffect, useState } from "react";
import Note from "./Note";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import db from "../firebase";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import '../styles/style.css'
function NotesApp({usere}) {
    console.log(auth.currentUser.email)
  const [textNote, setTextNote] = useState("");
  const [notes, setNotes] = useState([]);
  const notecollection = collection(db, "notes");
  const [user,setUser] = useState([])
  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
  },[])
  useEffect(() => {
    const q =  query(collection(db, "notes"), where("user", "==",usere));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let notearr = [];
      querySnapshot.forEach((doc) => {
        notearr.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notearr);
    });
    return () => unsubscribe();
  }, []);
  const handleAdd = async () => {
    if (textNote == "") {
      alert("invalid note");
      return;
    }
    let text = textNote;
    setTextNote("");
    await addDoc(notecollection, {
      notename: text,
      done: false,
      user: auth.currentUser?.email,
    });
  };
  return (
    <Fragment >
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
        return <Note note={note} />;
      })}
    </Fragment>
  );
}

export default NotesApp;
