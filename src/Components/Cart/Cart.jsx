import React , {useContext } from 'react'
import Navigation from '../Navigation/Navigation'
import Context from "../../Context/Context"

export default function Cart() 
{
    const Global = useContext(Context)

    return (
    <>
        <Navigation/>

        <div>

            
        </div>
        {Global.Order && <h4>{Global.Order.Total}</h4>}
    </>
  )
}
