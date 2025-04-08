import {
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
import { alertToggle, setDateFilter } from "../../../shares/shareSlice";
import { getData, setData } from "../../../helpers/localstorage";
import { useDispatch, useSelector } from "react-redux";

import AlertDialog from "../../../shares/AlertDialog";
import { Breadcrumb } from "../../../shares/Breadcrumbs";
import EmptyData from "../../../shares/EmptyData";
import { FilterByDate } from "../../../shares/FilterByDate";
import { NavigateId } from "../../../shares/NavigateId";
import ReloadData from "../../../shares/ReloadData";
import SkeletonTable from "../../../shares/SkeletonTable";
import StatusColor from "../../../shares/StatusColor";
import { TableCustomizeSetting } from "../../../shares/TableCustomizeSetting";
import { TableSearch } from "../../../shares/TableSearch";
import TimetoAmPm from "../../../shares/TimetoAmPm";
import { counterPayload } from "../counterPayload";
import { counterService } from "../counterService";
import { paths } from "../../../constants/paths";
import { setPaginate } from "../counterSlice";

export const CounterList = () => {
  const { counters, paginateParams } = useSelector((state) => state.counter);
  const { startFilterDate, endFilterDate, selectedId } = useSelector(
    (state) => state.share
  );
  const dispatch = useDispatch();

  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [columnIds, setColumnIds] = useState("");
  const [sort, setSort] = useState(true);

  const [columns, setColumns] = useState(
    getData(counterPayload.columnsName) == null
      ? counterPayload.columns
      : getData(counterPayload.columnsName)
  );

  const counterStatus = useRef(["ALL"]);

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
    dispatch(setPaginate(counterPayload.paginateParams));
  };

  const deleteData = async () => {
    setIsLoading(true);
    const result = await counterService.destory(dispatch, selectedId);
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
    await counterService.exportexcel(dispatch);
  };

  const exportExcelParamsData = async () => {
    await counterService.exportexcelparams(dispatch, paginateParams);
  };

  const exportPdfData = async () => {
    await counterService.exportpdf(dispatch);
  };

  const exportPdfParamsData = async () => {
    await counterService.exportpdfparams(dispatch, paginateParams);
  };

  const importData = async (e) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", e);
    const create = await counterService.import(formData, dispatch);
    if (create.status == 200) {
      loadingData();
    }
    setIsLoading(false);
  };

  const loadingData = useCallback(async () => {
    const result = await counterService.index(dispatch, paginateParams);
    if (result.status === 200) {
      setTotal(result.data.total);
    }
    setIsLoading(false);
    if (getData(counterPayload.columnsName) == null) {
      setData(counterPayload.columnsName, counterPayload.columns);
    }
  }, [dispatch, paginateParams]);

  useEffect(() => {
    setIsLoading(true);
    loadingData();
  }, [loadingData]);

  useEffect(() => {
    setData(counterPayload.columnsName, columns);
  }, [columns]);

  return (
    <div>
      <Breadcrumb />

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
          <TableContainer sx={{ maxHeight: 540 }}>
            <Table sx={{ minWidth: 500 }}>
              <TableHead>
                <TableRow>
                  <TableCell colSpan={12}>
                    <Grid
                      container
                      spacing={2}
                      direction="row"
                      sx={{ paddingTop: 1 }}
                    >
                      <Grid
                        container
                        spacing={0.5}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={7}
                        xl={7}
                        direction="row"
                      >
                        <Grid item xs={1}>
                          <TableCustomizeSetting
                            payload={counterPayload.columns}
                            columns={columns}
                            setColumns={(e) => setColumns(e)}
                          />
                        </Grid>
                        <Grid item xs={8}>
                          <FilterByDate onFilter={onFilterByDate} />
                        </Grid>

                        <Grid item xs={1}>
                          <ReloadData reloadData={reloadData} />
                        </Grid>
                      </Grid>
                      <Grid
                        container
                        spacing={0.5}
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={5}
                        xl={5}
                        direction="row"
                      >
                        <Grid>
                          <TableSearch
                            paginateParams={paginateParams}
                            onSearchChange={onSearchChange}
                          />
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
                  {counters.map((row) => {
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
                              case "status":
                                return <StatusColor value={value} />;
                                case "option":
                                return (
                                  <NavigateId
                                    url={`${paths.counter}/${row.id}`}
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
                    counters
                  ) > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {total === 0 && <EmptyData />}

          <TablePagination
            component="div"
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
        </Paper>
      )}
      <AlertDialog
        onAgree={() => deleteData()}
        title="Are you sure?"
        body="Are You Want to Delete this Data ?"
      />
    </div>
  );
};
