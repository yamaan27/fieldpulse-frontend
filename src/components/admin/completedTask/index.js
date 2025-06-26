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

const CompletedTaskComp = (props) => {
  const [userList, setUserList] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

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
      id: userId,
      filter: "completed",
    };

    props
      // .getTaskbyUseridApi({ id: userId })
      .getTaskbyUseridApi(query)
      .then(async (response) => {
        console.log("getTaskbyUseridApi response", response);
        const enrichedTasks = await Promise.all(
          response.map(async (task) => {
            const locationStr = await reverseGeocode(
              task.location.lat,
              task.location.lng
            );
            const formatStatus = (status) => {
              if (!status) return "N/A";
              return status
                .split("_")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ");
            };
            return {
              id: task.taskId,
              title: task.title,
              description: task.description,
              assignedTo: task.assignedTo?.name || "Unassigned",
              location: locationStr, // updated here
              status: formatStatus(task.status),
              note: task?.proof?.notes || "No note provided",
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
            Completed Tasks
          </Typography>

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
                  { label: "Proof Note", value: task?.note },
                ]}
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

CompletedTaskComp.propTypes = { getTaskbyUseridApi: PropTypes.func.isRequired };

CompletedTaskComp.defaultProps = {};

export const CompletedTask = connect(
  null,
  mapDispatchToProps
)(CompletedTaskComp);
