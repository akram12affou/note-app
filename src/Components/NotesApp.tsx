import { Fragment, useEffect, useState } from "react";
import Note from "./Note";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import db from "../firebase";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import "../styles/style.css";
import { Input } from "reactstrap";
import Navbar from './Navbar'
function NotesApp() {
  const [textNote, setTextNote] = useState("");
  const [notes, setNotes] = useState([]);
  const notecollection = collection(db, "notes");
  const [user, setUser] = useState([]);
  const notes_db = collection(db, "notes");

  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
    const q = query(notes_db, where("user", "==", user.email || ""));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let notearr = [];
      querySnapshot.forEach((doc) => {
        notearr.push({ ...doc.data(), id: doc.id });
      });
      setNotes(notearr);
    });
    return () => unsubscribe();
  }, [user]);

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
    <div class="note-app">
       <Navbar/>
      <div class="note-app-header">
       
        <span>{user?.email}</span>
        <h1>Welcome to Note App</h1>
        <div class="input">
          <span> note:</span>
          <Input
            value={textNote}
            onChange={(e) => setTextNote(e.target.value)}
            type="text"
          />
          <button onClick={handleAdd}>
            <AddCircleOutlineIcon />
          </button>
        </div>
      </div>
      <div class="note-app-notes">
        {notes.map((note) => {
          return <Note note={note} />;
        })}
      </div>
    </div>
  );
}

export default NotesApp;
