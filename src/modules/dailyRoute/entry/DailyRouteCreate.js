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

import { Breadcrumb } from "../../../shares/Breadcrumbs";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from "../../../shares/ValidationMessage";
import { endpoints } from "../../../constants/endpoints";
import { formBuilder } from "../../../helpers/formBuilder";
import { getRequest } from "../../../helpers/api";
import { paths } from "../../../constants/paths";
import { payloadHandler } from "../../../helpers/handler";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { dailyRoutePayload } from "../dailyRoutePayload";
import { dailyRouteService } from "../dailyRouteService";
import { ProfileImage } from "../../../shares/ProfileImage";
import { Profile } from "../../../shares/Profile";

export const DailyRouteCreate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(dailyRoutePayload.store);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitGenre = async () => {
    setLoading(true);
    if (payload.facilities && Array.isArray(payload.facilities)) {
      payload.facilities = JSON.stringify(payload.facilities);
    }
    try {
      const create = await dailyRouteService.store(payload, dispatch);

      if (create.status === 200) {
        navigate(paths.dailyRoute);
      }
    } catch (error) {
      console.error("Error occurred while submitting:", error);
    } finally {
      setLoading(false);
    }
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
                  placeholder="Enter DailyRoute Name"
                />
                <ValidationMessage field={"name"} />
              </Stack>
            </Grid>
  
            <Grid item xs={12} md={4}>
                <Stack spacing={1} >
                  <InputLabel>Photo (required)</InputLabel>
                  <Profile
                    preview={payload.photo ? payload.photo : null}
                    onSelect={(e) => payloadHandler(payload, e, 'photo', (updateValue) => {
                        setPayload(updateValue);
                    })}
                  />
                  <ValidationMessage field={"photo"} />
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel>Acc Name (required)</InputLabel>
                <OutlinedInput
                  type="text"
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "acc_name",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="acc_name"
                  placeholder="Enter DailyRoute Acc Name"
                />
                <ValidationMessage field={"acc_name"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel>Acc Number (required)</InputLabel>
                <OutlinedInput
                  type="number"
                  onChange={(e) =>
                    payloadHandler(
                      payload,
                      e.target.value,
                      "acc_number",
                      (updateValue) => {
                        setPayload(updateValue);
                      }
                    )
                  }
                  name="acc_number"
                  placeholder="Enter DailyRoute Acc Number"
                />
                <ValidationMessage field={"acc_number"} />
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Stack spacing={1} >
                <InputLabel>Acc Qr (required)</InputLabel>
                <ProfileImage
                  preview={payload.acc_qr ? payload.acc_qr : null}
                  onSelect={(e) => payloadHandler(payload, e, 'acc_qr', (updateValue) => {
                      setPayload(updateValue);
                  })}
                />
                <ValidationMessage field={"acc_qr"} />
              </Stack>
            </Grid>

            <FormMainAction
              cancel="Cancle"
              cancelClick={() => navigate(paths.dailyRoute)}
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
