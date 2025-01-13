import { Grid, InputLabel, OutlinedInput, Stack, Paper, Select, MenuItem } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { memberService } from "../memberService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { memberPayload } from "../memberPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';

export const MemberUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(memberPayload.update);
  const { member } = useSelector(state => state.member);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitMember = async () => {
    setLoading(true);
    const formData = formBuilder(payload, memberPayload.update);
    const response = await memberService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.member);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await memberService.show(dispatch, params.id);
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (member) {
      const updatePayload = { ...member }
      updatePayload.file_path = null;
      setPayload(updatePayload);
    }
  }, [member])

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
                        placeholder="Enter User Name"
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
                        placeholder="Enter User Phone"
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
                        placeholder="Enter User Email"
                    />
                    <ValidationMessage field={"email"} />
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
                        placeholder="Enter User Password"
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
                cancelClick={() => navigate(paths.member)}
                submit="Create"
                submitClick={submitMember}
                loading={loading}
            />
          </Grid>
        </Paper>
      </div>
    </>
  );
};
