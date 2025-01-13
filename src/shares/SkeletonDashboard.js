import { Grid, Paper, Skeleton } from '@mui/material'
import React from 'react'

function SkeletonDashboard() {
  const data = [1,2,3,4]
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px", paddingLeft: "20px", paddingBottom: "20px" }}>
       
        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100px', marginBottom: '21px' }} />
        
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Skeleton variant="rect" width={210} height={100} />
            </Grid>
          ))}
        </Grid>

        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100px', marginBottom: '21px', marginTop: '60px' }} />
        
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Skeleton variant="rect" width={210} height={100} />
            </Grid>
          ))}
        </Grid>

        <Skeleton variant="text" sx={{ fontSize: '2rem', width: '100px', marginBottom: '21px', marginTop: '60px' }} />
        
        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Skeleton variant="rect" width={210} height={100} />
            </Grid>
          ))}
        </Grid>
        
    </Paper>
  )
}

export default SkeletonDashboard
