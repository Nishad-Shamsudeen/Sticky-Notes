import { useState } from 'react'

import './App.css'
import AddNote from './Components/AddNote/AddNote'
import SearchNote from './Components/SearchNote/SearchNote'
import {NotesContext } from './Context/NotesContext'
import Header from './Components/Header.jsx/Header'


function App() {

  const [newDivs, setNewDivs] = useState([])
  const [archivedNotes, setArchivedNotes] = useState([])
  const [historyNotes, setHistoryNotes] = useState([])
  const[mobileMenu,setMobileMenu]=useState(false)
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    
    <div className='main-container'>
      {/* <h1>Checking</h1> */}
      <NotesContext.Provider value={{
        newDivs, setNewDivs,
        archivedNotes, setArchivedNotes,
        historyNotes, setHistoryNotes,
        mobileMenu,setMobileMenu,
        showDropDown, setShowDropDown
      }}>
        <Header/>
        <AddNote />
        <SearchNote />
      </NotesContext.Provider>
    </div>

  )
}

export default App
