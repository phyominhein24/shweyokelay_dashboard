import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { TablePaginationActions, emptyRows } from "../../../constants/config";
import { 
    Table, Grid, TableBody, 
    TableCell, TableContainer,
    TablePagination, TableRow,
    Paper, Box, TableHead, 
    TableSortLabel, IconButton
} from "@mui/material";
import { setPaginate } from "../paymentHistorySlice";
import { paymentHistoryService } from "../paymentHistoryService";
import { paymentHistoryPayload } from "../paymentHistoryPayload";
import { paths } from "../../../constants/paths";
import { NavigateId } from "../../../shares/NavigateId";
import { TableSearch } from "../../../shares/TableSearch";
import { FilterByStatus } from "../../../shares/FilterByStatus";
import { FilterByDate } from "../../../shares/FilterByDate";
import { TableCustomizeSetting } from "../../../shares/TableCustomizeSetting";
import { alertToggle, setDateFilter } from "../../../shares/shareSlice";
import { getData, setData } from "../../../helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";

import AlertDialog from "../../../shares/AlertDialog";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import EmptyData from "../../../shares/EmptyData";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExportImportButton from "../../../shares/ExportImportButton";
import { FilterByDate } from "../../../shares/FilterByDate";
import { FilterByStatus } from "../../../shares/FilterByStatus";
import { NavigateId } from "../../../shares/NavigateId";
import ReloadData from "../../../shares/ReloadData";
import SkeletonTable from "../../../shares/SkeletonTable";
import { TableCustomizeSetting } from "../../../shares/TableCustomizeSetting";
import { TableSearch } from "../../../shares/TableSearch";
import TimetoAmPm from "../../../shares/TimetoAmPm";
import { paths } from "../../../constants/paths";
import { paymentHistoryPayload } from "../paymentHistoryPayload";
import { paymentHistoryService } from "../paymentHistoryService";
import { setPaginate } from "../paymentHistorySlice";

export const PaymentHistoryList = () => {
  const { paymentHistorys, paginateParams } = useSelector(
    (state) => state.paymentHistory
  );
  const { startFilterDate, endFilterDate, selectedId } = useSelector(
    (state) => state.share
  );
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [columnIds, setColumnIds] = useState("");
  const [sort, setSort] = useState(true);

  const [columns, setColumns] = useState(
    getData(paymentHistoryPayload.columnsName) == null
      ? paymentHistoryPayload.columns
      : getData(paymentHistoryPayload.columnsName)
  );

  const paymentHistoryStatus = useRef(["ALL"]);

  const onPageChange = (event, newPage) => {
    dispatch(
      setPaginate({
        ...paginateParams,
        page: newPage,
      })
    );
  };

  const onRowPerPageChange = (event) => {
    dispatch(
      setPaginate({
        ...paginateParams,
        page: 1,
        per_page: parseInt(event.target.value, 10),
      })
    );
  };

  const onHandleSort = (event, label) => {
    setSort(!sort);
    dispatch(
      setPaginate({
        ...paginateParams,
        sort: sort ? "ASC" : "DESC",
        order: label?.toLowerCase(),
      })
    );
  };

  const ColumnSortHandle = (id) => {
    if (columnIds === id) {
      return sort ? "asc" : "desc";
    }
  };

  const onSearchChange = (event) => {
    dispatch(
      setPaginate({
        ...paginateParams,
        search: event,
      })
    );
  };

  const onFilter = (e) => {
    console.log(e);
    let updatePaginateParams = { ...paginateParams };

    if (e?.target?.value === "ALL") {
      updatePaginateParams.filter = "";
      updatePaginateParams.value = "";
    } else {
      updatePaginateParams.filter = "status";
      updatePaginateParams.value = e?.target?.value;
    }
    dispatch(setPaginate(updatePaginateParams));
  };

  const onFilterByDate = (e) => {
    let updatePaginateParams = { ...paginateParams };

    updatePaginateParams.start_date = e.startDate
      ? e.startDate.toISOString().split("T")[0]
      : "";
    updatePaginateParams.end_date = e.endDate
      ? e.endDate.toISOString().split("T")[0]
      : "";

    dispatch(setDateFilter(e));
    dispatch(setPaginate(updatePaginateParams));
  };

  const reloadData = () => {
    if (startFilterDate == undefined) {
      loadingData();
    }
    dispatch(setDateFilter(""));
    dispatch(setPaginate(paymentHistoryPayload.paginateParams));
  };

  const deleteData = async () => {
    setIsLoading(true);
    const result = await paymentHistoryService.destory(dispatch, selectedId);
    if (result.status == 200) {
      dispatch(alertToggle());
      loadingData();
      setIsLoading(false);
    } else {
      setIsLoading(false);
      dispatch(alertToggle());
    }
  };

  const exportExcelData = async () => {
    await paymentHistoryService.exportexcel(dispatch);
  };

  const exportExcelParamsData = async () => {
    await paymentHistoryService.exportexcelparams(dispatch, paginateParams);
  };

  const exportPdfData = async () => {
    await paymentHistoryService.exportpdf(dispatch);
  };

  const exportPdfParamsData = async () => {
    await paymentHistoryService.exportpdfparams(dispatch, paginateParams);
  };

  const importData = async (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e);
    const create = await paymentHistoryService.import(formData, dispatch);
    if (create.status == 200) {
      loadingData();
    }
    setIsLoading(false);
  };

  const loadingData = useCallback(async () => {
    const result = await paymentHistoryService.index(dispatch, paginateParams);
    if (result.status === 200) {
      setTotal(result.data.total);
    }

    const loadingData = useCallback(async () => {
        const result = await paymentHistoryService.index(dispatch, paginateParams);
        if (result.status === 200) {
            setTotal(
                result.data.total
            );
        }
        setIsLoading(false)
        if(getData(paymentHistoryPayload.columnsName) == null){
            setData(paymentHistoryPayload.columnsName, paymentHistoryPayload.columns)
        }
    }, [dispatch, paginateParams]);

    const confirmTicket = async (id) => {
        setIsLoading(true);
        const confirm = await paymentHistoryService.show(dispatch, id, 'confirm');
        if(confirm.status == 200){
            loadingData()
        }
        setIsLoading(false); 
    }

    const rejectTicket = async (id) => {
        setIsLoading(true);
        const reject = await paymentHistoryService.show(dispatch, id, 'reject');
        if(reject.status == 200){
            loadingData()
        }
        setIsLoading(false); 
    }

    useEffect(() => {
        setIsLoading(true)
        loadingData();
    }, [loadingData]);

    useEffect(()=>{
        setData(paymentHistoryPayload.columnsName, columns)
    },[columns])

    return (
        <div>
            <Breadcrumb />

            {isLoading ? (<SkeletonTable />):(
                <Paper
                    sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}
                >
                    <TableContainer sx={{ maxHeight: 540 }}>
                        <Table sx={{ minWidth: 500 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={12}>
                                        <Grid container spacing={2} direction="row" sx={{ paddingTop: 1 }}>

                                            <Grid container spacing={0.5} xs={12} sm={12} md={12} lg={7} xl={7} direction="row" justifyContent="flex-start" alignTransferItems="center">
                                                
                                                <Grid transferItem xs={1}>
                                                    <TableCustomizeSetting payload={paymentHistoryPayload.columns} columns={columns} setColumns={(e)=>setColumns(e)} />
                                                </Grid>

                                                {/* <Grid transferItem xs={2}> 
                                                    <FilterByStatus paginateParams={paginateParams} status={transferItemStatus} onFilter={onFilter} />
                                                </Grid> */}

                        <Grid transferItem xs={8}>
                          <FilterByDate onFilter={onFilterByDate} />
                        </Grid>

                        <Grid transferItem xs={1}>
                          <ReloadData reloadData={reloadData} />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={0.5}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={5}
                        xl={5}
                        direction="row"
                        justifyContent="flex-end"
                        alignTransferItems="center"
                      >
                        {/* <Grid transferItem>
                                <ExportImportButton exportExcelData={()=>exportExcelData()} exportPdfData={()=>exportPdfData()} importData={(e)=>importData(e)} exportExcelParamsData={(e)=>exportExcelParamsData(e)} exportPdfParamsData={(e)=>exportPdfParamsData(e)}/>
                            </Grid> */}
                                                <Grid transferItem>
                                                    <TableSearch paginateParams={paginateParams} onSearchChange={onSearchChange} />
                                                </Grid>

                                            </Grid>

                                        </Grid>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={column.id}
                                            align={column.align}
                                            style={{ minWidth: column.minWidth }}
                                        >
                                            <TableSortLabel
                                                active={true}
                                                direction={ColumnSortHandle(
                                                    column.id
                                                )}
                                                onClick={(e) => {
                                                    onHandleSort(e, column.id);
                                                    setColumnIds(column.id);
                                                }}
                                            >
                                                {column.label}
                                            </TableSortLabel>
                                        </TableCell>
                                    )
                                )}

                                </TableRow>
                            </TableHead>
                            {total !== 0 && (
                                <TableBody>
                                    {paymentHistorys.map((row) => {
                                        return (
                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                                {columns.map((column) => {
                                                    const value = row[column.id];

                                                    const switchCase = ({ column, value }) => {
                                                        switch (column.id) {
                                                            
                                                            case "open_time":
                                                                return TimetoAmPm(value);
                                                            case "close_time":
                                                                return TimetoAmPm(value);
                                                            case "option":
                                                                return (
                                                                    <>
                                                                        <IconButton
                                                                            sx={{ cursor: 'pointer', marginRight: 1 }}
                                                                            onClick={() => {
                                                                                if (window.confirm("Are you sure you want to confirm this ticket?")) {
                                                                                    confirmTicket(row.id);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <CheckCircleIcon style={{ color: '#1876D2' }} />
                                                                        </IconButton>

                                                                        <IconButton
                                                                            sx={{ cursor: 'pointer' }}
                                                                            onClick={() => {
                                                                                if (window.confirm("Are you sure you want to reject this ticket?")) {
                                                                                    rejectTicket(row.id);
                                                                                }
                                                                            }}
                                                                        >
                                                                            <CancelIcon style={{ color: 'red' }} />
                                                                        </IconButton>
                                                                    </>
                                                                )
                                                            default:
                                                                return value;
                                                        }
                                                    };

                                                    return (
                                                        <TableCell key={column.id} align={column.align} sx={{ paddingY: 0 }}>
                                                            {switchCase({ column, value })}
                                                        </TableCell>
                                                    );
                                                })}
                                            </TableRow>
                                        );
                                    })}
                                    {emptyRows(
                                        paginateParams.page,
                                        paginateParams.rowsPerPage,
                                        paymentHistorys
                                    ) > 0 && (
                                            <TableRow style={{ height: 53 * emptyRows }}>
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                </TableBody>
                            )}
                        </Table>
                    </TableContainer>
                    { total == 0 && (
                        <EmptyData/>
                    )}
                    <Box
                        display={"flex"}
                        alignItems={"center"}
                        justifyContent={"right"}
                        sx={{
                            width: "100%",
                        }}
                    >
                      <TableSortLabel
                        active={true}
                        direction={ColumnSortHandle(column.id)}
                        onClick={(e) => {
                          onHandleSort(e, column.id);
                          setColumnIds(column.id);
                        }}
                      >
                        {column.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {total !== 0 && (
                <TableBody>
                  {paymentHistorys.map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];

                          const switchCase = ({ column, value }) => {
                            switch (column.id) {
                              case "open_time":
                                return TimetoAmPm(value);
                              case "close_time":
                                return TimetoAmPm(value);
                              case "option":
                                return (
                                  <NavigateId
                                    url={`${paths.paymentHistory}/${row.id}`}
                                    id={row.id}
                                  />
                                );
                              default:
                                return value;
                            }
                          };

                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ paddingY: 0 }}
                            >
                              {switchCase({ column, value })}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                  {emptyRows(
                    paginateParams.page,
                    paginateParams.rowsPerPage,
                    paymentHistorys
                  ) > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {total == 0 && <EmptyData />}
          <Box
            display={"flex"}
            alignItems={"center"}
            justifyContent={"right"}
            sx={{
              width: "100%",
            }}
          >
            <TableRow>
              <TableCell>
                <TablePagination
                  sx={{
                    width: "100%",
                  }}
                  rowsPerPageOptions={[5, 10, 25]}
                  colSpan={3}
                  count={total}
                  rowsPerPage={paginateParams.per_page}
                  page={paginateParams ? paginateParams.page - 1 : 0}
                  SelectProps={{
                    inputProps: {
                      "aria-label": "rows per page",
                    },
                    native: true,
                  }}
                  onPageChange={onPageChange}
                  onRowsPerPageChange={onRowPerPageChange}
                  ActionsComponent={TablePaginationActions}
                />
              </TableCell>
            </TableRow>
          </Box>
        </Paper>
      )}
      <AlertDialog
        onAgree={() => deleteData()}
        title="WARNING!"
        body="This action will permanently delete the selected data. This process cannot be undone.
Do you wish to proceed?"
      />
    </div>
  );
};
