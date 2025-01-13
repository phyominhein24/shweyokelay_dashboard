import { Grid, InputLabel, OutlinedInput, Stack, Paper, Select, MenuItem, Switch, Box, Chip } from "@mui/material";
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sroutesService } from "../sroutesService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import { sroutesPayload } from "../sroutesPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { endpoints } from "../../../constants/endpoints";
import { getRequest } from "../../../helpers/api";

export const SroutesCreate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(sroutesPayload.store);
    const [vehiclesType, setVehiclesType] = useState([])
    const [counter, setCounter] = useState([])
    const [startingPointOptions, setStartingPointOptions] = useState([])
    const [endingPointOptions, setEndingPointOptions] = useState([])
    const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const [selectedDays, setSelectedDays] = useState(payload.day_off || []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleDay = (day) => {
        if (selectedDays.includes(day)) {
            const newDay = selectedDays.filter((d) => d !== day);
            setSelectedDays(newDay);
            payloadHandler(
                payload,
                newDay,
                "day_off",
                (updatedValue) => setPayload(updatedValue)
            );
        } else {
            const newDay = [...selectedDays, day.trim()];
            setSelectedDays(newDay);
            payloadHandler(
                payload,
                newDay,
                "day_off",
                (updatedValue) => setPayload(updatedValue)
            );
        }
    };

    const submitGenre = async () => {
        setLoading(true);
        if (payload.day_off && Array.isArray(payload.day_off)) {
            payload.day_off = JSON.stringify(payload.day_off);
        }
        try {
            const create = await sroutesService.store(payload, dispatch);
    
            if (create.status === 200) {
                navigate(paths.sroutes);
            }
        } catch (error) {
            console.error("Error occurred while submitting:", error);
        } finally {
            setLoading(false);
        }
    };

    const loadingData = useCallback(async () => {
        setLoading(true);
        const vehiclesTypeResult = await getRequest(`${endpoints.vehiclesType}`);
        if (vehiclesTypeResult.status === 200) {
            setVehiclesType(vehiclesTypeResult.data);
        }
        const counterResult = await getRequest(`${endpoints.counter}`);
        if (counterResult.status === 200) {
            setCounter(counterResult.data);
            setStartingPointOptions(counterResult.data)
            setEndingPointOptions(counterResult.data)
        }
        setLoading(false);
    }, []);
    
    useEffect(() => {
        loadingData();
    }, [loadingData]);

    useEffect(() => {
        setStartingPointOptions(counter.filter((point) => point.id !== payload.ending_point))
    },[payload.ending_point])

    useEffect(() => {
        setEndingPointOptions(counter.filter((point) => point.id !== payload.starting_point))
    },[payload.starting_point])

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
                                    placeholder="Enter Sroutes Name"
                                />
                                <ValidationMessage field={"name"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel > Choose Vehicles Type (required) </InputLabel>
                                <Select
                                id="vehicles_type_id"
                                value={payload.vehicles_type_id}
                                onChange={(e) =>
                                    payloadHandler(
                                    payload,
                                    e.target.value,
                                    "vehicles_type_id",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                    )}
                                name="vehicles_type_id"
                                >
                                { vehiclesType.map((value, index) => {
                                    return (
                                    <MenuItem key={`vehicles_type_id${index}`} value={value.id}> {value.name} </MenuItem>
                                    )
                                })}
                                </Select>
                                <ValidationMessage field={"vehicles_type_id"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel > Choose Starting Point (required) </InputLabel>
                                <Select
                                id="starting_point"
                                value={payload.starting_point}
                                onChange={(e) =>
                                    payloadHandler(
                                    payload,
                                    e.target.value,
                                    "starting_point",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                    )}
                                name="starting_point"
                                >
                                { startingPointOptions.map((value, index) => {
                                    return (
                                    <MenuItem key={`starting_point${index}`} value={value.id}> {value.name} </MenuItem>
                                    )
                                })}
                                </Select>
                                <ValidationMessage field={"starting_point"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel > Choose Ending Point (required) </InputLabel>
                                <Select
                                id="ending_point"
                                value={payload.ending_point}
                                onChange={(e) =>
                                    payloadHandler(
                                    payload,
                                    e.target.value,
                                    "ending_point",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                    )}
                                name="ending_point"
                                >
                                { endingPointOptions.map((value, index) => {
                                    return (
                                    <MenuItem key={`ending_point${index}`} value={value.id}> {value.name} </MenuItem>
                                    )
                                })}
                                </Select>
                                <ValidationMessage field={"ending_point"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Distance (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "distance",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="distance"
                                    placeholder="Enter Sroutes Distance"
                                />
                                <ValidationMessage field={"distance"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Duration (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "duration",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="duration"
                                    placeholder="Enter Sroutes Duration"
                                />
                                <ValidationMessage field={"duration"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={2}>
                                <InputLabel >
                                    Is AC (required)
                                </InputLabel>
                                <Switch
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.checked ? '1' : '0',
                                            "is_ac",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    
                                    inputProps={{ 'aria-label': 'Toggle Feature' }}
                                />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel> Select Days Off</InputLabel>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "8px",
                                    }}
                                >
                                    {allDays.map((day) => (
                                        <Chip
                                            key={day}
                                            label={day}
                                            clickable
                                            onClick={() => toggleDay(day)}
                                            color={selectedDays.includes(day) ? "primary" : "default"}
                                            sx={{ margin: "4px" }}
                                        />
                                    ))}
                                </Box>
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Price 
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "price",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="price"
                                    placeholder="Ente Sroutes Price"
                                />
                                <ValidationMessage field={"price"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Departure (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "departure",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="departure"
                                    placeholder="Enter Sroutes Departure"
                                />
                                <ValidationMessage field={"departure"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >
                                    Arrivals (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="text"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "arrivals",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="arrivals"
                                    placeholder="Enter Sroutes Arrivals"
                                />
                                <ValidationMessage field={"arrivals"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >Status (required)</InputLabel>
                                <Select
                                    id="status"
                                    onChange={(e) =>
                                    payloadHandler(
                                        payload,
                                        e.target.value,
                                        "status",
                                        (updateValue) => {
                                        setPayload(updateValue);
                                        }
                                    )}
                                    name="status"
                                >
                                    <MenuItem value="ACTIVE">Active</MenuItem>
                                    <MenuItem value="INACTIVE">Inactive</MenuItem>
                                </Select>
                                <ValidationMessage field={"status"} />
                            </Stack>
                        </Grid>


                        <FormMainAction
                            cancel="Cancle"
                            cancelClick={() => navigate(paths.sroutes)}
                            submit="Create"
                            submitClick={submitGenre}
                            loading={loading}
                        />
                    </Grid>
                </Paper>
            </div>
        </>
    );
};
