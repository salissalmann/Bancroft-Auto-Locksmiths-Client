import React from 'react'
import './Navigation.css'
import { useNavigate } from 'react-router-dom'

export default function Navigation() {

  const Navigate = useNavigate()
  return (
    <>
    <div id="Navbar">
        <div id="Component-1">
            <h3><span>Bancroft Auto </span>Locksmiths</h3>
        </div>
        <div id="Component-2">
            <h6 onClick={()=>{Navigate('/')}}>Home</h6>
            <h6 onClick={()=>{Navigate('/contact')}}>Contact</h6>
            <h6 >|</h6>
            <h6 onClick={()=>{Navigate('/login')}}>Login</h6>
            <h6 onClick={()=>{Navigate('/createaccount')}}>Register</h6>
        </div>
    </div>

    </>
  )
}
