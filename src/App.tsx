import { useState, useEffect } from "react";
import NotesApp from "./Components/NotesApp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Connexion from "./Components/Connexion";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState("");
  const [darkMode , setDarkMode] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUser(CurrentUser);
    });
  }, []);

  return (
    <div>
      

        <Routes>
          <Route path="/note-App" element={<NotesApp darkMode={darkMode} setDarkMode={setDarkMode}/>}></Route>
          <Route
            path="/"
            element={<Connexion user={user} setUser={setUser} />}
          ></Route>
        </Routes>
    
    </div>
  );
}

export default App;
