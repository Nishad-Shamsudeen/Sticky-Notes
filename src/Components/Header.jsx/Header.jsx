import React, { useContext, useState } from 'react'
import './Header.css'
import Logo from '../../assets/Sticky 4.png'
import menu_logo from '../../assets/menu-icon.png'
import DropDown from '../ArchiveDropDown/DropDown';
import { NotesContext } from '../../Context/NotesContext';

export default function Header() {

  const { newDivs, setNewDivs, mobileMenu, setMobileMenu, 
    showDropDown, setShowDropDown } = useContext(NotesContext)

  const handleArchiveMenu = () => {

    setShowDropDown(prev => !prev)// Toggle dropdown visibility
    // console.log(showDropDown)
  }

  const toggleMenu = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true)
  }
  return (
    <>
      <nav className="container dark-nav">
        <div className="left">
          <img src={Logo} alt="" className='logo' />
          <h1>Sticky Note</h1>
        </div>
        <div className="right-side">
          <ul className={mobileMenu ? `hide-mobile-menu` : ``}>
            <li onClick={() => handleArchiveMenu()}>Archive List</li>
            {/* <li onClick={undo}>Undo</li>
            <li onClick={redo}>Redo</li> */}
          </ul>
        </div>
        <img src={menu_logo} alt="" className='menu-logo' onClick={toggleMenu} />
      </nav>
      <DropDown showDropDown={showDropDown} />
    </>
  )
}
