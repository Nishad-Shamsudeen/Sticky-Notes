import React, { useState } from 'react'
import './AddNote.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faBars } from '@fortawesome/free-solid-svg-icons';
import { width } from '@fortawesome/free-solid-svg-icons/fa0';
function AddNote() {

    const [notes, setNote] = useState('')//Dummy state
    const [checkNote, setCheckNote] = useState(false)
    const [newDivs, setNewDivs] = useState([])

    // Dynamic Notes Creation...!!!!!
    const handleAddNote = () => {
        setCheckNote(true)
        const newDivForNote = {
            id: Date.now(),
            content: "",
            x: 100,
            y:100,
        }
        setNewDivs([...newDivs, newDivForNote])
        // console.log(newDivs)
        saveNotes()
    }

    //Removing(Closing) Notes...!!!
    const handleClose = (divId) => {
        const filterArr = newDivs.filter(newDiv => newDiv.id !== divId)
        setNewDivs(filterArr)

    }
    //Adding & Editing Notes...!!!
    const handleUpdateNote=(targetValue,IdToUpdate)=>{
        
        const updatedDivs=newDivs.map(div=>{
            if(div.id===IdToUpdate){
                return{...div,content:targetValue}
            }
            return div;
        })
        setNewDivs(updatedDivs)
        saveNotes()
    }

    //Saving Notes in Loacal Storage...!!!
    function saveNotes(){
        localStorage.setItem('sticyNotes',JSON.stringify(newDivs))
    }
    
    //Testing...!!!
    // document.addEventListener('click',(e)=>{
       
        
    // })

    //Drag & drop Function...!!!
    const handleDrag=(e,id)=>{
       const updateDragNote= newDivs.map(newDiv=>{

        if(newDiv.id ===id){
            return{
                ...newDiv,
                x:e.clientX -50,
                y:e.clientY -20
            };
        }
        return newDiv;
       })
       setNewDivs(updateDragNote)
        

    }

    return (
        <div className='add-container'>
            <button className='add-new' onClick={handleAddNote}><FontAwesomeIcon icon={faPlus} />Add Note</button>
            <div className="sticky-note-container">
                {/* Dynamic Notes Creation...!!!!!  */}
            
                {
                    checkNote ? newDivs.map((newDiv) => (
                        <div className="sticky-note" onMouseDown={()=>{
                        const handleMouseMove=(eventMove)=>handleDrag(eventMove,newDiv.id)
                        //Cleanup Function....!!!
                        const handleMouseUp=()=>{
                            document.removeEventListener('mousemove',handleMouseMove);
                            document.removeEventListener('mouseup',handleMouseUp)
                        }
                        
                        document.addEventListener('mousemove',handleMouseMove   )
                        document.addEventListener('mouseup',handleMouseUp)
                        }}
                        style={{
                            left:newDiv.x,
                            top:newDiv.y,
                            cursor:'move',
                            

                        }}>

                            <button className="delete-btn" onClick={() => handleClose(newDiv.id)}>X</button>
                            <textarea name="" id=""value={newDiv.content} onChange={(e)=>handleUpdateNote(e.target.value,newDiv.id)}></textarea>
                            
                            <div className="move-icon">
                                <FontAwesomeIcon icon={faBars} />
                            </div>

                        </div>

                    )) : ""
                }



                {/* <div className="sticky-note">

            <button className="delete-btn">X</button>
            <textarea name="" id=""></textarea>
            <div className="move-icon"><FontAwesomeIcon icon={faBars} /></div>
            </div>
             <div className="sticky-note">

            <button className="delete-btn">X</button>
            <textarea name="" id=""></textarea>
            <div className="move-icon"><FontAwesomeIcon icon={faBars} /></div>
            
            </div>
             <div className="sticky-note">

            <button className="delete-btn">X</button>
            <textarea name="" id=""></textarea>
            <div className="move-icon"><FontAwesomeIcon icon={faBars} /></div>
            
            </div>
             <div className="sticky-note">

            <button className="delete-btn">X</button>
            <textarea name="" id=""></textarea>
            <div className="move-icon"><FontAwesomeIcon icon={faBars} /></div>
            
            
            </div> */}
            </div>

        </div>
    )
}

export default AddNote
