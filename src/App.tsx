import { useState } from 'react'
import NotesApp from './Components/NotesApp'
import { Route,Routes,BrowserRouter } from 'react-router-dom'
import Connexion from './Components/Connexion'
function App() {

  return (
    <div>
      <div>
        <Routes>
          <Route path='/note-App' element={ <NotesApp/>}></Route>
          <Route path='/' element={<Connexion  />}></Route>
        </Routes>

      </div>
   
    </div>
  )
}

export default App
