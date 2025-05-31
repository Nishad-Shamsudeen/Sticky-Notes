import React, { useContext, useRef, useState } from 'react'
import './Archive.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { NotesContext } from '../../Context/NotesContext';


function Archive({ noteId, noteContent }) {
    const [archiveOn, setarchiveOn] = useState(false)
    const { newDivs, setNewDivs, archivedNotes, setArchivedNotes } = useContext(NotesContext)

    //Adding Archive On/Off, Undo/Redo
    const handleArchive = () => {

        //REMOVING NOTES AND ADDING ARCHIVE...!!!
        const addNoteToArchive = newDivs.find(note => note.id === noteId)

        //FILTERING NOTES FROM CURRENT NOTES...    
        const test = newDivs.filter(note => note.id !== noteId)
        setNewDivs(newDivs.filter(note => note.id !== noteId))

        //ADDING ARCHIVE...!!!
        setArchivedNotes([...archivedNotes, { ...addNoteToArchive }])
        console.log(addNoteToArchive);

        //Archive Menu Open and Close...!!!
        handleArchiveIcon()

    }

    const handleArchiveIcon = () => {
        if (noteContent) {

            //Archive Menu Open and Close...!!!
            archiveOn ? setarchiveOn(false) : setarchiveOn(true)
        } else alert("Plain notes cannot be archived...")
    }
    return (
        <div className="main-container">
            <FontAwesomeIcon icon={faFileArrowUp} className="archive-icon " onClick={handleArchiveIcon} />
            <div className={archiveOn ? `archive-container` : `archive-container-off`}>
                <ul>
                    <li onClick={() => handleArchive()}>Archive</li>
                </ul>
            </div>
        </div>
    )
}

export default Archive
