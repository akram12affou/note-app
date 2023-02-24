import { Fragment, useEffect, useState } from "react";
import Note from "./Note";
import { onAuthStateChanged, signOut } from "firebase/auth";
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
import { useNavigate } from "react-router-dom";
import "../styles/style.css";
import { Input } from "reactstrap";
import Navbar from "./Navbar";
import Modale from "./Modale";
function NotesApp({ darkMode, setDarkMode }) {
  const navigate = useNavigate();
  
  const [textNote, setTextNote] = useState("");
  const [notes, setNotes] = useState([]);
  const notecollection = collection(db, "notes");
  const [user, setUser] = useState([]);
  const [modalOpen,setModalOpen] = useState(false)
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
    })
    
    return () => unsubscribe();
    
  }, [user]);

  const handleAdd = async () => {
    if (textNote == "") {
      setModalOpen(true)
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
  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };
  return (
    <div class="note-app">
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div class="note-app-header">
        <span>{user?.email}</span>
        <button class="sign-out" onClick={handleLogout}>
          Sign out
        </button>
        <h1>Welcome to notes app</h1>
        <div class="input">
          <span> note:</span>
          <Input
            value={textNote}
            onChange={(e) => setTextNote(e.target.value)}
            type="text"
          />
          <button class='add-button' onClick={handleAdd}>
            <AddCircleOutlineIcon />
          </button>
        </div>
      </div>
      <div class="note-app-notes">
        <Modale modalOpen={modalOpen} setModalOpen={setModalOpen}/>
        {notes.length == 0 && <h3>No notes yet</h3>}
        {notes.map((note) => {
          return <Note note={note} setModalOpen={setModalOpen} />;
        })}
      </div>
    </div>
  );
}

export default NotesApp;
