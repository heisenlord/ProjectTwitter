import React from 'react';
import notatwitter from '../../Assests/NotATwitter.png'
import './nav.css';

export const Nav = () => {
  return (
    <div className='Nav'>
 
        <ul className='navul'>
            <li className='navli pp'>
            </li>
            <li class="navname notatiwtter"><p>
                Not<span class="Aspan">A</span>Twitter
                   </p></li>
            <li className='donotupgrade'>
                <p className='navlip'>
                   Don't
                    <br></br>
                    Upgarde
                </p>
            </li>
        </ul>
       
    </div>
  )
}
