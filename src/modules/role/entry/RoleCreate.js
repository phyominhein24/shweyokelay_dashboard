import { Grid, InputLabel, OutlinedInput, Stack, Paper, Switch, Box, styled } from "@mui/material";
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { roleService } from "../roleService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import { rolePayload } from "../rolePayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";

export const RoleCreate = () => {
    
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(rolePayload.store);

    const [permission, setPermission] = useState([])
    const [roles, setRoles] = useState([])

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const Item = styled(Paper)(() => ({
        textAlign: 'center',
        height: 60,
        width: 260,
        lineHeight: '60px',
      }));

    const permissionHandle = async (e, id) => {
        setRoles(roles =>
          e.target.checked
            ? [...roles, id]
            : roles.filter(roleId => roleId !== id)
        );        
      }

    const submitGenre = async () => {
        setLoading(true);        
        const create = await roleService.store(payload, dispatch);
        if(create.status == 200){
            const response = await roleService.update(dispatch, create?.data.id, payload);
            if(response.status === 200){
                navigate(paths.role);
            }
        }
        setLoading(false);
    };

    const loadingData = useCallback(async () => {
        setLoading(true);
        const permissionResult = await roleService.permission(dispatch);
        if (permissionResult.status === 200) {                    
          setPermission(permissionResult.data);
        }
        setLoading(false);
    }, []);
    
    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        payloadHandler(payload, roles, "permissions", (updateValue) => {
            setPayload(updateValue);
        });
    },[roles])
    return (
        <>
            <div className=" grid">
                <div className="col-12">
                    <Breadcrumb />
                </div>

                <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Name (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "name",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="name"
                                    placeholder="Enter Role Name"
                                />
                                <ValidationMessage field={"name"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Description (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "description",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="description"
                                    placeholder="Enter Role Description"
                                />
                                <ValidationMessage field={"description"} />
                            </Stack>
                        </Grid>                        

                        <FormMainAction
                            cancel="Cancle"
                            cancelClick={() => navigate(paths.role)}
                            submit="Create"
                            submitClick={submitGenre}
                            loading={loading}
                        />
                    </Grid>

                    <Grid container spacing={2}>
                        <Grid item xs={4}>
                            <Item
                                elevation={2}
                                sx={{
                                paddingLeft: '10px',
                                marginBottom: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                }}
                                >
                                All
                                <Switch
                                    onChange={(e) => {
                                        setRoles(e.target.checked ? permission?.map(item => item.id) : []);                                     
                                    }}
                                    checked={roles.length == permission.length}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Item>
                        <Box
                            sx={{                    
                            borderRadius: 2,
                            bgcolor: 'background.default',
                            display: 'grid',
                            gridTemplateColumns: {sm: '1fr 1fr', md: '1fr 1fr 1fr', lg: '1fr 1fr 1fr 1fr', xl: '1fr 1fr 1fr 1fr 1fr' },
                            gap: 2,
                            }}
                        >
                            {permission?.map((p) => (
                            <Item key={p.id} 
                                elevation={2}
                                sx={{
                                paddingLeft: '10px',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                }}
                                >
                                {p.name}
                                <Switch
                                    onChange={(e) => {
                                        permissionHandle(e, p.id);                                        
                                    }}
                                    checked={roles?.some(r => r === p.id)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                            </Item>
                            ))}
                        </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        </>
    );
};
