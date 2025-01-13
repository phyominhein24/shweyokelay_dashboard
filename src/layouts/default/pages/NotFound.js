import React from "react";
import { Typography, Box, Button } from "@mui/material";


const NotFound = () => {

  return (
    <Box sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
    }}>
      <Typography variant="h4" sx={{marginBottom: 2}}>
        Page Not Found
      </Typography>
      <Typography variant="body1">
        The page you are looking for does not exist.
      </Typography>
      <Button
        onClick={()=>window.history.back()}
        variant="contained"
        color="primary"
        sx={{marginTop: 2}}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default NotFound;