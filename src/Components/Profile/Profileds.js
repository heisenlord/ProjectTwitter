import React, { useEffect } from 'react';
import pp from '../../Assests/ProfilePic.jpg';
import './profile.css';
import tt2 from '../../Assests/ProfilePic.jpg';
import { Svg } from '../Post/Svg';
import { Comment } from '../Post/Comment';
import { Bookmark } from '../Post/Bookmark';
import { Like } from '../Post/Like';

export const Profileds = () => {
    useEffect(() => {
        document.title = "Profile";
      }, []);
    
  return (
    <div className='space  profileedsspace'>   
      <div className='profilespace'>
      <img className='profilepic' src={pp} alt=""/>
      <div className='divul'>

        <ul className='proful'>
          <li className='profuid'><p>ITSASIGNAL</p></li>
          <li className='profid'><h4>@vachasekkam</h4></li>

        </ul>
        <div class="Bio">
        <h3 className='Bioh1'>sarcs || RCB ♥️|| Leclerc || Lando Nowins || Konda annaw || Not A Editor</h3>
      </div>
      </div>

      </div>
      <div className='fullpost'>
      <div className='post '>
              <img className='sideimgpp' src={tt2} alt=""/>
              <div className='postcontent'>
                  <h4 className='name'>ITSASIGNAL <span class="blue-tick">
                     <Svg/></span> <span className='id'>@vachasekkam</span></h4>
                  
              <h1 className='tweet'>
              Tired of your tweets going unnoticed? On notATwitter, every post gets a reply. Yes, even your hot take on pineapple pizza will get a response. Welcome to a world where silence is never an option.        </h1>
              </div>
      
          </div>
          <div className='postreactions'>
              <ul className='postreactionsul'>
                  <li><Comment/></li>
            
      
                  <li><Bookmark/></li>
                  <li><Like/></li>
              </ul>
              
          </div>
          
          <div className='line'></div>
      
      </div>
      <div className='fullpost'>
      <div className='post '>
              <img className='sideimgpp' src={tt2} alt=""/>
              <div className='postcontent'>
                  <h4 className='name'>ITSASIGNAL <span class="blue-tick">
                     <Svg/></span> <span className='id'>@vachasekkam</span></h4>
                  
              <h1 className='tweet'>
              Tired of your tweets going unnoticed? On notATwitter, every post gets a reply. Yes, even your hot take on pineapple pizza will get a response. Welcome to a world where silence is never an option.        </h1>
              </div>
      
          </div>
          <div className='postreactions'>
              <ul className='postreactionsul'>
                  <li><Comment/></li>
            
      
                  <li><Bookmark/></li>
                  <li><Like/></li>
              </ul>
              
          </div>
          
          <div className='line'></div>
      
      </div>
      <div className='fullpost'>
      <div className='post '>
              <img className='sideimgpp' src={tt2} alt=""/>
              <div className='postcontent'>
                  <h4 className='name'>ITSASIGNAL <span class="blue-tick">
                     <Svg/></span> <span className='id'>@vachasekkam</span></h4>
                  
              <h1 className='tweet'>
              Tired of your tweets going unnoticed? On notATwitter, every post gets a reply. Yes, even your hot take on pineapple pizza will get a response. Welcome to a world where silence is never an option.        </h1>
              </div>
      
          </div>
          <div className='postreactions'>
              <ul className='postreactionsul'>
                  <li><Comment/></li>
            
      
                  <li><Bookmark/></li>
                  <li><Like/></li>
              </ul>
              
          </div>
          
          <div className='line'></div>
      
      </div> <div className='fullpost'>
      <div className='post '>
              <img className='sideimgpp' src={tt2} alt=""/>
              <div className='postcontent'>
                  <h4 className='name'>ITSASIGNAL <span class="blue-tick">
                     <Svg/></span> <span className='id'>@vachasekkam</span></h4>
                  
              <h1 className='tweet'>
              Tired of your tweets going unnoticed? On notATwitter, every post gets a reply. Yes, even your hot take on pineapple pizza will get a response. Welcome to a world where silence is never an option.        </h1>
              </div>
      
          </div>
          <div className='postreactions'>
              <ul className='postreactionsul'>
                  <li><Comment/></li>
            
      
                  <li><Bookmark/></li>
                  <li><Like/></li>
              </ul>
              
          </div>
          
          <div className='line'></div>
      
      </div>
      </div>
  )
}
