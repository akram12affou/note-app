import { Fragment, useEffect, useState ,FC} from "react";
import Note from "./Note";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import db from "../firebase";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
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
import Footer from './Footer'
function NotesApp() {
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
    if (textNote.trim() == "") {
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
  // const deleteAll = async() => {
  //   console.log(notes)
  //   await deleteDoc(doc(db, "notes", 'f'));
  // }
  const deleteAll = async () => {
    notes.map(async (e) => 
      await deleteDoc(doc(db, "notes", e.id))
    );
  };
  const clearDone = async() => {
    notes.filter((e)=> 
        e.done == true
    ).map(async (e) => 
    await deleteDoc(doc(db, "notes", e.id))
  );
  }
  return (
    <div class="note-app">
      <Navbar />
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
    
      <Footer clearDone={clearDone} deleteAll={deleteAll} notes={notes}/>
    </div>
  );
}

export default NotesApp;
