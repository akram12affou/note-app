import { Fragment, useEffect, useState } from "react";
import Note from "./Note";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import db from "../firebase";
import { addDoc, collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
function NotesApp() {
  const [user, setUser] = useState("");
  const [textNote, setTextNote] = useState("");
  const [notes , setNotes] = useState([])
  const notecollection = collection(db, "notes");
  
  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
    console.log(user?.email)
    const q = query(collection(db, 'notes'),where('user','==',user.?email));
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
    await addDoc(notecollection, {
      notename: textNote,
      done: false,
      user: auth.currentUser?.email,
    });
    setTextNote("");
  };

  return (
    <Fragment>
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
