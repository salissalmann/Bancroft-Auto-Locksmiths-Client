import React from 'react'
import './Navigation.css'
import {BsCart} from 'react-icons/bs'

export default function Navigation() {
  return (
    <>
    <div id="Navbar">
        <div id="Component-1">
            <h3>Bancroft Auto Locksmiths</h3>
        </div>
        <div id="Component-2">
            <h6>Contact Us</h6>
            <h6>Help</h6>
            <h6>|</h6>
            <h6>Login</h6>
            <h6>Register</h6>
            <h3><BsCart/></h3>
        </div>
    </div>

    </>
  )
}
