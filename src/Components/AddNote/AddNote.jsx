import React, { useContext, useState, useRef, useEffect } from 'react'
import './AddNote.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars, faThumbtackSlash, faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { NotesContext } from '../../Context/NotesContext';
import TagNote from '../TagNote/TagNote';
import Archive from '../Archive/Archive';
import { noteColors } from '../../Store/ColorPalette';

function AddNote() {

    const editorRef = useRef({});
    const [checkNote, setCheckNote] = useState(true)
    const { newDivs, setNewDivs } = useContext(NotesContext)

    useEffect(() => {
        const storedNotes = localStorage.getItem('stickyNotes');
        if (storedNotes) {
            setNewDivs(JSON.parse(storedNotes));
        }
    }, []);
    // Dynamic Notes Creation...!!!!!
    const handleAddNote = () => {
        // console.log("testing");

        setCheckNote(true)
        const newDivForNote = {
            id: Date.now(),
            content: "",
            x: 100,
            y: 120,
            pinned: false,
            heading: "",
            markDownMenu: false,
            archive: "",
            archiveFlag: false,
            //Adding colors for notes no pattern
            color: noteColors[Math.floor(Math.random() * noteColors.length)],
        }
        setNewDivs([...newDivs, newDivForNote])
        saveNotes()
    }

    //Removing(Closing) Notes...!!!
    const handleClose = (divId) => {
        console.log("current div Id.." + divId);
        console.log("Current note list...");
        console.log(newDivs);


        const filterArr = newDivs.filter(newDiv => newDiv.id !== divId)
        console.log("Note list after filter");

        console.log(filterArr);
        // Clean up the ref
        delete editorRef.current[divId];

        setNewDivs(filterArr)

    }

    //Adding & Editing Notes Using DIV...!!!
    const handleInputDiv = (noteId) => {

        const updatedDivs = newDivs.map(div => {

            if (div.id === noteId) {
                return {
                    ...div,
                    content: editorRef.current[noteId]?.innerText || ''
                };
            }
            return div;
        })
        setNewDivs(updatedDivs)
        //Save to local storage
        saveNotes()
    }

    //Saving Notes in Loacal Storage...!!!
    function saveNotes() {
        localStorage.setItem('stickyNotes', JSON.stringify(newDivs))
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
                    x: newDiv.x,    //Position of the Note
                    y: newDiv.y,
                    pinned: !newDiv.pinned
                };
            }
            return newDiv;
        })
        setNewDivs(pinnedNote)
    }

    //Handle Mark Down Menu
    const handleDownMenuIcon = (id) => {
        //Mark Down Menu Open and Close...!!!
        const downMenuOn = newDivs.map(newDiv => {
            if (newDiv.id === id) {

                return {
                    ...newDiv,

                    markDownMenu: !newDiv.markDownMenu
                };
            }
            return newDiv;
        })
        setNewDivs(downMenuOn)
    }
    //Note text styles changes here...BOLD,ITALIC,UNDERLINE!!!
    const formatText = (command, id) => {
        const editor = editorRef.current[id];
        if (editor) {
            editor.focus();//focusing selected text
            document.execCommand(command, false, null);
        }
        handleDownMenuIcon(id)  //Mark Down Menu Open and Close...!!!
        alert(id)
    }

    return (
        <div className='add-container '>
            <button className='add-new ' onClick={handleAddNote}><FontAwesomeIcon className="icon btn-top" icon={faPlus} />Add Note</button>
            <div className="sticky-note-container">
                {/* Dynamic Notes Creation...!!!!!  */}

                {
                    checkNote ? newDivs.map((newDiv) => (


                        <div className="sticky-note" key={newDiv.id} onMouseDown={() => {
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
                                position: newDiv.pinned ? 'fixed' : 'absolute',
                                background: newDiv.color
                            }}>



                            {/* Archive component...!!! */}
                            <Archive noteId={newDiv.id} noteContent={newDiv.content} />
                            {/* Tag notes component...!!! */}
                            <TagNote noteId={newDiv.id} />

                            <button className="delete-btn" onClick={() => handleClose(newDiv.id)}>X</button>
                            <h3 className='note-heading'>{newDiv.heading}</h3>

                            {/* Adding Note Text*/}


                            <div
                                className="editable-area sticky-note-div"
                                // *** MAKING THE REF DYNAMICALLY ***
                                //cleans up every time its UNMOUNT

                                // ref={(el) => {
                                //     if (el && !editorRef.current[newDiv.id]) {
                                //         editorRef.current[newDiv.id] = el;
                                //         el.innerText = newDiv.content;
                                //     }
                                // }}

                                //Below code is reversing...
                                ref={(el) => {
                                    if (el && !editorRef.current[newDiv.id]) {
                                        editorRef.current[newDiv.id] = el;
                                        el.innerText = newDiv.content; // only once at first render
                                    }
                                }}
                                // *** *** **** ****

                                contentEditable={true}
                                suppressContentEditableWarning={true}
                                //onBlur={() => handleInputDiv(newDiv.id)}
                                onInput={() => handleInputDiv(newDiv.id)}
                            //dangerouslySetInnerHTML={{ __html: newDiv.content }}


                            // {...(!newDiv.archiveFlag ? {} : { dangerouslySetInnerHTML: { __html: newDiv.content } })}


                            >
                            </div>

                            {/* Mark Down And New Notes */}
                            <FontAwesomeIcon icon={faEllipsisVertical} className='mark-down-menu' onClick={() => handleDownMenuIcon(newDiv.id)} />
                            <div className={newDiv.markDownMenu ? `down-menu-content` : `down-menu-content-off`}>
                                <ul>
                                    <li onClick={() => formatText("bold", newDiv.id)}>Bold</li>
                                    <li onClick={() => formatText("italic", newDiv.id)}>Italic</li>
                                    <li onClick={() => formatText("underline", newDiv.id)}>Underline</li>

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
