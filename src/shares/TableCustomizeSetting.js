

import React, { useEffect, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Close } from '@mui/icons-material';
import { Box, Button, IconButton, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from '@mui/material';
import { MenuProps, Transition } from '../constants/config';
import FormControlLabel from '@mui/material/FormControlLabel';
import Menu from '@mui/material/Menu';
import { getData, setData } from '../helpers/localstorage';

export const TableCustomizeSetting = ({payload, columns, setColumns}) => {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClickOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChange = (id, e) => {
        if(e.target.checked == false){
            setColumns(columns => columns.filter(item => item.id !== id))
        }
        if(e.target.checked == true){
            let checkedColumns = [...columns, payload.find(item => item.id === id)]
            setColumns(payload.filter(item => checkedColumns.some(item2 => item2.id === item.id)))
        }
    };

    const handleChange1 = () => {
        setColumns(payload)
    }

    return (
        <>
            <IconButton
                id="basic-button"
                size='small'
                onClick={handleClickOpen}
                sx={{ paddingTop: 2 }}
            >
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button'
                }}

                
                // transformOrigin={{ horizontal: 'left', vertical: 'top' }}
                // anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
                <div>
                    <FormControlLabel
                        label="All"
                        control={
                        <Checkbox
                            checked={payload.length == columns.length}
                            // indeterminate={false}
                            onChange={handleChange1}
                        />
                        }
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
                        {payload.map((column) => (
                            <FormControlLabel
                                key={column.id}
                                label={column.label}
                                control={<Checkbox checked={columns.some(item => item.id === column.id)} onChange={(e)=>handleChange(column.id, e)} />}
                            />
                        ))}
                    </Box>
                </div>
            </Menu>
        </>

    )
}
