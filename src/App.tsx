import { useState,useEffect } from 'react'
import NotesApp from './Components/NotesApp'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Connexion from './Components/Connexion'
import {auth} from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
function App() {
  const [usere,setUsere] = useState('')
  useEffect(() => {
    onAuthStateChanged(auth, (CurrentUser) => {
      setUsere(CurrentUser);
    });
  },[])
  
  return (
    <div>
      <div>
        <Routes>
          <Route path='/note-App' element={<NotesApp user={user}/>}></Route>
          <Route path='/' element={<Connexion setUsere={setUsere} user={user}/>}></Route>
        </Routes>

      </div>
   
    </div>
  )
}

export default App
