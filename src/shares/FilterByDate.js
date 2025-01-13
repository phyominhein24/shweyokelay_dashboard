import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import { Grid } from '@mui/material';

dayjs.extend(utc);
dayjs.extend(timezone);

export const FilterByDate = (props) => {

    const { onFilter } = props;

    const { startFilterDate, endFilterDate } = useSelector(
        (state) => state.share
    );

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    useEffect(()=>{
        if(startDate !== null && endDate !== null){
            onFilter({
                startDate: startDate ? startDate : startFilterDate,
                endDate: endDate ? endDate : endFilterDate,
            });
        }
    },[startDate, endDate])

    return (
        <LocalizationProvider
            dateAdapter={AdapterDayjs}>
            <DemoContainer
                components={['DatePicker', 'DatePicker']}>
                <Grid container direction="row" spacing={0} justifyContent="center" sx={{ paddingTop: 1 }}>
                  <Grid item sx={{ marginRight: 0.5 }} xs={4} sm={4} md={4} lg={4}>
                    <DatePicker
                        label="Start Date"
                        value={startFilterDate}
                        timezone='UTC'
                        onChange={(newValue) => setStartDate(newValue)}
                        slotProps={{
                            textField: {
                                size: 'small',
                            },
                        }}
                        inputFormat="yyyy-MM-dd"
                    />
                  </Grid>
                  <Grid item xs={4} sm={4} md={4} lg={4}>
                    <DatePicker
                        label="End Date"
                        value={endFilterDate}
                        timezone='UTC'
                        onChange={(newValue) => setEndDate(newValue)}
                        slotProps={{
                            textField: {
                                size: 'small',
                            },
                        }}
                    />
                  </Grid>
                </Grid>
            </DemoContainer>
        </LocalizationProvider>
    )


}