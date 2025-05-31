import React, { useContext, useRef, useState } from 'react'
import './SearchNote.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NotesContext } from '../../Context/NotesContext';

function SearchNote() {

    const [searchText, setSearchText] = useState('')
    const { newDivs, setNewDivs, mobileMenu, setMobileMenu } = useContext(NotesContext)
    const globalX = useRef(370);
    //Searching Notes...
    const handleSearch = () => {
        if (!searchText.trim()) {
            alert("Enter contents to search notes.");
            return;
        }
        if (newDivs.length === 0) {
            alert("No notes available to search.");
            return;
        }
        let found = false;
        //Searching the Enterd notes in newDivs state....!!!
        const searchNotes = newDivs.map(newDiv => {
            const contentMatch = newDiv.content && newDiv.content.toLowerCase().includes(searchText.toLowerCase());
            const headingMatch = newDiv.heading && newDiv.heading.toLowerCase().includes(searchText.toLowerCase());
            if (contentMatch || headingMatch) {
                found = true;
                const updatedNote = {
                    ...newDiv,
                    x: globalX.current,
                    y: 50// bring matched note to top-left visually
                };
                globalX.current += 20;

                if (globalX.current > 750) {
                    globalX.current = 370; // Reset to start of range
                }
                return updatedNote;
            }
            return newDiv;
        });

        if (found) {
            setNewDivs(searchNotes);
        } else {
            alert("Searched content not available in the notes.");
        }
    }
    return (
        <div className='main-container-search'>
            <input type="text" name="" id="" className={!mobileMenu ? `search-box` : `search-hidden`}
                onChange={(e) => setSearchText(e.target.value)} value={searchText}
                placeholder='Search Notes...' />
            <button className={!mobileMenu ? `search-btn` : `search-hidden`} onClick={handleSearch}><FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />Search</button>

        </div>
    )
}

export default SearchNote
