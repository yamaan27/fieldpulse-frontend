import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Box,
  Grid,
  TableRow,
  TableCell,
  CircularProgress,
  useMediaQuery,
  Typography,
} from '@mui/material'

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { color } from 'services/colors'
import styled from 'styled-components'
import { summaryApi } from "action/ProjectInsights/ProjectInsightsAct";
import { TableWrapper } from 'components/common/TableWrapper'
import MobilePagination from 'components/common/MobilePagination'
import { DashboardCard } from 'components/common/DashboardCard'



import Icon from 'services/icon'
import PropTypes from 'prop-types'
// import { DashboardCard } from '../dashboard/DashboardCard'


const CardTitle = styled(Typography).attrs({ variant: "h6" })`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
  }
  padding: 40px 20px 20px 40px;
  ${(props) => props.theme.breakpoints.down("sm")} {
    font-size: 18px;
  }
`;
const GradeWrap = styled(Box)`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 15px;
`

const InfoText = styled(Typography)`
  color: black;
  font-size: 13px;
  font-weight: 500;
  min-width: fit-content;
`
const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; 
const SummaryComp = ({
  summaryApi,
  accountData,
  count,
  page,
  setPage,
  isLoading,
  data,
}) => {
  const [rowsPerPage, setRows] = useState(10);
  
  const isSmallScreen = useMediaQuery("(max-width:700px)");
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    summaryApi().then((res) => {
      setSummaryData(res);
    });
  }, []);
  const chartData = summaryData
    ? [
        { name: "Completed", value: summaryData.completed },
        { name: "Pending", value: summaryData.pending },
        {
          name: "Others",
          value:
            summaryData.total - (summaryData.completed + summaryData.pending),
        },
      ]
    : [];


  // if (isLoading) {
  //   return (
  //     <div style={{ textAlign: 'center' }}>
  //       <CircularProgress size={64} />
  //     </div>
  //   )
  // }

  return (
    <Grid container spacing={2} sx={{ alignItems: "stretch" }}>
      <Grid spacing={2} container>
              <Grid item xs={12} md={12} sx={{ display: "flex" }}>
                <CardTitle>
                  <Icon
                    iconName="emoji_events"
                    iconColor={color.brandColor.secondary.main}
                    fontSize="25px"
                  />
                  Summary
                </CardTitle>
              </Grid>
            </Grid>
      <Grid item xs={12}>
        {isSmallScreen ? (
          <>
            {accountData.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography variant="h6">No Data Found</Typography>
              </Box>
            ) : (
              accountData.map(
                ({ _id, clientName, clientReference, status }) => {
                  const clientPulse = clientReference?.latestClientPulse ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      mt={2}
                      flexWrap="wrap"
                    >
                      <InfoText pr={0.5}>Client Pulse:</InfoText>
                      <GradeWrap>
                        <Box display="flex" alignItems="center">
                          <Icon
                            iconName="bolt"
                            fontSize="20px"
                            iconColor={getIconColor(
                              clientReference?.latestClientPulse
                            )}
                          />
                          {clientReference?.latestClientPulse}
                        </Box>
                      </GradeWrap>
                    </Box>
                  ) : null;

                  const statusDisplay = status ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      mt={1}
                      flexWrap="wrap"
                    >
                      <InfoText pr={0.5}>Status:</InfoText>
                      <InfoText style={{ fontWeight: 600 }}>{status}</InfoText>
                    </Box>
                  ) : (
                    <Box
                      display="flex"
                      alignItems="center"
                      mt={1}
                      flexWrap="wrap"
                    >
                      <InfoText pr={0.5}>Status:</InfoText>
                      <Box>-</Box>
                    </Box>
                  );

                  return (
                    <DashboardCard
                      key={_id}
                      title={clientName}
                      value={clientReference?.solutionCenter?.name || "-"}
                      // customValue={clientPulse}
                      customValue={
                        <Box
                          display="flex"
                          alignItems="end"
                          justifyContent="space-between"
                          gap={2}
                        >
                          {clientPulse}
                          {statusDisplay}
                        </Box>
                      }
                    />
                  );
                }
              )
            )}
            {accountData?.meetings?.length > 0 && (
              <MobilePagination
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                setPage={setPage}
              />
            )}
          </>
        ) : (
          // <TableWrapper
          //   page={page}
          //   setPage={setPage}
          //   rowsPerPage={rowsPerPage}
          //   setRowsPerPage={setRows}
          //   headerDetails={'accountList'}
          //   userList={accountData}
          //   count={count}
          //   pagination={true}
          //   insights={true}
          // >
          //   {accountData.map(
          //     ({ clientName, clientReference, status }, index) => {
          //       const iconColor = getIconColor(
          //         clientReference?.latestClientPulse
          //       )
          //       return (
          //         <TableRow hover tabIndex={-1} key={index}>
          //           <TableCell align={'left'}>{clientName}</TableCell>
          //           <TableCell align={'left'}>
          //             {clientReference?.solutionCenter?.name || '-'}
          //           </TableCell>
          //           <TableCell align={'left'}>
          //             <GradeWrap>
          //               <Box display="flex">
          //                 {clientReference?.latestClientPulse ? (
          //                   <Icon
          //                     iconName="bolt"
          //                     fontSize="20px"
          //                     iconColor={iconColor}
          //                   />
          //                 ) : (
          //                   '-'
          //                 )}
          //                 {clientReference?.latestClientPulse}
          //               </Box>
          //             </GradeWrap>
          //           </TableCell>
          //           <TableCell align="left">{status || '-'}</TableCell>{' '}
          //         </TableRow>
          //       )
          //     }
          //   )}
          // </TableWrapper>
          <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={isSmallScreen ? 80 : 120}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
          // <Box
          //   display="flex"
          //   justifyContent="center"
          //   alignItems="center"
          //   height="100%"
          // >
          //   <Typography variant="h6">No Data Found</Typography>
          // </Box>
        )}
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ summaryApi }, dispatch);
}

SummaryComp.propTypes = {
  summaryApi: PropTypes.func.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  setCounts: PropTypes.func.isRequired,
  accountData: PropTypes.array.isRequired, // Array of account data
  count: PropTypes.number.isRequired, // Total count of records
  page: PropTypes.number.isRequired, // Current page number
  setPage: PropTypes.func.isRequired, // Function to set the page number
  isLoading: PropTypes.bool.isRequired,
  topRef: PropTypes.shape({
    current: PropTypes.instanceOf(Element),
  }).isRequired,
};

SummaryComp.defaultProps = {}

export const Summary = connect(
  null,
  mapDispatchToProps
)(SummaryComp)
