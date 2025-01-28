import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Mainpage } from './Components/Mainpage/Mainpage';
import { Profileds } from './Components/Profile/Profileds';
import { Nav } from './Components/Nav/Nav';

import { PTweet } from './Components/PTweet/PTweet';
import { Notifications } from './Components/Notifications/Notifications';
import { Search } from './Components/Search/Search';
import { Bookmarks } from './Components/Bookmarks/Bookmarks';
function App() {
  return (
    <div className="App">
        <Nav/>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/profile" element={    <Profileds/>} />
          <Route path="/post/:id" element={<PTweet/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/bookmarks" element={<Bookmarks/>}/>

        </Routes>
        
      </BrowserRouter>
      

    </div>
  );
}

export default App;
