import { Box } from "@mui/material"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from "../utils/fetchFromAPI";
import { Videos, ChannelCard } from './';

const ChannelDetail = () => {
  const { id } = useParams();
  const [channelDetail, setchannelDetail] = useState(null)
  const [videos, setvideos] = useState(null)

  useEffect(() => {
    // Get channel details
    fetchFromAPI(`channels?part=snippet&id=${id}`).then((data) => {
      setchannelDetail(data?.items[0])
    })
    // Get channel video details
    fetchFromAPI(`search?channelId=${id}&part=snippet&order=date`).then((data) => {
      setvideos(data?.items)
    })
  }, [id])

  return (
    <Box minHeight='95vh'>
      <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} mt="-110px" />
      </Box>
      <Box display='flex' p='2'>
        <Box sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail