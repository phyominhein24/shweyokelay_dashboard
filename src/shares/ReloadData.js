import React, { useState } from 'react'
import CachedIcon from '@mui/icons-material/Cached';
import { IconButton } from '@mui/material';

function ReloadData({ reloadData }) {

    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true)
        setTimeout(()=>{
            reloadData()
            setLoading(false)
        },500)
    }

  return (
    <div style={{ paddingTop: '9px' }}>
        <IconButton onClick={handleClick} sx={{ border: '1px solid #1876D2', width: 30, height: 30, borderRadius: 2, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CachedIcon sx={{ color: '#1876D2', animation: loading ? 'rotate 1s linear infinite' : 'none' }}/>
        </IconButton>
    </div>
  )
}

export default ReloadData