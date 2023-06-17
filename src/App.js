import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewHomePage from "./Components/NewHomepage/Homepage"
import Cart from "./Components/Cart/Cart.jsx"
import States from './Context/States'

function App() {
  return (
       <div className="App">
        <States>
          <BrowserRouter>
            <Routes>                
              <Route path="/"  element={<NewHomePage/>} />
              <Route path="/checkout" element={<Cart/>}/>
            </Routes>
        </BrowserRouter>
      </States>
    </div>
  );
}

export default App;
