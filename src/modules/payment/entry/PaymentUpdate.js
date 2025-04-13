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
import { paymentPayload } from "../paymentPayload";
import { paymentService } from "../paymentService";
import { Profile } from "../../../shares/Profile";

export const PaymentUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(paymentPayload.update);
  const { payment } = useSelector((state) => state.payment);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadingData = useCallback(async () => {
    setLoading(true);
    await paymentService.show(dispatch, params.id);

    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  const submitPayment = async () => {
    setLoading(true);
    try {
      const formData = formBuilder(payload, paymentPayload.update);
      const response = await paymentService.update(
        dispatch,
        params.id,
        formData
      );
      if (response.status === 200) {
        navigate(paths.payment);
      }
    } catch (error) {
      console.error("Error occurred while submitting:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (payment) {
      const updatePayload = { ...payment };

      if (typeof payment.facilities === "string") {
        try {
          updatePayload.facilities = JSON.parse(payment.facilities);
        } catch (error) {
          console.error("Failed to parse facilities:", error);
          updatePayload.facilities = [];
        }
      }

      setPayload(updatePayload);
    }
  }, [payment]);

  useEffect(() => {
    if (payment) {
      const updatePayload = { ...payment }
      setPayload(updatePayload);
    }
  }, [payment])

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
                  value={payload.name ? payload.name : ""}
                  placeholder="Enter Payment Name"
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
                  value={payload.acc_name ? payload.acc_name : ""}
                  placeholder="Enter Payment Acc Name"
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
                  value={payload.acc_number ? payload.acc_number : ""}
                  placeholder="Enter Payment Acc Number"
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
              cancelClick={() => navigate(paths.payment)}
              submit="Update"
              submitClick={submitPayment}
              loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
