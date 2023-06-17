import React, { useState } from "react";
import Context from "./Context"

const States = (props)=>
{
    const AdminEmail = "admin@nu.edu.pk";
    const [ Order , SetOrder ] = useState()

    return (
        <Context.Provider value={{ AdminEmail , Order , SetOrder }}>
            {props.children}
        </Context.Provider>
    )
}

export default States;
