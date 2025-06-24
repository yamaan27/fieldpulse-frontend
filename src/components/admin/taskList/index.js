import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";


import { TableWrapper } from "components/common/TableWrapper";

import {
  Link,
  useMediaQuery,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import styled from "styled-components";

import { color } from "services/colors";

import useDebounce from "hooks/useDebounce";

//STYLES


const BoxWrapper = styled(Box)`
  border-radius: 24px;
  // background: white;
  // border: 1px solid ${color.brandColor.primary["900"]};
  background: ${({ isSmallScreen }) => (isSmallScreen ? "none" : "white")};
  border: ${({ isSmallScreen }) =>
    isSmallScreen ? "none" : `1px solid ${color.brandColor.primary["900"]}`};
  padding-bottom: 20px;
  margin-bottom: 80px;
  position: relative;
  ${(props) => props.theme.breakpoints.only("xs")} {
    margin-bottom: 250px;
  }
`;


const Wrapper = styled(Box)`
  background: white;
  border-radius: 10px;
  padding: 24px;
  margin-top: 32px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
`;

const TaskListComp = (props) => {

  const [userList, setUserList] = useState([
    {
      id: "T001",
      title: "Install AC Unit",
      assignedTo: "John Doe",
      location: "Sector 21, Noida",
      status: "Pending",
      due: "2025-06-21",
    },
    {
      id: "T002",
      title: "Wi-Fi Setup",
      assignedTo: "Sara Ali",
      location: "DLF Phase 3, Gurgaon",
      status: "Completed",
      due: "2025-06-19",
    },
    {
      id: "T003",
      title: "Router Replacement",
      assignedTo: "Amit Sharma",
      location: "MG Road, Bengaluru",
      status: "In Progress",
      due: "2025-06-22",
    },
    {
      id: "T004",
      title: "Smart Meter Inspection",
      assignedTo: "Nidhi Kapoor",
      location: "Gachibowli, Hyderabad",
      status: "Pending",
      due: "2025-06-24",
    },
    {
      id: "T005",
      title: "Electric Panel Repair",
      assignedTo: "Rakesh Singh",
      location: "Salt Lake, Kolkata",
      status: "Completed",
      due: "2025-06-18",
    },
    {
      id: "T006",
      title: "Gas Pipeline Maintenance",
      assignedTo: "Neeraj Mehta",
      location: "Powai, Mumbai",
      status: "In Progress",
      due: "2025-06-20",
    },
    {
      id: "T007",
      title: "Internet Installation",
      assignedTo: "Manisha Pillai",
      location: "Viman Nagar, Pune",
      status: "Pending",
      due: "2025-06-23",
    },
    {
      id: "T008",
      title: "CCTV Setup",
      assignedTo: "Ravi Patel",
      location: "Satellite, Ahmedabad",
      status: "Completed",
      due: "2025-06-17",
    },
    {
      id: "T009",
      title: "AC Gas Refill",
      assignedTo: "Anjali Rao",
      location: "Anna Nagar, Chennai",
      status: "Pending",
      due: "2025-06-22",
    },
    {
      id: "T010",
      title: "Elevator Service",
      assignedTo: "Rajeev Nair",
      location: "Sector 62, Noida",
      status: "In Progress",
      due: "2025-06-21",
    },
  ]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const taskHeader = [
    { id: "id", label: "Task ID", sort: true },
    { id: "title", label: "Title", sort: true },
    { id: "assignedTo", label: "Assigned To", sort: false },
    { id: "location", label: "Location", sort: false },
    { id: "status", label: "Status", sort: true },
    { id: "due", label: "Due Date", sort: true },
  ];
  const isSmallScreen = useMediaQuery("(max-width:700px)");

  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 800);

  useEffect(() => {
    if (!searchValue.length) setSearchValue("");
  }, [searchValue]);

  
  return (
    <>
      {" "}
      <BoxWrapper isSmallScreen={isSmallScreen}>
        <Wrapper>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Tasks
          </Typography>

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
            customFontSize
            customSpace
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
        </Wrapper>
      </BoxWrapper>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

TaskListComp.propTypes = {};

TaskListComp.defaultProps = {};

export const TaskList = connect(
  null,
  mapDispatchToProps
)(TaskListComp);
