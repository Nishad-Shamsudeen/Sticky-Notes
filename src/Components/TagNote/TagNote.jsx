import React, { useContext, useRef, useState } from 'react'
import './TagNote.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTags } from '@fortawesome/free-solid-svg-icons';
import { NotesContext } from '../../Context/NotesContext';

function TagNote({ noteId }) {

  const [tagOn, setTagOn] = useState(false)
  const { newDivs, setNewDivs } = useContext(NotesContext)
  const selectRef = useRef();

  const handleTagIcon = () => {
    //Tag Menu Open and Close...!!!
    tagOn ? setTagOn(false) : setTagOn(true)

  }
  const handleTagList = (tagValue) => {
    //Tag Menu Open and Close...!!!
    tagOn ? setTagOn(false) : setTagOn(true)
    //Adding tag as heading of the note
    const tagHeading = newDivs.map(newDiv => {
      if (noteId === newDiv.id) {
        return {
          ...newDiv,
          heading: tagValue
        }
      }
      return newDiv;
    })
    setNewDivs(tagHeading)
  }
  return (
    <div className="tag-select-menu">
      <FontAwesomeIcon icon={faTags} className="tag-menu " onClick={handleTagIcon} />
      <div className={tagOn ? `tag-content` : `tag-content-off`}>
        <ul>
          <li onClick={() => handleTagList("Work")}>work</li>
          <li onClick={() => handleTagList("personal")}>personal</li>
          <li onClick={() => handleTagList("Urgent")}>Urgent</li>
          <li onClick={() => handleTagList("New Ideas")}>New Ideas</li>
          <li onClick={() => handleTagList("Others")}>Others</li>
        </ul>
      </div>

    </div>
  )
}

export default TagNote
