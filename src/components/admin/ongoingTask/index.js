import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ClientCard } from "components/common/Card";
import { differenceInDays, parseISO } from "date-fns";
import { TableWrapper } from "components/common/TableWrapper";
import PropTypes from "prop-types";
import Icon from "services/icon";
import { clearUserRole, getUserData, reverseGeocode } from "utils/authUtils";
import { getTaskbyUseridApi } from "action/Task/TaskAct";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import {
  Link,
  useMediaQuery,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { color } from "services/colors";

import useDebounce from "hooks/useDebounce";

//STYLES

const SmallText = styled(Typography)({
  fontSize: "12px",
});

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



const StyledButton = styled(Button)({
  width: "max-content",
  backgroundColor: "#FFFFFF",
  color: "#324559",
  border: "1px solid #324559",
  fontSize: "16px",
  height: "43px",
  borderRadius: "8px",
  padding: "8px 48px",
  textTransform: "none",
  fontWeight: 600,
  lineHeight: "20px",
  textAlign: "left",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  "@media (max-width: 600px)": {
    fontSize: "14px",
    padding: "8px 18px",
  },
});
const StyledButtonWhite = styled(Button)({
  width: "max-content",
  backgroundColor: "#FFFFFF",
  color: "#324559",
  border: "1px solid #324559",
  fontSize: "16px",
  height: "43px",
  borderRadius: "8px",
  padding: "8px 48px",
  textTransform: "none",
  fontWeight: 600,
  lineHeight: "20px",
  textAlign: "left",
  "&:hover": {
    backgroundColor: "#f0f0f0",
  },
  "@media (max-width: 600px)": {
    fontSize: "14px",
    padding: "8px 18px",
  },
});

const OngoingTaskComp = (props) => {
  const [userList, setUserList] = useState([]);

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("id");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const role = getUserData();
    setUserId(role);
  }, []);

  useEffect(() => {
    if (!searchValue.length) setSearchValue("");
  }, [searchValue]);

  function calculateDaysDifference(dateString) {
    const targetDate = parseISO(dateString);
    const today = new Date();
    const daysDifference = differenceInDays(targetDate, today);

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference > 1 ? "s" : ""} remaining`;
    } else if (daysDifference < 0) {
      return `${Math.abs(daysDifference)} day${Math.abs(daysDifference) > 1 ? "s" : ""} ago`;
    } else {
      return "Today";
    }
  }

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  //   const month = date.toLocaleDateString("en-US", { month: "short" });
  //   const year = date.toLocaleDateString("en-US", { year: "numeric" });

  //   return `${day} ${month} ${year}`;
  // };
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "N/A"; // Invalid date check

    const day = date.toLocaleDateString("en-US", { day: "2-digit" });
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const year = date.toLocaleDateString("en-US", { year: "numeric" });

    return `${day} ${month} ${year}`;
  };
  

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    if (string == "Ag discussion") {
      return (
        string.charAt(0).toUpperCase() +
        string.charAt(1).toUpperCase() +
        string.slice(2)
      );
    } else {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  };

  useEffect(() => {
    if (userId) {
      getTaskbyId();
    }
  }, [userId]);

  const goToDetailPage = (_id, edit = false) => {
    navigate(`/ongoing_task/details/${_id}`, {
      state: { id: _id, edit },
    });
  };

  const getTaskbyId = () => {
    setIsLoading(true);
    // let query = {
    //   id: userId,
    // };
    let query = {
      id: userId ,
      filter: "in_progress",
    };

    props
      // .getTaskbyUseridApi({ id: userId })
      .getTaskbyUseridApi(query)
      .then(async (response) => {
        const enrichedTasks = await Promise.all(
          response.map(async (task) => {
            const locationStr = await reverseGeocode(
              task.location.lat,
              task.location.lng
            );
            return {
              id: task.taskId,
              title: task.title,
              description: task.description,
              assignedTo: task.assignedTo?.name || "Unassigned",
              location: locationStr, // updated here
              status: task.status,
              due: task.dueDate,
              _id: task._id,
            };
          })
        );

        setUserList(enrichedTasks);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  return (
    <>
      <BoxWrapper isSmallScreen={isSmallScreen}>
        <Wrapper>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Ongoing Tasks
          </Typography>

          {/* <TableWrapper
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
          </TableWrapper> */}

          {/* {userList.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">No Data Found</Typography>
            </Box>
          ) : (
            userList.map((task, index) => (
              <ClientCard
                key={index}
                subtitleIcon={false}
                meetingLog={true}
                title={task.title}
                label={formatDate(task.due)}
                dateIn={calculateDaysDifference(task.due)}
                onDetailClick={() => goToDetailPage(task._id)}
                details={[
                  {
                    label: "Title",
                    value: capitalizeFirstLetter(task.title),
                    // style: { minWidth: '160px' },
                  },
                  {
                    label: "Description",
                    value: capitalizeFirstLetter(task.title),
                    // style: { minWidth: '160px' },
                  },
                  {
                    label: "Location",
                    value: task.location,
                    // style: { minWidth: '160px' },
                  },

                  {
                    label: "Status",
                    value: task.status,
                    // style: { minWidth: '130px' },
                  },
                  {
                    label: "Due Date",
                    value: task.due,
                    // style: { minWidth: '130px' },
                  },
                  // {
                  //   label: "Movement",
                  //   value: renderBoxWrap(pulseData),
                  //   // style: { minWidth: '130px' },
                  // },
                ]}
              />
            ))
          )} */}
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="body1">Loading tasks...</Typography>
            </Box>
          ) : userList.length === 0 ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">No Data Found</Typography>
            </Box>
          ) : (
            userList.map((task, index) => (
              <ClientCard
                key={index}
                title={task.title}
                label={formatDate(task.due)}
                dateIn={calculateDaysDifference(task.due)}
                onDetailClick={() => goToDetailPage(task.id)}
                meetingLog={true}
                centerContent={true}
                // {...console.log("task.taskId", task)}
                details={[
                  {
                    label: "Task ID",
                    value: capitalizeFirstLetter(task.id),
                  },
                  {
                    label: "Description",
                    value: capitalizeFirstLetter(task.description),
                  },
                  { label: "Location", value: task.location },
                  { label: "Status", value: task.status },
                  { label: "Due Date", value: formatDate(task?.due) },
                ]}
                customActions={
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    alignItems="center"
                    width="100%"
                    gap={2}
                  >
                    <StyledButton
                      type="submit"
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForwardIcon />}
                      onClick={() => goToDetailPage(task.id)}
                    >
                      Complete Task
                    </StyledButton>
                  </Box>
                }
              />
            ))
          )}
        </Wrapper>
      </BoxWrapper>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getTaskbyUseridApi }, dispatch);
};

OngoingTaskComp.propTypes = { getTaskbyUseridApi: PropTypes.func.isRequired };

OngoingTaskComp.defaultProps = {};

export const OngoingTask = connect(null, mapDispatchToProps)(OngoingTaskComp);
