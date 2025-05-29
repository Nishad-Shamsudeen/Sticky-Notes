import { useState } from 'react'

import './App.css'
import AddNote from './Components/AddNote/AddNote'
import SearchNote from './Components/SearchNote/SearchNote'
import { NotesContext } from './Context/NotesContext'

function App() {
const [newDivs, setNewDivs] = useState([])

  return (
    <div className='main-container'>
      {/* <h1>Checking</h1> */}
      <NotesContext.Provider value={{newDivs, setNewDivs}}>
        <AddNote />
        <SearchNote />
      </NotesContext.Provider>
    </div>

  )
}

export default App
