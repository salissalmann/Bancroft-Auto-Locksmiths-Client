import React, { useState } from "react";
import Context from "./Context"

const States = (props)=>
{
    const AdminEmail = "admin@nu.edu.pk";
    const [ Order , SetOrder ] = useState()
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [RedirectToCart , SetRedirectToCart ] = useState(false)
    return (
        <Context.Provider value={{ AdminEmail , Order , SetOrder , isLoggedIn, setIsLoggedIn, RedirectToCart , SetRedirectToCart }}>
            {props.children}
        </Context.Provider>
    )
}

export default States;
