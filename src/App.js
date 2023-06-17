import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewHomePage from "./Components/NewHomepage/Homepage"
import Cart from "./Components/Cart/Cart.jsx"
import Login from "./Components/Login/Login.jsx"
import Signup from "./Components/Signup/Signup.jsx"

import States from './Context/States'
import  ProtectedRoute from "./Routing";

function App() {

  return (
       <div className="App">
        <States>
          <BrowserRouter>
            <Routes>                
              <Route path="/"  element={<NewHomePage/>} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/createaccount" element={<Signup/>}/>
              <Route path="/checkout" element={
                  <ProtectedRoute>
                  <Cart/>
                  </ProtectedRoute>
              }/>
            </Routes>
        </BrowserRouter>
      </States>
    </div>
  );
}

export default App;
