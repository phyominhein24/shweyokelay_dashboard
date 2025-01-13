import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useDispatch, useSelector } from 'react-redux';
import { alertToggle } from './shareSlice';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialog({ title, body, onAgree }) {
  
  const { showAlert } = useSelector(state => state.share)

  const dispatch = useDispatch();

  const alertToggleClick = () => {
    dispatch(alertToggle())
  }
 
  return (
    <div>
      <Dialog
        open={showAlert}
        TransitionComponent={Transition}
        keepMounted
        onClose={alertToggleClick}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {body}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={alertToggleClick}>Disagree</Button>
          <Button onClick={onAgree}>Agree</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}