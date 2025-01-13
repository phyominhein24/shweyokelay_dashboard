import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select, Box, Chip } from "@mui/material";
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { vehiclesTypeService } from "../vehiclesTypeService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import { vehiclesTypePayload } from "../vehiclesTypePayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { getRequest } from "../../../helpers/api";
import { endpoints } from "../../../constants/endpoints";

export const VehiclesTypeCreate = () => {
    const [loading, setLoading] = useState(false);
    const [payload, setPayload] = useState(vehiclesTypePayload.store);
    const [localFacilities, setLocalFacilities] = useState(payload.facilities || []);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const submitGenre = async () => {
        setLoading(true);
        if (payload.facilities && Array.isArray(payload.facilities)) {
            payload.facilities = JSON.stringify(payload.facilities);
        }
        try {
            const create = await vehiclesTypeService.store(payload, dispatch);
    
            if (create.status === 200) {
                navigate(paths.vehiclesType);
            }
        } catch (error) {
            console.error("Error occurred while submitting:", error);
        } finally {
            setLoading(false);
        }
    };
    

    const addFacility = (value) => {
        const newFacilities = [...localFacilities, value.trim()];
        setLocalFacilities(newFacilities);
        payloadHandler(
            payload,
            newFacilities,
            "facilities",
            (updatedValue) => setPayload(updatedValue)
        );
    };

    const removeFacility = (index) => {
        const newFacilities = localFacilities.filter((_, i) => i !== index);
        setLocalFacilities(newFacilities);
        payloadHandler(
            payload,
            newFacilities,
            "facilities",
            (updatedValue) => setPayload(updatedValue)
        );
    };

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
                                    placeholder="Enter VehiclesType Name"
                                />
                                <ValidationMessage field={"name"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel >Seat Layout (required)</InputLabel>
                                <Select
                                    id="seat_layout"
                                    onChange={(e) =>
                                    payloadHandler(
                                        payload,
                                        e.target.value,
                                        "seat_layout",
                                        (updateValue) => {
                                        setPayload(updateValue);
                                        }
                                    )}
                                    name="seat_layout"
                                >
                                    <MenuItem value="2:1">2:1</MenuItem>
                                    <MenuItem value="2:2">2:2</MenuItem>
                                    {/* <MenuItem value="2:3">2:3</MenuItem> */}
                                </Select>
                                <ValidationMessage field={"seat_layout"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel>
                                    Total Seat (required)
                                </InputLabel>
                                <OutlinedInput
                                    type="number"
                                    onChange={(e) =>
                                        payloadHandler(
                                            payload,
                                            e.target.value,
                                            "total_seat",
                                            (updateValue) => {
                                                setPayload(updateValue);
                                            }
                                        )
                                    }
                                    name="total_seat"
                                    placeholder="Enter VehiclesType Total Seat"
                                />
                                <ValidationMessage field={"total_seat"} />
                            </Stack>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Stack spacing={1}>
                                <InputLabel>Facilities (required)</InputLabel>
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        alignItems: "center",
                                        border: "1px solid #ccc",
                                        borderRadius: "4px",
                                        padding: "4px",
                                    }}
                                >
                                    {localFacilities.map((facility, index) => (
                                        <Chip
                                            key={index}
                                            label={facility}
                                            onDelete={() => removeFacility(index)}
                                            sx={{ margin: "4px" }}
                                        />
                                    ))}
                                    <OutlinedInput
                                        type="text"
                                        onKeyPress={(e) => {
                                            if (e.key === "Enter" && e.target.value.trim() !== "") {
                                                addFacility(e.target.value);
                                                e.target.value = ""; // Clear input after adding
                                            }
                                        }}
                                        placeholder="Add facilities and press Enter"
                                        sx={{ flex: "1", minWidth: "120px" }}
                                    />
                                </Box>
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
                            cancelClick={() => navigate(paths.vehiclesType)}
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
