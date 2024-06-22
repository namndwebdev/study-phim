import { BellOutlined } from '@ant-design/icons'
import React from 'react'

function Header() {
    return (
        <nav className='bg-black flex justify-center items-center gap-x-6' style={{ height: '15vh' }}>
            <div className='flex text-white gap-4'>
                <a href="">Home</a>
                <a href="">Genre</a>
                <a href="">Country</a>
            </div>
            <div>
                <input id='search' className="rounded-3xl" type="text" placeholder="Search movies......." />
            </div>
            <div className='flex text-white gap-4'>
                <a href="">Movies</a>
                <a href="">Series</a>
                <a href="">Animation</a>
            </div>
            <div className='flex text-white gap-4'>
                <a href="">Login/Singup</a>
                <BellOutlined />
            </div>
        </nav>
    )
}

export default Header
