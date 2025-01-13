import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'

export const FilterByForign = ({status, onFilter, paginateParams}) => {

    const [value, setValue] = useState(paginateParams.value)

    return (
        <div style={{ paddingTop: "9px" }}>
            <FormControl
                sx={{
                    width: '130px',
                }}
                size='small'
            >
                <InputLabel id="demo-simple-select-label">Filter</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value =="" ? 'ALL' : value}
                    label="Filter"
                    onChange={onFilter}
                >
                    {
                        status.current.map((status) => {
                            return <MenuItem key={status} value={status.id}>{status.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </div>
    )
}
