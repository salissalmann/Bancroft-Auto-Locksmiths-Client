import React, { useContext , useState } from 'react'
import Navigation from '../Navigation/Navigation'
import Footer from '../Footer/Footer'
import "./Login.css"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import Context from "../../Context/Context"

export default function Login() {
    const Global = useContext(Context)

    const [email, SetEmail] = useState();
    const [password, SetPassword] = useState();
  
    const Navigate = useNavigate();
  
    const HandleEmailValue = (event) => {SetEmail(event.target.value);};
    const HandlePasswordValue = (event) => {SetPassword(event.target.value);};
    const Submit = async (e) => 
    {
      e.preventDefault();
      console.log("Helo")
      let Success = false;
      try
      {
        //On Success 

        Global.setIsLoggedIn(true)

        if(Global.RedirectToCart )
        {
            Navigate("/checkout");
        }
        else
        {
            Navigate("/createaccount")
        }


        /*
         const Response = await fetch("http://localhost:3001/officers/officerLogin", 
         {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
    
        const ResponseToJson = await Response.json();
        Success = ResponseToJson.Success;
        if (Success) {
          toast.success("Login Successful");
          setTimeout(() => {
              Navigate("/checkout");
        }, 1000)}
        else 
        {
          toast.error("Invalid Credentials");
        }
        */


      }
      catch(err)
      {
          console.log(err);
      }
    }

    return (
    <>  
        <Navigation/>
            

        <div className='container my-5' id="Div-Holder">
            <div className='sidebar2'>
                <img src="/Sidebar2.png" alt="Sidebar"></img>
            </div>
            <div className='sidebar1'>
                    <h4 className='sidebar1-Title'>Login</h4>
                    <h5 className='sidebar1-Title2'>Enter Account Information</h5>
                    <form onSubmit={Submit}>
                        <div className="form">
                            <input name="email" id="email" placeholder="Email" autoComplete='off' className="sidebar1-text" label="Email" onChange={HandleEmailValue} />
                            <input type="password" name="password"  id="password" autoComplete='off' placeholder="Password"  className="sidebar1-text"  label="Password"   onChange={HandlePasswordValue}   />
                        </div>
                    <div className="login-2">
                        <button type="submit" className="login-button"> Login </button>
                    </div>
                    
                    <h6 className='sidebar1-Title3'>Don't have an account? <Link to="/createaccount">Create Account</Link></h6>
                    
                    </form>
            </div>
        </div>
        <ToastContainer theme="colored"/>
        <Footer/>
    
    </>
  )
}