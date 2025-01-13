import { Grid, InputLabel, OutlinedInput, Stack, Paper, Select, MenuItem } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { counterService } from "../counterService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { counterPayload } from "../counterPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';

export const CounterUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(counterPayload.update);
  const { counter } = useSelector(state => state.counter);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitCounter = async () => {
    setLoading(true);
    const formData = formBuilder(payload, counterPayload.update);
    const response = await counterService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.counter);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await counterService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (counter) {
      const updatePayload = { ...counter }    
      setPayload(updatePayload);
    }
  }, [counter])  

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
                          placeholder="Enter Counter Name"
                      />
                      <ValidationMessage field={"name"} />
                  </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                      <InputLabel >
                          Phone (required)
                      </InputLabel>
                      <OutlinedInput
                          type="number"
                          value={payload.phone ? payload.phone : ""}
                          onChange={(e) =>
                              payloadHandler(
                                  payload,
                                  e.target.value,
                                  "phone",
                                  (updateValue) => {
                                      setPayload(updateValue);
                                  }
                              )
                          }
                          name="phone"
                          placeholder="Enter Counter Phone"
                      />
                      <ValidationMessage field={"phone"} />
                  </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                      <InputLabel >
                          City (required)
                      </InputLabel>
                      <OutlinedInput
                          type="text"
                          value={payload.city ? payload.city : ""}
                          onChange={(e) =>
                              payloadHandler(
                                  payload,
                                  e.target.value,
                                  "city",
                                  (updateValue) => {
                                      setPayload(updateValue);
                                  }
                              )
                          }
                          name="city"
                          placeholder="Enter Counter City"
                      />
                      <ValidationMessage field={"city"} />
                  </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                  <Stack spacing={1}>
                      <InputLabel >
                          Terminal (required)
                      </InputLabel>
                      <OutlinedInput
                          type="text"
                          value={payload.terminal ? payload.terminal : ""}
                          onChange={(e) =>
                              payloadHandler(
                                  payload,
                                  e.target.value,
                                  "terminal",
                                  (updateValue) => {
                                      setPayload(updateValue);
                                  }
                              )
                          }
                          name="terminal"
                          placeholder="Enter Counter Terminal"
                      />
                      <ValidationMessage field={"terminal"} />
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

              <FormMainAction
                  cancel="Cancle"
                  cancelClick={() => navigate(paths.counter)}
                  submit="Update"
                  submitClick={submitCounter}
                  loading={loading}
              />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
