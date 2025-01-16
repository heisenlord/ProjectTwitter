import React from 'react';
import './trending.css';

export const Trending = () => {
  return (
    <div>
        <div class="trending">
            <p className='trendinghead'>Current Trending</p>
            <div className='line'></div>
            <div className='trendingtagbox'>
                <p className='contenttagp'>Trending</p>
                <h1 className='contenttag'>#NotSarcasm</h1>
              
            </div>
            <div className='trendingtagbox'>
            <p className='contenttagp'>Trending</p>
                <h1 className='contenttag'>#NotMovies</h1>

            </div>
            <div className='trendingtagbox'>                <p className='contenttagp'>Trending</p>
            <h1 className='contenttag'>#NotJaiBabu</h1>
            </div>
            
        </div>

    </div>
  )
}
