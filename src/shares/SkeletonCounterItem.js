import { Grid, Skeleton } from '@mui/material'
import React from 'react'

function SkeletonCounterItem() {
    const data = [1,2,3,4,5,6,7,8,9]
  return (
    <Grid container spacing={2} sx={{ marginLeft: '1px' }}>
        {data.map((item, index) => (
            <Grid item xs={4} key={index}>
                <Skeleton variant="rect" width={140} height={160} />
            </Grid>
        ))}
    </Grid>   
  )
}

export default SkeletonCounterItem
