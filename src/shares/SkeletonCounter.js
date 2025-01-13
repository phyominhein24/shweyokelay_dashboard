import { Grid, Paper, Skeleton } from '@mui/material'
import React from 'react'

function SkeletonCounter() {
  const data = [1,2,3,4,5,6,7,8]
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "40px", paddingLeft: "20px", paddingBottom: "20px" }}>                            

        <Grid container spacing={2}>
          {data.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Skeleton variant="rect" width={180} height={150} />
            </Grid>
          ))}
        </Grid>       
        
    </Paper>
  )
}

export default SkeletonCounter
