import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Profileuser } from './Components/Profile/Profileuser';
import { Mainpage } from './Components/Mainpage/Mainpage';
import { Nav } from './Components/Nav/Nav';
function App() {
  return (
    <div className="App">
        <Nav/>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/profile" element={< Profileuser/>} />
        
        </Routes>
        
      </BrowserRouter>
      

    </div>
  );
}

export default App;
