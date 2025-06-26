import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getUserData, getUserRole } from "utils/authUtils";
import { solutionList } from "services/helpers/constants/admin/dashboard";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import {
  Box,
  Grid,
  TableRow,
  TableCell,
  Typography,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'

import { color } from 'services/colors'
import {
  getAgentReportApi,
  getAgentsummaryApi,
} from "action/ProjectInsights/ProjectInsightsAct";


import Icon from 'services/icon'

import { TableWrapper } from 'components/common/TableWrapper'
import AgentReportChart from "components/common/AgentReportChart";
import { DashboardCard } from 'components/common/DashboardCard'

// import ComingSoon from 'assets/svg/coming_soon2.svg'

const SolutionWrap = styled(Box)`
  background: #fff;
  box-shadow: 0px 2px 12px 3px #b5e9ff40;
  border-radius: 24px;
  gap: 10px;
  padding: 15px 0;
  margin-bottom: 20px;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  min-height: 340px;

  ${(props) => props.theme.breakpoints.down('md')} {
    min-height: auto;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 10px;
    margin: 5px;
    padding-bottom: 15px;
    min-height: auto;
  }
`

// const ImageWrap = styled(Box)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   padding-top: 12rem;
//   ${(props) => props.theme.breakpoints.down('sm')} {
//     padding-top: 0;
//     img {
//       height: 121px;
//     }
//   }
// `
const CardTitle = styled(Typography).attrs({ variant: 'h6' })`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
  }
  padding: 20px;
  ${(props) => props.theme.breakpoints.down('sm')} {
    font-size: 18px;
  }
`

// const GradeWrap = styled(Box)`
//   display: flex;
//   justify-content: space-between;
//   font-weight: bold;
//   font-size: 15px;
// `

// const InfoText = styled(Typography)`
//   color: black;
//   font-size: 13px;
//   font-weight: 500;
//   min-width: fit-content;
// `

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const SolutionCenterComp = ({
  accountData,
  // count,
  getAgentsummaryApi,
  getAgentReportApi,
  // isLoading,
  overallGovernance,
  overallAgOpportunity,
  overallEscalation,
  overallXplus,
}) => {
  const [rowsPerPage, setRows] = useState(10)
  const isSmallScreen = useMediaQuery('(max-width:700px)')
    const [isLoading, setIsLoading] = useState(false)
    const [agentSummary, setAgentSummary] = useState([]);
    const [userId, setUserId] = useState(null);
     const [userRole, setUserRole] = useState(null);
     const [agentReportData, setAgentReportData] = useState(null);
     const [monthlyData, setMonthlyData] = useState([]);


     useEffect(() => {
        const id = getUserData();
         const role = getUserRole();
              setUserRole(role);
        setUserId(id);

      }, []);
    

    useEffect(() => {
      getAgentsummaryApi().then((res) => {
        setAgentSummary(res); // ✅ Save API response to state
      });
    }, []);

    const formatReportData = (monthlyData) => {
      const monthMap = Array.from({ length: 12 }, (_, i) => ({
        month: MONTH_NAMES[i],
        completed: 0,
        pending: 0,
        in_progress: 0,
        cancelled: 0,
        total: 0,
      }));

      monthlyData.forEach((item) => {
        const index = item.month - 1;
        monthMap[index] = {
          ...monthMap[index],
          ...item,
          month: MONTH_NAMES[index],
        };
      });

      return monthMap;
    };

      // useEffect(() => {
      //   if (userId) {
      //     getAgentReport();
      //   }
      // }, [userId]);

      // const getAgentReport = () => {
      //     setIsLoading(true);
      //     // let query = {
      //     //   id: userId,
      //     // };
      //     let query = {
      //       id: userId,
      //       // filter: "completed",
      //     };
      
      //     getAgentReportApi(query)
      //       .then(async (response) => {
      //         console.log("getAgentReportApi response", response);
      //         setIsLoading(false);
      //       })
      //       .catch(() => setIsLoading(false));
      //   };
      useEffect(() => {
        if (userId) {
          getAgentReportApi({ id: userId })
            .then((data) => {
              console.log("API monthly data:", data);
              setMonthlyData(data.report || []); // ✅ FIXED
            })
            .catch((err) => {
              console.error("Error fetching agent report", err);
            });
        }
      }, [userId]);
      

  return (
    <SolutionWrap>
      <Grid spacing={2} container>
        <Grid item xs={12} md={12} sx={{ display: "flex" }}>
          <CardTitle>
            <Icon
              iconName="emoji_events"
              iconColor={color.brandColor.secondary.main}
              fontSize="25px"
            />
            Agent Report
          </CardTitle>
        </Grid>
      </Grid>
      {/* <ImageWrap>
        <img src={ComingSoon} alt="ComingSoon" />
      </ImageWrap> */}
      {isLoading ? (
        <div style={{ textAlign: "center", paddingTop: "20px" }}>
          <CircularProgress size={64} />
        </div>
      ) : (
        <Grid item xs={12}>
          {isSmallScreen ? (
            <>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  mb={2}
                >
                  <DashboardCard
                    title="Overall Governance"
                    value={overallGovernance}
                  />
                  <DashboardCard
                    title="Overall Ag Opportunity"
                    value={overallAgOpportunity}
                  />
                </Box>
                <Box display="flex" justifyContent="space-between" width="100%">
                  <DashboardCard
                    title="Overall Escalation"
                    value={overallEscalation}
                  />
                  <DashboardCard
                    title="Overall X+ Recommend"
                    value={overallXplus}
                  />
                </Box>
              </Box>
            </>
          ) : (
            <>
            {userRole !== "agent" && (
              <TableWrapper
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRows}
                headerDetails={solutionList}
                userList={agentSummary}
                // count={count}
                pagination={false}
                insights={true}
              >
                {agentSummary.map((agent) => (
                  <TableRow hover key={agent.agentId}>
                    <TableCell align="left">{agent.name}</TableCell>
                    <TableCell align="left">{agent.completed}</TableCell>
                    <TableCell align="left">{agent.pending}</TableCell>
                    <TableCell align="left">{agent.inProgress}</TableCell>
                    <TableCell align="left">{agent.cancelled}</TableCell>
                  </TableRow>
                ))}
              </TableWrapper>)}
              {userRole === "agent" && (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={formatReportData(monthlyData)}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="completed"
                    name="Completed"
                    stackId="a"
                    fill="#4CAF50"
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    stackId="a"
                    fill="#FFC107"
                  />
                  <Bar
                    dataKey="in_progress"
                    name="In Progress"
                    stackId="a"
                    fill="#2196F3"
                  />
                  <Bar
                    dataKey="cancelled"
                    name="Cancelled"
                    stackId="a"
                    fill="#F44336"
                  />
                </BarChart>
              </ResponsiveContainer>
              )}
              {/* </Grid> */}
            </>
          )}
        </Grid>
      )}
    </SolutionWrap>
  );
}

// export default SolutionCenter

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { getAgentsummaryApi, getAgentReportApi },
    dispatch
  );
}

SolutionCenterComp.propTypes = {
  getAgentsummaryApi: PropTypes.func.isRequired,
  getAgentReportApi: PropTypes.func.isRequired,
  accountData: PropTypes.array.isRequired,
  // count: PropTypes.number.isRequired,
  overallGovernance: PropTypes.number.isRequired,
  overallAgOpportunity: PropTypes.number.isRequired,
  overallEscalation: PropTypes.number.isRequired,
  overallXplus: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

SolutionCenterComp.defaultProps = {}

export const SolutionCenter = connect(
  null,
  mapDispatchToProps
)(SolutionCenterComp)
