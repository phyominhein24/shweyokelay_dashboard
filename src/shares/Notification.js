import { Alert, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from './shareSlice';


export const Notification = () => {

    const dispatch = useDispatch();
    const state = useSelector(state => state.share);
    const { notification } = state;
  
    const handleRemoveNotification = (id) => {
      dispatch(removeNotification(id));
    };

    useEffect(()=>{
        const timeoutId = setTimeout(() => {
            notification.map((noti)=>{
                dispatch(removeNotification(noti.id));
            })
        }, 1000);
    },[notification])

  return (
    <>
    {notification.map((noti,index) => (
        <Alert
          key={index}
          variant="filled"
          severity={noti.variant}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => handleRemoveNotification(noti.id)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {noti.message}
        </Alert>
        ))}
    </>
  )
}