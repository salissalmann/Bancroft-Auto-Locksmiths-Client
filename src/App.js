import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewHomePage from "./Components/NewHomepage/Homepage"
import Cart from "./Components/Cart/Cart.jsx"
import Login from "./Components/Login/Login.jsx"
import Signup from "./Components/Signup/Signup.jsx"
import Dashboard from "./Components/Dashboard/Dashboard";
import States from './Context/States'
import  ProtectedRoute from "./Routing";
import AdminLogin from './Components/Admin/Admin-Login'
import AdminDashboard from './Components/Admin Dashboard/Dashboard'
import Contact from './Components/Contact/Contact'
import Orders from "./Components/Orders/Orders";

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
              <Route path="/dashboard" element={
                  <ProtectedRoute>
                  <Dashboard/>
                  </ProtectedRoute>
              }/>

              <Route path="*" element={<Login/>}/>
              <Route path="/staging.admin" element={<AdminLogin/>}/>
              <Route path="/admindashboard" element={
                  <ProtectedRoute>
                    <AdminDashboard/>                     
                  </ProtectedRoute>
              }/>
              <Route path="/contact" element={<Contact/>}/>

              <Route path="/order" element={<Orders/>}/>
 

           
            </Routes>
        </BrowserRouter>
      </States>
    </div>
  );
}

export default App;
