import React, { useContext, useEffect, useRef, useState } from 'react'
import './DropDown.css'
import { NotesContext } from '../../Context/NotesContext'


export default function DropDown({ showDropDown }) {
    const { newDivs, setNewDivs, archivedNotes, setArchivedNotes, setShowDropDown } = useContext(NotesContext)

    const [toolTip, setToolTip] = useState(false)
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {

            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropDown(false); // Close dropdown if clicked outside
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);




    const handleUnArchive = (noteId) => {

        //Targetting the Note for Unarchive
        const noteToRestore = archivedNotes.find(note => note.id === noteId);
        //If Id Does'nt match stops here
        if (!noteToRestore) return;

        // Marking archiveFlag true
        const updatedNote = { ...noteToRestore, archiveFlag: true };

        // Remove from archived notes
        setArchivedNotes(prev => prev.filter(note => note.id !== noteId));

        // Adding Unarchived to newDivs
        setNewDivs(prev => [...prev, updatedNote]);

    }
    //Showing Tooltip
    const handleMouseEnter = () => {
        setToolTip(true)
    }
    const handleMouseLeave = () => {
        setToolTip(false)
    }

    return (
        <div ref={dropdownRef} className={`archive-dropdown ${showDropDown ? 'show' : ''}`}>
            {archivedNotes && archivedNotes.length > 0 ? archivedNotes.map((note) => (
                <div className="archive-content">
                    <p onClick={() => handleUnArchive(note.id)}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >{note.content}</p>
                    {/* <label className="tool-tip" >Unarchive</label> */}
                    <label className={` ${toolTip ? `tool-tip` : `t-hidden`}`} >Unarchive</label>
                </div>
            )) : <h4>No archived notes available</h4>}


        </div>
    )
}
