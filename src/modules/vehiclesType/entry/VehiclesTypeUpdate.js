import {
  Box,
  Chip,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { Breadcrumb } from "../../../shares/Breadcrumbs";
import FormMainAction from "../../../shares/FormMainAction";
import { Profile } from "../../../shares/Profile";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { endpoints } from "../../../constants/endpoints";
import { formBuilder } from "../../../helpers/formBuilder";
import { getRequest } from "../../../helpers/api";
import { paths } from "../../../constants/paths";
import { payloadHandler } from "../../../helpers/handler";
import { vehiclesTypePayload } from "../vehiclesTypePayload";
import { vehiclesTypeService } from "../vehiclesTypeService";

export const VehiclesTypeUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(vehiclesTypePayload.update);
  const [localFacilities, setLocalFacilities] = useState(
    payload.facilities || []
  );
  const { vehiclesType } = useSelector((state) => state.vehiclesType);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitVehiclesType = async () => {
    setLoading(true);
    const updatedPayload = { ...payload, facilities: localFacilities };
    const formData = formBuilder(updatedPayload, vehiclesTypePayload.update);
    const response = await vehiclesTypeService.update(
      dispatch,
      params.id,
      formData
    );
    if (response.status === 200) {
      navigate(paths.vehiclesType);
    }
    setLoading(false);
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    await vehiclesTypeService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (vehiclesType) {
      const updatePayload = { ...vehiclesType };
      setPayload(updatePayload);
    }
  }, [vehiclesType]);

  const addFacility = (value) => {
    const newFacilities = [...localFacilities, value.trim()];
    setLocalFacilities(newFacilities);
    payloadHandler(payload, newFacilities, "facilities", (updatedValue) =>
      setPayload(updatedValue)
    );
  };

  const removeFacility = (index) => {
    const newFacilities = localFacilities.filter((_, i) => i !== index);
    setLocalFacilities(newFacilities);
    payloadHandler(payload, newFacilities, "facilities", (updatedValue) =>
      setPayload(updatedValue)
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
                <InputLabel>Name (required)</InputLabel>
                <OutlinedInput
                  type="text"
                  value={payload.name ? payload.name : ""}
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
                <InputLabel>Seat Layout (required)</InputLabel>
                <Select
                  id="seatLayout"
                  value={payload.seat_layout ? payload.seat_layout : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "seatLayout",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="seatLayout"
                >
                  <MenuItem value="2:1">2:1</MenuItem>
                  <MenuItem value="2:2">2:2</MenuItem>
                  <MenuItem value="2:3">2:3</MenuItem>
                </Select>
                <ValidationMessage field={"seatLayout"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel>Total Seat (required)</InputLabel>
                <OutlinedInput
                  type="number"
                  value={payload.total_seat ? payload.total_seat : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "totalSeat",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="totalSeat"
                  placeholder="Enter VehiclesType Total Seat"
                />
                <ValidationMessage field={"totalSeat"} />
              </Stack>
            </Grid>

            {/* <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel>Facilities (required)</InputLabel>
                <OutlinedInput
                  type="text"
                  value={payload.facilities ? payload.facilities : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "facilities",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="facilities"
                  placeholder="Enter VehiclesType Facilities"
                />
                <ValidationMessage field={"facilities"} />
              </Stack>
            </Grid> */}

            {/* Other input fields */}

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
                    onChange={(e) => {
                      if (
                        e.key === "Enter" &&
                        e.currentTarget.value.trim() !== ""
                      ) {
                        addFacility(e.currentTarget.value.trim());
                        e.currentTarget.value = ""; // Clear input after adding
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
                <InputLabel>Status (required)</InputLabel>
                <Select
                  id="status"
                  value={payload.status ? payload.status : ""}
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "status",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
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
              submit="Update"
              submitClick={submitVehiclesType}
              loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
