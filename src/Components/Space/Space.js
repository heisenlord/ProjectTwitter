import React from 'react'
import './space.css';
import profilpp from '../../Assests/ProfilePic.jpg';
import { Post } from '../Post/Post';
export const Space = () => {
  return (
    <div className='space'>
        <div class="typepost">
            <ul className='typepostul'>
                <li className='typepostli'><img className='sideimgpp pp' src={profilpp} alt=""/></li>
                <li className='typepostli textareali'><textarea
                className="stextarea w-full bg-transparent text-xl placeholder-twitter-gray outline-none resize-none"
                placeholder="What's not happening?"
                rows={3}
              /></li>
                <li className='typepostli'></li>
            </ul>
        </div>
        <div className='line'></div>
        <Post/>


    </div>
  )
}
