import { Box, Button, Card, CardContent, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../authService';
import { paths } from '../../../constants/paths';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { payloadHandler } from '../../../helpers/handler';
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { updateUser } from '../../../shares/shareSlice';

export const Login = () => {

    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState({
        email: "",
        password: ""
    });

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * Admin Login
     * Payload - [username, password]
     * @returns 
     */
    const submitLogin = async () => {
        setLoading(true);
        const result = await authService.login(payload, dispatch);
        setLoading(false);

        if (result.status === 200) {
            dispatch(updateUser(result?.data?.original?.user))
            if(result?.data?.user?.shop_id == 1 ){
                navigate(paths.dashboard);
            }else{
                navigate(paths.counter);
            }
        }
    }

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
        >
            <Card
                sx={{
                    width: { xs: '350px', sm: '350px', md: '300px' },
                }}
            >

                <CardContent>
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Typography>
                            Shwe Yoke Lay
                        </Typography>
                    </Box>

                    <FormControl sx={{ width: '100%', marginTop : '10px' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-email">Email</InputLabel>
                        <FilledInput
                            id="filled-adornment-email"
                            type={'text'}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'email', (updateValue) => {
                                setPayload(updateValue);
                            })}
                        />
                        <ValidationMessage field={"email"} />
                    </FormControl>

                    <FormControl sx={{ width: '100%', marginTop : '10px' }} variant="filled">
                        <InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
                        <FilledInput
                            id="filled-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={(e) => payloadHandler(payload, e.target.value, 'password', (updateValue) => {
                                setPayload(updateValue);
                            })}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <ValidationMessage field={"password"} />
                    </FormControl>

                    <Box
                        display="flex"
                        justifyContent="end"
                        alignItems="center"
                        sx={{
                            marginTop: '10px'
                        }}
                    >
                        <Button
                            variant="contained"
                            onClick={()=>submitLogin()}
                        >Login</Button>
                    </Box>
                </CardContent>

            </Card>

        </Box>
    )
}
