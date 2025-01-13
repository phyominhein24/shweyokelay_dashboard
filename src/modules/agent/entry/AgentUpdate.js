import { Grid, InputLabel, OutlinedInput, Stack, Paper, Select, MenuItem } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { agentService } from "../agentService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { agentPayload } from "../agentPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';

export const AgentUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(agentPayload.update);
  const { agent } = useSelector(state => state.agent);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitAgent = async () => {
    setLoading(true);
    const formData = formBuilder(payload, agentPayload.update);
    const response = await agentService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.agent);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await agentService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (agent) {
      const updatePayload = { ...agent }
      updatePayload.file_path = null;
      setPayload(updatePayload);
    }
  }, [agent])

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
                        placeholder="Enter Agent Name"
                    />
                    <ValidationMessage field={"name"} />
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                    <InputLabel >
                        Phone 
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
                        placeholder="Enter Agent Phone"
                    />
                    <ValidationMessage field={"phone"} />
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                    <InputLabel >
                        Email (required)
                    </InputLabel>
                    <OutlinedInput
                        type="email"
                        value={payload.email ? payload.email : ""}
                        onChange={(e) =>
                            payloadHandler(
                                payload,
                                e.target.value,
                                "email",
                                (updateValue) => {
                                    setPayload(updateValue);
                                }
                            )
                        }
                        name="email"
                        placeholder="Enter Agent Email"
                    />
                    <ValidationMessage field={"email"} />
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                    <InputLabel >
                      Commission (required)
                    </InputLabel>
                    <OutlinedInput
                        type="text"
                        value={payload.commission ? payload.commission : ""}
                        onChange={(e) =>
                            payloadHandler(
                                payload,
                                e.target.value,
                                "commission",
                                (updateValue) => {
                                    setPayload(updateValue);
                                }
                            )
                        }
                        name="commission"
                        placeholder="Enter Agent Commission"
                    />
                    <ValidationMessage field={"commission"} />
                </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
                <Stack spacing={1}>
                    <InputLabel >
                        Password (required)
                    </InputLabel>
                    <OutlinedInput
                        type="password"
                        value={payload.password ? payload.password : ""}
                        onChange={(e) =>
                            payloadHandler(
                                payload,
                                e.target.value,
                                "password",
                                (updateValue) => {
                                    setPayload(updateValue);
                                }
                            )
                        }
                        name="password"
                        placeholder="Enter Agent Password"
                    />
                    <ValidationMessage field={"password"} />
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
                cancelClick={() => navigate(paths.agent)}
                submit="Create"
                submitClick={submitAgent}
                loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
