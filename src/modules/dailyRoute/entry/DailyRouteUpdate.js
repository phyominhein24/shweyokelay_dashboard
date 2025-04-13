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
import { ProfileImage } from "../../../shares/ProfileImage";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { endpoints } from "../../../constants/endpoints";
import { formBuilder } from "../../../helpers/formBuilder";
import { getRequest } from "../../../helpers/api";
import { paths } from "../../../constants/paths";
import { payloadHandler } from "../../../helpers/handler";
import { dailyRoutePayload } from "../dailyRoutePayload";
import { dailyRouteService } from "../dailyRouteService";
import { Profile } from "../../../shares/Profile";

export const DailyRouteUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(dailyRoutePayload.update);
  const { dailyRoute } = useSelector((state) => state.dailyRoute);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitDailyRoute = async () => {
    setLoading(true);
    try {
      const formData = formBuilder(payload, dailyRoutePayload.update);
      const response = await dailyRouteService.update(
        dispatch,
        params.id,
        formData
      );
      if (response.status === 200) {
        navigate(paths.dailyRoute);
      }
    } catch (error) {
      console.error("Error occurred while submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadingData = useCallback(async () => {
    setLoading(true);
    await dailyRouteService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (dailyRoute) {
      const updatePayload = { ...dailyRoute }
      setPayload(updatePayload);
    }
  }, [dailyRoute])

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
                <InputLabel> Driver Name (required)</InputLabel>
                <OutlinedInput
                  type="text"
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "driver_name",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="driver_name"
                  placeholder="Enter DailyRoute Driver Name"
                  value={payload.driver_name ? payload.driver_name : ""}
                />
                <ValidationMessage field={"driver_name"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel> Car Number (required)</InputLabel>
                <OutlinedInput
                  type="number"
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "car_no",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="car_no"
                  value={payload.car_no ? payload.car_no : ""}
                  placeholder="Enter DailyRoute Car Number"
                />
                <ValidationMessage field={"car_no"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                    <InputLabel >Status (required)</InputLabel>
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
                        )}
                        name="status"
                    >
                        <MenuItem value="ACTIVE">Active</MenuItem>
                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                    </Select>
                    <ValidationMessage field={"status"} />
                </Stack>
            </Grid>

            <h2>{payload.start_date}</h2>


            <FormMainAction
              cancel="Cancle"
              cancelClick={() => navigate(paths.dailyRoute)}
              submit="Update"
              submitClick={submitDailyRoute}
              loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
