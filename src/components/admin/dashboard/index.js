import { Box, Grid, Typography, TableRow, TableCell } from "@mui/material";
import { useState } from "react";
import { color } from "services/colors";
import styled from "styled-components";
import { Form, Formik } from "formik";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TableWrapper } from "components/common/TableWrapper";
import StatCard from "components/common/StatCard";

import { ToggleButtonGroup as _ToggleButtonGroup } from "@mui/lab";
// import React from 'react'

const BoxWrapper = styled(Box)`
  padding: 26px;
  border-radius: 8px;
  background: white;
  border: 1px solid ${color.brandColor.primary["900"]};
  margin: 20px;
`;
const Title = styled(Typography).attrs({ variant: "h6" })`
  font-weight: 700;
  padding: 0px 15px;
`;

const DashboardComp = () => {
  const [userList, setUserList] = useState([
    {
      id: "T-1001",
      title: "Repair AC Unit",
      status: "Pending",
      assignedTo: "John Doe",
      location: "Sector 21, Gurgaon",
      due: "2025-06-23",
    },
    {
      id: "T-1002",
      title: "Install Wi-Fi",
      status: "Completed",
      assignedTo: "Sara Khan",
      location: "DLF Phase 4",
      due: "2025-06-20",
    },
  ]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading] = useState(false);

  const taskHeader = [
    { id: "id", label: "Task ID", sort: true },
    { id: "title", label: "Title", sort: true },
    { id: "assignedTo", label: "Assigned To", sort: false },
    { id: "location", label: "Location", sort: false },
    { id: "status", label: "Status", sort: true },
    { id: "due", label: "Due Date", sort: true },
  ];

  return (
    <>
      <BoxWrapper>
        <Title>Admin Dashboard</Title>

        <Grid container spacing={3} sx={{ marginTop: "10px" }}>
          <Grid item xs={12} sm={4}>
            <StatCard title="Total Tasks" value="42" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard title="Pending" value="12" color="#f59e0b" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <StatCard title="Completed" value="30" color="#10b981" />
          </Grid>
        </Grid>
      </BoxWrapper>
      <BoxWrapper>
        <Title>Recent Tasks</Title>

        <TableWrapper
          userList={userList}
          headerDetails={taskHeader}
          order={order}
          orderBy={orderBy}
          page={page}
          rowsPerPage={rowsPerPage}
          count={userList.length}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
          setUserList={setUserList}
          loading={loading}
          colSpan={6}
        >
          {userList.map((task, index) => (
            <TableRow key={index}>
              <TableCell>{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.assignedTo}</TableCell>
              <TableCell>{task.location}</TableCell>
              <TableCell>
                <Typography
                  sx={{
                    color:
                      task.status === "Completed"
                        ? "green"
                        : task.status === "Pending"
                          ? "orange"
                          : "gray",
                    fontWeight: 600,
                  }}
                >
                  {task.status}
                </Typography>
              </TableCell>
              <TableCell>{task.due}</TableCell>
            </TableRow>
          ))}
        </TableWrapper>
      </BoxWrapper>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

DashboardComp.propTypes = {};

DashboardComp.defaultProps = {};

export const Dashboard = connect(null, mapDispatchToProps)(DashboardComp);
