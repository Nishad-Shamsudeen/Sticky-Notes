import React, { useContext, useState, useRef } from 'react'
import './AddNote.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faThumbtackSlash, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { NotesContext } from '../../Context/NotesContext';
import TagNote from '../TagNote/TagNote';

function AddNote() {


    const editorRef = useRef(null);
    const [notePinedFlag, setNotePinedFlag] = useState(false)//Dummy state
    const [checkNote, setCheckNote] = useState(false)
    const [downMenu, setDownMenu] = useState(false)


    const { newDivs, setNewDivs } = useContext(NotesContext)
    // Dynamic Notes Creation...!!!!!
    const handleAddNote = () => {
        // console.log("testing");

        setCheckNote(true)
        const newDivForNote = {
            id: Date.now(),
            content: "",
            x: 100,
            y: 100,
            pinned: false,
            heading: ""
        }
        setNewDivs([...newDivs, newDivForNote])
        saveNotes()
    }

    //Removing(Closing) Notes...!!!
    const handleClose = (divId) => {
        const filterArr = newDivs.filter(newDiv => newDiv.id !== divId)
        setNewDivs(filterArr)

    }
    //Adding & Editing Notes...!!!
    //Old Notes Using Text Area...remove after complete the project
    // const handleUpdateNote = (targetValue, IdToUpdate) => {

    //     const updatedDivs = newDivs.map(div => {
    //         if (div.id === IdToUpdate) {
    //             return { ...div, content: targetValue }
    //         }
    //         return div;
    //     })
    //     setNewDivs(updatedDivs)
    //     saveNotes()
    // }

    //Adding & Editing Notes Using DIV...!!!
    const handleInputDiv = (noteId) => {
        const updatedDivs = newDivs.map(div => {
            if (div.id === noteId) {
                // Storing the inner text of the editable div into state using * editorRef.current.innerText *..!!
                return { ...div, content: editorRef.current.innerText }
            }
            return div;
        })
        setNewDivs(updatedDivs)
        saveNotes()
    }

    //Saving Notes in Loacal Storage...!!!
    function saveNotes() {
        localStorage.setItem('sticyNotes', JSON.stringify(newDivs))
    }
    //Drag & Drop Notes...!!!
    const handleDrag = (e, id) => {
        const updateDragNote = newDivs.map(newDiv => {
            if (newDiv.id === id) {
                return {
                    ...newDiv,
                    x: e.clientX - 50,
                    y: e.clientY - 20
                };
            }
            return newDiv;
        })
        setNewDivs(updateDragNote)
    }

    // Handle pinned and unpinned notes...!!!
    const handlePinNote = (id) => {
        const pinnedNote = newDivs.map(newDiv => {
            if (newDiv.id === id) {
                return {
                    ...newDiv,
                    x: newDiv.x,
                    y: newDiv.y,
                    pinned: !newDiv.pinned
                };
            }
            return newDiv;
        })
        setNewDivs(pinnedNote)
    }

    //Handle Mark Down Menu
    const handleDownMenuIcon = () => {
        //Mark Down Menu Open and Close...!!!
        downMenu ? setDownMenu(false) : setDownMenu(true)
    }
    const formatText = (command) => {
        downMenu ? setDownMenu(false) : setDownMenu(true)
        document.execCommand(command, false, null);
        editorRef.current.focus();
    }

    return (
        <div className='add-container'>
            <button className='add-new' onClick={handleAddNote}><FontAwesomeIcon className="icon" icon={faPlus} />Add Note</button>
            <div className="sticky-note-container">
                {/* Dynamic Notes Creation...!!!!!  */}

                {
                    checkNote ? newDivs.map((newDiv) => (
                        <div className="sticky-note" onMouseDown={() => {
                            if (!newDiv.pinned) {
                                const handleMouseMove = (eventMove) => handleDrag(eventMove, newDiv.id)
                                //Cleanup Function....!!!
                                const handleMouseUp = () => {
                                    document.removeEventListener('mousemove', handleMouseMove);
                                    document.removeEventListener('mouseup', handleMouseUp)
                                }

                                document.addEventListener('mousemove', handleMouseMove)
                                document.addEventListener('mouseup', handleMouseUp)
                            }
                        }}
                            style={{
                                left: newDiv.x,
                                top: newDiv.y,
                                cursor: 'move',
                                position: newDiv.pinned ? 'fixed' : 'absolute'
                            }}>
                            {/* Tag notes component...!!! */}
                            <TagNote noteId={newDiv.id} />

                            <button className="delete-btn" onClick={() => handleClose(newDiv.id)}>X</button>
                            <h3 className='note-heading'>{newDiv.heading}</h3>

                            {/* Adding Note Text*/}

                            <div
                                className="editable-area sticky-note-div"
                                ref={editorRef}
                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                onInput={() => handleInputDiv(newDiv.id)}
                            >
                            </div>

                            {/* Mark Down And New Notes */}
                            <FontAwesomeIcon icon={faEllipsisVertical} className='mark-down-menu' onClick={handleDownMenuIcon} />
                            <div className={downMenu ? `down-menu-content` : `down-menu-content-off`}>
                                <ul>
                                    <li onClick={() => formatText("bold")}>Bold</li>
                                    <li onClick={() => formatText("italic")}>Italic</li>
                                    <li onClick={() => formatText("underline")}>Underline</li>

                                </ul>
                            </div>

                            {/* <textarea value={newDiv.content} onChange={(e) => handleUpdateNote(e.target.value, newDiv.id)}></textarea> */}
                            <div className="move-icon">
                                <FontAwesomeIcon icon={faBars} />
                            </div>
                            <div className={`common-pin ${newDiv.pinned ? `unpin-icon` : `pin-icon`}`} onClick={() => {
                                handlePinNote(newDiv.id); console.log(newDiv.pinned);
                            }}>
                                <FontAwesomeIcon icon={newDiv.pinned ? faThumbtack : faThumbtackSlash} />
                            </div>
                        </div>
                    )) : ""
                }
            </div>

        </div>
    )
}

export default AddNote
