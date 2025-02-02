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
import { Profileuser } from './Components/Profile/Profileuser';
import { UserProvider } from '../src/Components/UserContext'; // Adjust the path as needed
import { PReply } from './Components/PReply/PReply';
import { Postdummy } from './Components/PostDummy/Postdummy';

function App() {
  return (
    <UserProvider>
    <div className="App">
        <Nav/>
       <BrowserRouter>
        <Routes>
        <Route path="/" element={<Profileuser />} />
   
          <Route path="/post/:id" element={<PTweet/>}/>
          <Route path="/notifications" element={<Notifications/>}/>
          <Route path="/search" element={<Search/>}/>
          <Route path="/bookmarks" element={<Bookmarks/>}/>
          <Route path="/:name/" element={<Mainpage />} />
          <Route path="/:name/post/:id" element={<PTweet/>}/>
          <Route path="/:name/post/:id/:repid" element={<PReply/>}/>
          <Route path="/profile" element={    <Profileuser/>} />

          <Route path="/:name/notifications" element={<Notifications/>}/>
          <Route path="/:name/search" element={<Search/>}/>
          <Route path="/:name/bookmarks" element={<Bookmarks/>}/>
          <Route path="/:name/:userDb/post/:did" element={<Postdummy/>}/>

       


        </Routes>
        
      </BrowserRouter>
      

    </div>
    </UserProvider>

  );
}

export default App;
