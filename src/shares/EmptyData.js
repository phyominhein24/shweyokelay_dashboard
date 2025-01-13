import React from 'react';
import ErrorIcon from '@mui/icons-material/Error';
import { Grid, Typography } from '@mui/material';

function EmptyData() {
  return (
    <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", marginX: "auto" }}
    >
        <ErrorIcon sx={{ fontSize: 70 }} />
        <Typography variant='h5'>No Data!</Typography>
    </Grid>
  )
}

export default EmptyData;