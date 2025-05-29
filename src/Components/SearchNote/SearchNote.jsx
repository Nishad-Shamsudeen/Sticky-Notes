import React, { useContext, useState } from 'react'
import './SearchNote.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NotesContext } from '../../Context/NotesContext';

function SearchNote() {

    const [searchText, setSearchText] = useState(null)
    const { newDivs, setNewDivs } = useContext(NotesContext)
    //Searching Notes...
    const handleSearch = () => {

        if (newDivs.length !== 0 && searchText) {
            const searchNotes = newDivs.map(newDiv => {
                if (searchText === newDiv.content) {
         // After performing a search, move the matched note's visually to the top of the Screen
                    return {
                        ...newDiv,
                        x: 300,
                        y: 10
                    }
                }
            
                else {
                    alert("Searched content not available on the notes.")
                }
                return newDiv;
            })
            setNewDivs(searchNotes)
        }
        else if (newDivs.length == 0 && searchText !== null || searchText == null) {
            alert("No notes available to search...")
        }
        else {
            alert("Enter contents to search notes..")
        }

    }
    return (
        <div className='main-container'>
            <input type="text" name="" id="" className='search-box'
                onChange={(e) => setSearchText(e.target.value)} value={searchText}
                placeholder='Search Notes Content' />
            <button className='search-btn' onClick={handleSearch}><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />Search</button>

        </div>
    )
}

export default SearchNote
