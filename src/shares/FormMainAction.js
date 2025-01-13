import React from "react";
import {
  Button,
  Grid,
  Stack,
} from '@mui/material';

const FormMainAction = ({ cancel, cancelClick, submit, submitClick, loading }) => {
  return (
      <Grid item xs={12} md={12}>
        <Stack 
          justifyContent="flex-end" 
          alignItems="center" 
          spacing={1} 
          direction="row" 
          useFlexGap 
          flexWrap="wrap"
        >
          <Button disabled={loading} onClick={cancelClick} size="large" type="submit" variant="outlined">
            {cancel}
          </Button>
          <Button disabled={loading} onClick={submitClick} size="large" type="submit" variant="contained" color="primary">
            {submit}
          </Button>
        </Stack>
      </Grid>
  );
};

export default FormMainAction;
