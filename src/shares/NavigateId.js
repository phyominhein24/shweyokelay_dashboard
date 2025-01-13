import { useNavigate } from "react-router-dom";
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch } from "react-redux";
import { alertToggle, setSelectedId } from "./shareSlice";

export const NavigateId = ({ url, id }) => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(setSelectedId(id))
    dispatch(alertToggle())
  }

  return (
    <>
      <IconButton sx={{ cursor: 'pointer', marginRight: 1 }} onClick={() => navigate(url)}>
        <EditIcon style={{ color: '#1876D2' }} />
      </IconButton>

      <IconButton sx={{ cursor: 'pointer' }} onClick={handleDelete}>
        <DeleteIcon style={{ color: 'red' }}/>
      </IconButton>

    </>
  );
};
