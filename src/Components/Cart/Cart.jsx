import React , {useContext } from 'react'
import Navigation from '../Navigation/Navigation'
import Context from "../../Context/Context"
import './Cart.css'
export default function Cart() 
{
    const Global = useContext(Context)
    return (
    <>
        <Navigation/>
        <div className='container my-5' id="Div-Holder">
            <div className='Order-Display'>


            </div>
            <div className='Card-Payment'>
                
            </div>
        </div>
    </>
    )
}
