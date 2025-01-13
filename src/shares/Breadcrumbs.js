import { Typography, Grid } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Notification } from './Notification';


export const Breadcrumb = () => {

    const { breadcrumbs } = useLoaderData();
    const navigate = useNavigate();

    return (
        <>

            <Breadcrumbs aria-label="breadcrumb">
                {
                    breadcrumbs && breadcrumbs.map((crumbs, index) => {
                        return (

                            <div key={index}>
                                {
                                    crumbs.label !== null && (
                                        <Link
                                            component="button"
                                            underline="hover"
                                            color="inherit"
                                            onClick={(e) => {
                                                e.preventDefault()
                                                navigate(crumbs.url)
                                            }}
                                        >
                                            {crumbs.label}
                                        </Link>
                                    )
                                }
                                {crumbs?.current && (
                                    <Typography color="text.primary">{crumbs.current}</Typography>
                                )}
                            </div>

                        )
                    })
                }
            </Breadcrumbs>
            <Grid item xs={6} sx={{position: 'absolute',top: '66px',right: '10px',zIndex: 100}}>
              <Notification />
            </Grid>
        </>
    )

}