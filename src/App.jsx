import {
  ArrowRightOutlined,
  BellOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Carousel } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./App.css";

const contentStyle = {
  height: '60vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => {
  let listRecentMov = [];
  let listRecentTV = [];
  const [listUpdate, setListUpdate] = useState()

  useEffect(() => {
    (async () => {
      let res = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=$1`)
      setListUpdate([...res.data['items']])
    })()
  }, [])

  listUpdate?.map((e, i) => {
    if (e.tmdb.type == 'movie' && listRecentMov.length < 4) {
      listRecentMov.push(e)
    } else if (e.tmdb.type == 'tv' && listRecentTV.length < 4) {
      listRecentTV.push(e)
    }
  })

  listUpdate?.sort((a, b) => b.tmdb.vote_average - a.tmdb.vote_average)

  return (
    <>
      <nav className='bg-black flex justify-center items-center gap-x-6' style={{ height: '15vh' }}>
        <div className='flex text-white gap-4'>
          <a href="">Home</a>
          <a href="">Genre</a>
          <a href="">Country</a>
        </div>
        <div>
          <input className="rounded-3xl" type="text" placeholder="Search movies......." />
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
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}>1</h3>
        </div>
        <div>
          <h3 style={contentStyle}>2</h3>
        </div>
        <div>
          <h3 style={contentStyle}>3</h3>
        </div>
        <div>
          <h3 style={contentStyle}>4</h3>
        </div>
      </Carousel>
      <div className='text-white pt-20 px-40'>
        {/* Recently Updated */}
        <div id='recently'>
          <h2 className='font-medium'>Recently Updated</h2>
          <Carousel arrows infinite={false}>
            <div>
              <h3 style={{
                height: '20vh',
                color: '#fff',
                lineHeight: '160px',
                textAlign: 'center',
              }}>1</h3>
            </div>
            <div>
              <h3 style={{
                height: '20vh',
                color: '#fff',
                lineHeight: '160px',
                textAlign: 'center',
              }}>2</h3>
            </div>
            <div>
              <h3 style={{
                height: '20vh',
                color: '#fff',
                lineHeight: '160px',
                textAlign: 'center',
              }}>3</h3>
            </div>
            <div>
              <h3 style={{
                height: '20vh',
                color: '#fff',
                lineHeight: '160px',
                textAlign: 'center',
              }}>4</h3>
            </div>
          </Carousel>
        </div>
        {/* /Recently Updated */}
        {/* Trending */}
        <div id='trending' className='mb-20'>
          <div className='flex justify-between mb-6'>
            <h2 className='font-bold'>Trending</h2>
            <p className='text-gray-400 cursor-pointer'>View all <ArrowRightOutlined /></p>
          </div>
          <div className='flex justify-between'>
            {listUpdate?.map((e, i) => {
              if (i < 3) {
                return (
                  <div>
                    <img className='w-80 h-72 object-cover' src={`https://img.ophim.live/uploads/movies/${e.thumb_url}`} alt="" />
                    <div className='flex justify-between items-center'>
                      <h2 className='w-36 font-semibold truncate'>{e.name}</h2>
                      <div className='flex gap-3'>
                        <div className=' rounded-full p-2 bg-red-600'>
                          {e.tmdb.vote_average} <StarFilled />
                        </div>
                        <div className=' rounded-full p-2 bg-red-600'>
                          {e.year}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
        {/* /Trending */}

        {/* Movie */}
        <div id='movie' className='mb-20'>
          <div className='flex justify-between mb-6'>
            <h2 className='font-bold'>New Release - Movies</h2>
            <p className='text-gray-400 cursor-pointer'>View all <ArrowRightOutlined /></p>
          </div>
          <div className='flex justify-between'>
            {listRecentMov?.map(e => {
              return (
                <div key={e._id} className='w-64 flex flex-col'>
                  <img className='h-80 object-cover' src={`https://img.ophim.live/uploads/movies/${e.thumb_url}`} alt="" />
                  <h2 className='font-semibold text-center'>{e.name}</h2>
                </div>
              )
            }
            )}
          </div>
        </div>
        {/* /Movie */}

        {/* Series */}
        <div id='series'>
          <div className='flex justify-between mb-6'>
            <h2 className='font-bold'>New Release - Series</h2>
            <p className='text-gray-400 cursor-pointer'>View all <ArrowRightOutlined /></p>
          </div>
          <div className='flex justify-between'>
            {listRecentTV?.map(e => {
              return (
                <div key={e._id} className='w-64 flex flex-col'>
                  <img className='h-80 object-cover' src={`https://img.ophim.live/uploads/movies/${e.thumb_url}`} alt="" />
                  <h2 className='font-semibold text-center'>{e.name}</h2>
                </div>
              )
            }
            )}
          </div>
        </div>
        {/* /Series */}
      </div>
    </>
  )
}

export default App
