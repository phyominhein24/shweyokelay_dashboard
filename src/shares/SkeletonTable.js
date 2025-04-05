import {
  Box,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
} from "@mui/material";

import React from "react";
import Skeleton from "@mui/material/Skeleton";

const SkeletonTable = () => {
  const header = [50, 100, 80, 70, 80, 70];

  const body = [
    [100, 200, 220, 200, 100, 90],
    [100, 170, 300, 170, 90, 100],
    [100, 180, 250, 180, 80, 80],
    [100, 200, 350, 200, 100, 100],
    [100, 190, 300, 190, 90, 90],
    [100, 194, 220, 180, 80, 80],
    [100, 200, 250, 200, 100, 90],
    [100, 170, 350, 170, 90, 100],
    [100, 180, 300, 180, 80, 80],
  ];
  return (
    <Paper sx={{ width: "100%", overflow: "hidden", marginTop: "10px" }}>
      <TableContainer sx={{ maxHeight: 540 }}>
        <Table sx={{ minWidth: 500 }}>
          <TableHead>
            <TableRow>
              {header.map((data, index) => (
                <TableCell key={index}>
                  <Skeleton width={data} animation="wave" />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {body.map((data, index) => (
              <TableRow key={index}>
                {data.map((d, index) => (
                  <TableCell key={index}>
                    <Skeleton width={d} animation="wave" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>
                <Skeleton animation="wave" />
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default SkeletonTable;
