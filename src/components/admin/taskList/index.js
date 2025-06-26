import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ClientCard } from "components/common/Card";
import { differenceInDays, parseISO } from "date-fns";

import PropTypes from "prop-types";

import { getUserData, reverseGeocode } from "utils/authUtils";
import { getTaskbyUseridApi } from "action/Task/TaskAct";

import { useMediaQuery, Box, Typography } from "@mui/material";

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
    navigate(`/task_list/details/${_id}`, {
      state: { id: _id, edit },
    });
  };

  const getTaskbyId = () => {
    setIsLoading(true);
    let query = {
      id: userId,
      filter: "pending",
    };

    props
      // .getTaskbyUseridApi({ id: userId })
      .getTaskbyUseridApi(query)
      .then(async (response) => {
        console.log("response getTaskbyUseridApi", response);
        // const enrichedTasks = await Promise.all(
        //   response.map(async (task) => {
        //     const locationStr = await reverseGeocode(
        //       task.location.lat,
        //       task.location.lng
        //     );
        //     const formatStatus = (status) => {
        //       if (!status) return "N/A";
        //       return status
        //         .split("_")
        //         .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        //         .join(" ");
        //     };
        //     return {
        //       id: task.taskId,
        //       title: task.title,
        //       description: task.description,
        //       assignedTo: task.assignedTo?.name || "Unassigned",
        //       location: location, // updated here
        //       status: formatStatus(task.status),
        //       due: task.dueDate,
        //       _id: task._id,
        //     };
        //   })
        // );

        // setUserList(enrichedTasks);
        setUserList(response);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  };

  console.log("userList", userList);

  return (
    <>
      <BoxWrapper isSmallScreen={isSmallScreen}>
        <Wrapper>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Tasks
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
                label={formatDate(task.dueDate)}
                dateIn={calculateDaysDifference(task.dueDate)}
                onDetailClick={() => goToDetailPage(task.taskId)}
                meetingLog={true}
                centerContent={true}
                // {...console.log("task.taskId", task)}
                details={[
                  {
                    label: "Task ID",
                    value: capitalizeFirstLetter(task.taskId),
                  },
                  {
                    label: "Description",
                    value: capitalizeFirstLetter(task.description),
                  },
                  {
                    label: "Location",
                    value: task.location
                      ? [
                          task.location?.area, // optional
                          task.location?.city,
                          task.location?.state,
                          task.location?.country,
                          task.location?.pincode,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "N/A",
                  },
                  { label: "Status", value: task.status },
                  { label: "Due Date", value: formatDate(task?.dueDate) },
                ]}
                // customActions={
                //   <Box
                //     display="flex"
                //     justifyContent="center"
                //     alignItems="center"
                //     gap={"20px"}
                //     padding="0 16px 0 16px"
                //   >
                //     <Box
                //       display="flex"
                //       flexDirection="row"
                //       gap={2}
                //       justifyContent={isSmallScreen ? "center" : "flex-end"}
                //       alignItems="center"
                //       width={isSmallScreen ? "100%" : "auto"}
                //     >
                //       <StyledButtonWhite
                //         type="submit"
                //         variant="outlined"
                //         endIcon={<CloseIcon style={{ color: "#EB5757" }} />}
                //         onClick={() => navigate("/tasks")}
                //       >
                //         Reject
                //       </StyledButtonWhite>
                //     </Box>
                //     <Box
                //       display="flex"
                //       flexDirection="row"
                //       justifyContent="center"
                //       alignItems="center"
                //       width="100%"
                //       gap={2}
                //     >

                //       <StyledButton
                //         type="submit"
                //         variant="contained"
                //         color="primary"
                //         endIcon={<ArrowForwardIcon />}
                //         // onClick={() => handleSubmit("submit")}
                //       >
                //         Submit
                //       </StyledButton>
                //     </Box>
                //     <Box
                //       display="flex"
                //       gap={"10px"}
                //       alignItems="center"
                //       onClick={() => {
                //         setModalOpen(true);
                //         setId(_id);
                //       }}
                //       style={{ cursor: "pointer" }}
                //     >
                //       <Icon
                //         // onClick={() => {
                //         //   setModalOpen(true)
                //         //   setId(_id)
                //         // }}
                //         iconName="delete"
                //         fontSize="18px"
                //         iconColor="#4C4C4C"
                //       />
                //       <SmallText variant="body2">Delete</SmallText>
                //     </Box>
                //   </Box>
                // }
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

TaskListComp.propTypes = { getTaskbyUseridApi: PropTypes.func.isRequired };

TaskListComp.defaultProps = {};

export const TaskList = connect(null, mapDispatchToProps)(TaskListComp);
