import {
  ArrowRightOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Carousel } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./App.css";
import Header from './pages/Header'
import { useNavigate } from 'react-router-dom';

const contentStyle = {
  height: '60vh',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: '#364d79',
};

const App = () => {
  let count = 0;
  const [listUpdate, setListUpdate] = useState()
  const nav = useNavigate()

  useEffect(() => {
    (async () => {
      let res = await axios.get(`https://ophim1.com/danh-sach/phim-moi-cap-nhat?page=$1`)
      res.data['items']?.sort((a, b) => b.tmdb.vote_average - a.tmdb.vote_average)
      setListUpdate([...res.data['items']])
    })()
  }, [])

  return (
    <>
      <Header />
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
                  <div key={e._id} onClick={() => {
                    nav(`/player/${e.tmdb.type}/${e.slug}`)
                  }}>
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
            {listUpdate?.map((e, i) => {
              if (e.tmdb.type == 'movie' && count < 4) {
                count++
                return (
                  <div key={e._id} className='w-64 flex flex-col' onClick={() => {
                    nav(`/player/${e.tmdb.type}/${e.slug}`)
                  }}>
                    <img className='h-80 object-cover' src={`https://img.ophim.live/uploads/movies/${e.thumb_url}`} alt="" />
                    <h2 className='font-semibold text-center'>{e.name}</h2>
                  </div>
                )
              }
              if (count == 4 && i == listUpdate.length - 1) count = 0
            })}
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
            {listUpdate?.map((e, i) => {
              if (e.tmdb.type == 'tv' && count < 4) {
                count++
                return (
                  <div key={e._id} className='w-64 flex flex-col' onClick={() => {
                    nav(`/player/${e.tmdb.type}/${e.slug}`)
                  }}>
                    <img className='h-80 object-cover' src={`https://img.ophim.live/uploads/movies/${e.thumb_url}`} alt="" />
                    <h2 className='font-semibold text-center'>{e.name}</h2>
                  </div>
                )
              }
              if (count == 4 && i == listUpdate.length - 1) count = 0
            })}
          </div>
        </div>
        {/* /Series */}
      </div>
    </>
  )
}

export default App
