import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Components/Homepage/HomePage";
import NewHomePage from "./Components/NewHomepage/Homepage"
function App() {
  return (
       <div className="App">
        <BrowserRouter>
          <Routes>                
            <Route path="/" element={<HomePage/>} />
            <Route path="/Home" element={<NewHomePage/>} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
