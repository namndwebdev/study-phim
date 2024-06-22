import React from 'react'
import ReactHlsPlayer from 'react-hls-player';
import Header from './Header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function Player() {
    const { slug } = useParams();
    let [video, setVideo] = useState()
    useEffect(() => {
        (async () => {
            let res = await axios.get(`https://ophim1.com/phim/${slug}`)
            setVideo(res.data)
        })()
    }, [])

    return (
        <>
            <Header />
            {video != undefined ? (
                <ReactHlsPlayer
                    style={{ height: '500px' }}
                    src={video?.episodes[0]?.server_data[0]?.link_m3u8}
                    autoPlay={true}
                    controls={true}
                    width="100%"
                />
            ) : ''}

        </>

    )
}

export default Player
