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
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


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

            <Grid item xs={12} md={4}>
              <Stack spacing={1}>
                <InputLabel>Departure Date & Time</InputLabel>
                <OutlinedInput
                  disabled
                  value={
                    payload?.start_date
                      ? `${payload.start_date} ${
                          payload?.route?.departure
                            ? (() => {
                                const [h, m] = payload.route.departure.trim().split(":").map(Number);
                                const suffix = h >= 12 ? "PM" : "AM";
                                const hour = h % 12 || 12;
                                return `${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
                              })()
                            : ""
                        }`
                      : ""
                  }
                />
              </Stack>
            </Grid>

            <Grid item xs={12}>
              <button
                onClick={async () => {
                  const input = document.getElementById("seat-layout-pdf");
                  const canvas = await html2canvas(input);
                  const imgData = canvas.toDataURL("image/png");
                  const pdf = new jsPDF("p", "mm", "a4");

                  pdf.setFontSize(14);
                  pdf.text(`Car No: ${payload.car_no || "-"}`, 10, 10);
                  pdf.text(`Driver Name: ${payload.driver_name || "-"}`, 10, 20);
                  const time = payload?.route?.departure
                    ? (() => {
                        const [h, m] = payload.route.departure.trim().split(":").map(Number);
                        const suffix = h >= 12 ? "PM" : "AM";
                        const hour = h % 12 || 12;
                        return `${payload.start_date} ${hour}:${m.toString().padStart(2, "0")} ${suffix}`;
                      })()
                    : payload.start_date;
                  pdf.text(`Departure: ${time || "-"}`, 10, 30);

                  // Add layout
                  pdf.addImage(imgData, "PNG", 10, 40, 190, 0);
                  pdf.save("vehicle-seat-layout.pdf");
                }}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#1976d2",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  marginBottom: "10px"
                }}
              >
                Download Seat Layout PDF
              </button>
            </Grid>

            <Grid item xs={12}>
              <InputLabel>Vehicle Seat Layout</InputLabel>
              <Box id="seat-layout-pdf" sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
                {(() => {
                  const seatLayout = payload?.route?.vehicles_type?.seat_layout || "2:1";
                  const totalSeats = payload?.route?.vehicles_type?.total_seat || 0;
                  const seatMap = new Map();

                  payload?.payment_histories?.forEach((history) => {
                    const seatList = JSON.parse(history.seat || "[]");
                    seatList.forEach(({ number, type }) => {
                      seatMap.set(number, {
                        type,
                        name: history.name,
                        phone: history.phone,
                        nrc: history.nrc,
                        note: history.note,
                      });
                    });
                  });

                  const layout = seatLayout.split(":").map(Number);
                  const rowSize = layout.reduce((a, b) => a + b, 0);
                  const rows = Math.ceil(totalSeats / rowSize);

                  const seatCells = [];

                  let seatNo = 1;
                  for (let r = 0; r < rows; r++) {
                    const row = [];
           
                    for (let i = 0; i < layout[0]; i++) {
                      if (seatNo > totalSeats) break;
                      const seatInfo = seatMap.get(seatNo);
                      row.push(
                        <Box
                          key={`seat-${seatNo}`}
                          sx={{
                            width: 220,
                            height: 190,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            p: 1,
                            textAlign: 'center',
                            bgcolor: seatInfo ? '#e0f7fa' : '#ffeaea',
                          }}
                        >
                          <strong>Seat {seatNo}</strong><br />
                          {seatInfo ? (
                            <>
                              <Chip label={seatInfo.type} size="small" sx={{ mt: 0.5 }} /><br />
                              <small>🧑‍💼 {seatInfo.name}</small><br />
                              <small>📞 {seatInfo.phone}</small><br />
                              <small>🆔 {seatInfo.nrc}</small><br />
                              <small>📝 {seatInfo.note}</small>
                            </>
                          ) : (
                            <em>Empty</em>
                          )}
                        </Box>
                      );
                      seatNo++;
                    }

                    row.push(<Box key={`gap-${r}`} sx={{ width: 30 }} />);

                    for (let i = 0; i < layout[1]; i++) {
                      if (seatNo > totalSeats) break;
                      const seatInfo = seatMap.get(seatNo);
                      row.push(
                        <Box
                          key={`seat-${seatNo}`}
                          sx={{
                            width: 220,
                            height: 190,
                            border: '1px solid #ccc',
                            borderRadius: 2,
                            p: 1,
                            textAlign: 'center',
                            bgcolor: seatInfo ? '#e0f7fa' : '#ffeaea',
                          }}
                        >
                          <strong>Seat {seatNo}</strong><br />
                          {seatInfo ? (
                            <>
                              <Chip label={seatInfo.type} size="small" sx={{ mt: 0.5 }} /><br />
                              <small>🧑‍💼 {seatInfo.name}</small><br />
                              <small>📞 {seatInfo.phone}</small><br />
                              <small>🆔 {seatInfo.nrc}</small><br />
                              <small>📝 {seatInfo.note}</small>
                            </>
                          ) : (
                            <em>Empty</em>
                          )}
                        </Box>
                      );
                      seatNo++;
                    }

                    seatCells.push(
                      <Box key={`row-${r}`} sx={{ display: 'flex', gap: 1 }}>
                        {row}
                      </Box>
                    );
                  }

                  return seatCells;
                })()}
              </Box>
            </Grid>

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
