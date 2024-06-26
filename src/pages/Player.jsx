import { CalendarOutlined, ClockCircleOutlined, DownOutlined, PlayCircleOutlined, StarFilled } from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { useNavigate, useParams } from 'react-router-dom';
import Header from './Header';

function Player() {
    const nav = useNavigate()
    const { slug, type, esp } = useParams();
    let [video, setVideo] = useState()
    useEffect(() => {
        (async () => {
            let res = await axios.get(`https://ophim1.com/phim/${slug}`)
            setVideo(res.data)
        })()
    }, [])

    console.log(video?.episodes)

    window.scrollTo(0, 0)

    return (
        <>
            <Header />
            {video != undefined ? (
                <ReactHlsPlayer
                    className='px-52'
                    style={{ height: '500px' }}
                    src={video?.episodes[0]?.server_data[esp]?.link_m3u8}
                    autoPlay={true}
                    controls={true}
                    width="100%"
                />
            ) : ''}
            <div className='flex px-52 gap-x-8 mt-24'>
                <img src={video?.movie.thumb_url} alt="" className='w-1/4 object-cover' />
                <div className='flex flex-col text-white font-sans'>
                    <div className='text-4xl'>{video?.movie.name}</div>
                    <div className='mt-16 flex gap-x-2 items-center'>{video?.movie?.category.map((e, i) => {
                        if (i < 2) {
                            return (
                                <span key={e.id} className='rounded-lg bg-white text-black p-2.5'>{e.name}</span>
                            )
                        }
                    })}
                        <span><CalendarOutlined /> {video?.movie?.year}</span>
                        <span><ClockCircleOutlined /> {video?.movie?.time}</span>
                        <span><StarFilled /> {video?.movie?.tmdb.vote_average}</span>
                    </div>
                    <div className='text-lg mt-6 line-clamp-3'>
                        {video?.movie?.content.slice(3, video?.movie?.content.length - 4)}
                    </div>
                    <div className='flex flex-col gap-3 mt-11'>
                        <span>Country : {video?.movie?.country[0].name}</span>
                        <span>Genre : {video?.movie?.category[0].name}</span>
                        <span>View : {video?.movie?.view}</span>
                        <span>Actor : {video?.movie?.actor.toString().replaceAll(',', ', ')}</span>
                    </div>
                </div>
            </div>
            {type == 'tv' ? (
                <div className='text-white mt-24 px-52'>
                    <p className='text-2xl mb-8'>All Episodes <DownOutlined /></p>
                    <div className='flex gap-x-8'>
                        <div className='flex flex-col w-1/2 gap-y-6'>
                            {video?.episodes[0]?.server_data.map((e, i) => {
                                if (i < Math.ceil(video?.episodes[0]?.server_data?.length / 2)) {
                                    return (
                                        <div onClick={() => {
                                            nav(`../${e.name}`, { relative: 'path' })
                                        }}
                                            key={e.name} className={`text-lg cursor-pointer ${esp == e.name ? 'bg-red-600 text-white' : 'bg-white text-black'} p-4 rounded-md`}><PlayCircleOutlined /> Episode {e.name}</div>
                                    )
                                }
                            })}
                        </div>
                        <div className='flex flex-col w-1/2 gap-y-6'>
                            {video?.episodes[0]?.server_data.map((e, i) => {
                                if (i > Math.floor(video?.episodes[0]?.server_data?.length / 2)) {
                                    return (
                                        <div onClick={() => {
                                            nav(`../${e.name}`, { relative: 'path' })
                                        }}
                                            key={e.name} className={`text-lg cursor-pointer ${esp == e.name ? 'bg-red-600 text-white' : 'bg-white text-black'} p-4 rounded-md`}><PlayCircleOutlined /> Episode {e.name}</div>
                                    )
                                }
                            })}
                        </div>
                    </div>
                </div>
            ) : ''}
        </>

    )
}

export default Player
