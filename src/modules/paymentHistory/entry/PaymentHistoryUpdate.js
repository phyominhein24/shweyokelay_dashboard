import { Grid, InputLabel, OutlinedInput, Stack, Paper, MenuItem, Select } from '@mui/material';
import { paths } from "../../../constants/paths";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { paymentHistoryService } from "../paymentHistoryService";
import { payloadHandler } from "../../../helpers/handler";
import { Breadcrumb } from '../../../shares/Breadcrumbs'
import { paymentHistoryPayload } from "../paymentHistoryPayload";
import { formBuilder } from "../../../helpers/formBuilder";
import FormMainAction from "../../../shares/FormMainAction";
import { ValidationMessage } from '../../../shares/ValidationMessage';
import { getRequest } from '../../../helpers/api';
import { endpoints } from '../../../constants/endpoints';

export const PaymentHistoryUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [payload, setPayload] = useState(paymentHistoryPayload.update);
  const [cashiers, setCashiers] = useState([]);
  const [shops, setShops] = useState([]);
  const { paymentHistory } = useSelector(state => state.paymentHistory);
  const params = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const submitPaymentHistory = async () => {
    setLoading(true);
    const formData = formBuilder(payload, paymentHistoryPayload.update);
    const response = await paymentHistoryService.update(dispatch, params.id, formData);
    if(response.status === 200){
      navigate(paths.paymentHistory);
    }
    setLoading(false);
  }

  const loadingData = useCallback(async () => {
    setLoading(true);
    await paymentHistoryService.show(dispatch, params.id);

    const cashierResult = await getRequest(`${endpoints.cashier}`);
    if (cashierResult.status === 200) {
        setCashiers(cashierResult.data);
    }
    const shopResult = await getRequest(`${endpoints.shop}`);
    if (shopResult.status === 200) {
        setShops(shopResult.data);
    }
    setLoading(false);
  }, [dispatch, params.id]);

  useEffect(() => {
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    if (paymentHistory) {
      const updatePayload = { ...paymentHistory }
      setPayload(updatePayload);
    }
  }, [paymentHistory])

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
                            placeholder="Enter PaymentHistory Name"
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
                            value={payload.description ? payload.description : ""}
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
                            placeholder="Enter PaymentHistory Description"
                        />
                        <ValidationMessage field={"description"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel >
                            Amount For 30min (required)
                        </InputLabel>
                        <OutlinedInput
                            type="number"
                            value={payload.amount ? payload.amount : ""}
                            onChange={(e) =>
                                payloadHandler(
                                    payload,
                                    e.target.value,
                                    "amount",
                                    (updateValue) => {
                                        setPayload(updateValue);
                                    }
                                )
                            }
                            name="amount"
                            placeholder="Enter PaymentHistory Amount"
                        />
                        <ValidationMessage field={"amount"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel > Shop (required) </InputLabel>
                        <Select
                            value={payload.shop_id ? payload.shop_id : ""}
                            onChange={(e) =>
                                payloadHandler(
                                payload,
                                e.target.value,
                                "shop_id",
                                (updateValue) => {
                                    setPayload(updateValue);
                                }
                                )}
                            name="shop_id"
                            >
                            { shops.map((value, index) => {
                                if(!value.is_warehouse){
                                    return (
                                    <MenuItem key={`shop_id${index}`} value={value.id}> {value.name} </MenuItem>
                                    )
                                }
                            })}
                        </Select>
                        <ValidationMessage field={"shop_id"} />
                    </Stack>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Stack spacing={1}>
                        <InputLabel > Cashier (required) </InputLabel>
                        <Select
                            value={payload.cashier_id ? payload.cashier_id : ""}
                            onChange={(e) =>
                                payloadHandler(
                                payload,
                                e.target.value,
                                "cashier_id",
                                (updateValue) => {
                                    setPayload(updateValue);
                                }
                                )}
                            name="cashier_id"
                            >
                            { cashiers.map((value, index) => {
                                return (
                                <MenuItem key={`cashier_id${index}`} value={value.id}> {value.name} </MenuItem>
                                )
                            })}
                        </Select>
                        <ValidationMessage field={"cashier_id"} />
                    </Stack>
                </Grid>

                

                <FormMainAction
                    cancel="Cancle"
                    cancelClick={() => navigate(paths.paymentHistory)}
                    submit="Update"
                    submitClick={submitPaymentHistory}
                    loading={loading}
                />
            </Grid>
        </Paper>
      </div>
    </>
  );
};
