import React from 'react'
import image from '../images/logo.png'
import '../css/Navbar.css'
function Navbar() {
    return (
        <div className='navbar'>
            <img className="nav_image" src={image} alt=""/>
        </div>
    )
}

export default Navbar
