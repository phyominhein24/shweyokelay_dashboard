import { InputAdornment, TextField } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import React, { useState } from 'react'

export const TableSearch = ({ paginateParams, onSearchChange }) => {

    const [typingTimeout, setTypingTimeout] = useState(null);
    const [value, setValue] = useState(paginateParams.search)

    const searchChange = (e) => {
        setValue(e.target.value)

        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        const timeout = setTimeout(() => {
            onSearchChange(e.target.value);
        }, 2000);

        setTypingTimeout(timeout);
    }
    return (
        <div style={{ paddingTop: "9px" }}>
            <TextField
                size='small'
                id="input-with-icon-textfield"
                label="Search Data"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                value={value}
                variant="outlined"
                onChange={(e) => searchChange(e)}
            />
        </div>
    )
}
