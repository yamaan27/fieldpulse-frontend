import React, { useEffect, useState } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { differenceInDays, parseISO } from 'date-fns'

import {
  Box,
  Grid,
  Typography,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  useMediaQuery,
} from '@mui/material'

import styled from 'styled-components'

import PropTypes from 'prop-types'

import { TableWrapper } from 'components/common/TableWrapper'
import { ClientCard } from 'components/common/Card'
import MobilePagination from 'components/common/MobilePagination'

import { clientMeetHeader } from 'services/helpers/constants/admin/meetingLog'
import { endPoints } from 'services/helpers/config'
import { color } from 'services/colors'

import { getAllTaskApi } from 'action/Task/TaskAct'

import { ReactComponent as DoubleUpArrowIcon } from 'assets/svg/double_up_arrow.svg'
import { ReactComponent as DoubleDownArrowIcon } from 'assets/svg//double_down_arrow.svg'
import moment from 'moment'
import useDebounce from 'hooks/useDebounce'

const TextWrap = styled(Box)`
  display: flex;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  align-items: center;
  span {
    margin-right: 5px;
  }
`

const LinkWrap = styled(Link)`
  color: ${color.brandColor.primary[200]};
  text-decoration-color: ${color.brandColor.primary[200]};
  font-size: 16px;
  ${(props) => props.theme.breakpoints.only('xs')} {
    font-size: 14px;
  }
`

const LocationWrap = styled(Typography)`
  ${(props) => props.theme.breakpoints.only('xs')} {
    font-size: 14px;
  }
`

const SubText = styled(Typography).attrs({ variant: 'body1' })`
  font-size: 0.9rem;
  width: 100%;
  ${(props) => props.theme.breakpoints.only('xs')} {
    font-size: 14px;
  }
`
const MovementText = styled(Typography).attrs({ variant: 'body1' })`
  width: 100%;
  font-size: 13px;
  font-weight: 600;
`

const BoxWrap = styled(Box)`
  display: flex;
  gap: 5px;
  align-items: center;
  width: max-content;
`

const TaskTableComp = (props) => {
  const navigate = useNavigate()
  let { CENTER, POINTER } = endPoints.common
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const [rowsPerPage, setRows] = useState(50)
  const [count, setCount] = useState(0)
  const [order, setOrder] = useState('')
  const [orderBy, setOrderBy] = useState('')
  const [meetingList, setMeetingList] = useState([])
  const debouncedSearchValue = useDebounce(props?.searchValue, 800)
  const isSmallScreen = useMediaQuery('(max-width:700px)')

  const goToDetailPage = (_id) => {
    navigate(`/tasks/details/${_id}`, {
      state: { id: _id },
    })
  }
  useEffect(() => {
    setIsLoading(true)
    const query = {
      page,
      pageSize: isSmallScreen ? 10 : rowsPerPage,
      sortbyClientName: order,
      sortby: orderBy,
    }
    if (debouncedSearchValue && debouncedSearchValue.trim() !== '') {
      query.search = debouncedSearchValue
    }
    props
      .getAllTaskApi(query)
      .then((res) => {
        console.log("getAllTaskApi res", res);
        setMeetingList(res || [])

        setCount(res?.totalUsers)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching users:', error)
        setIsLoading(false)
      })
  }, [debouncedSearchValue, page, rowsPerPage, order, orderBy, isSmallScreen])

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={64} />
      </div>
    )
  }

  const capitalizeFirstLetter = (string) => {
    if (!string) return ''
    if (string == 'Ag discussion') {
      return (
        string.charAt(0).toUpperCase() +
        string.charAt(1).toUpperCase() +
        string.slice(2)
      )
    } else {
      return string.charAt(0).toUpperCase() + string.slice(1)
    }
  }

  // Function to format date as "DD MMM YYYY"
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.toLocaleDateString('en-US', { day: '2-digit' })
    const month = date.toLocaleDateString('en-US', { month: 'short' })
    const year = date.toLocaleDateString('en-US', { year: 'numeric' })

    return `${day} ${month} ${year}`
  }

  const renderBoxWrap = (pulseData) => (
    <BoxWrap>
      {pulseData?.length > 0 ? (
        <>
          <TextWrap>
            <MovementText fontSize="13px !important">Pulse</MovementText>
            {pulseData?.[0]?.order === 'increased' ||
            pulseData?.[0]?.order == null ? (
              <DoubleUpArrowIcon
                style={{
                  fill: pulseData?.[0]?.diff >= 2 ? '#27AE60' : '#F2C94C',
                  fontSize: '18px',
                }}
              />
            ) : pulseData?.[0]?.order === 'decreased' ? (
              <DoubleDownArrowIcon
                style={{
                  fill: '#EB5757',
                  fontSize: '18px',
                }}
              />
            ) : null}
          </TextWrap>
          <TextWrap>
            <MovementText fontSize="13px !important">
              Revenue Impact
            </MovementText>

            {pulseData?.[0]?.RevenueImpactOrder === 'increased' ||
            pulseData?.[0]?.RevenueImpactOrder == null ? (
              <DoubleUpArrowIcon
                style={{
                  fill:
                    pulseData?.[0]?.RevenueImpactDiff >= 2
                      ? '#27AE60'
                      : '#F2C94C',
                  fontSize: '18px',
                }}
              />
            ) : pulseData?.[0]?.RevenueImpactOrder === 'decreased' ? (
              <DoubleDownArrowIcon
                style={{
                  fill: '#EB5757',
                  fontSize: '18px',
                }}
              />
            ) : null}
          </TextWrap>
          <TextWrap>
            <MovementText fontSize="13px !important">Relationship</MovementText>
            {pulseData?.[0]?.relationshipOrder === 'increased' ||
            pulseData?.[0]?.relationshipOrder == null ? (
              <DoubleUpArrowIcon
                style={{
                  fill:
                    pulseData?.[0]?.relationShipdiff >= 2
                      ? '#27AE60'
                      : '#F2C94C',
                  fontSize: '18px',
                }}
              />
            ) : pulseData?.[0]?.relationshipOrder === 'decreased' ? (
              <DoubleDownArrowIcon
                style={{
                  fill: '#EB5757',
                  fontSize: '18px',
                }}
              />
            ) : null}
          </TextWrap>
        </>
      ) : (
        '-'
      )}
    </BoxWrap>
  )

  function calculateDaysDifference(dateString) {
    const targetDate = parseISO(dateString)
    const today = new Date()
    const daysDifference = differenceInDays(targetDate, today)

    if (daysDifference > 0) {
      return `${daysDifference} day${daysDifference > 1 ? 's' : ''} remaining`
    } else if (daysDifference < 0) {
      return `${Math.abs(daysDifference)} day${Math.abs(daysDifference) > 1 ? 's' : ''} ago`
    } else {
      return 'Today'
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {isSmallScreen ? (
          <>
            {meetingList.length === 0 ? (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height="100%"
              >
                <Typography variant="h6">No Data Found</Typography>
              </Box>
            ) : (
              meetingList.map(
                ({
                  _id,
                  clientName,
                  date,
                  typeOfMeeting,
                  modeOfMeeting,
                  clientReference,
                  pulseData,
                }) => (
                  <ClientCard
                    key={_id}
                    subtitleIcon={false}
                    meetingLog={true}
                    title={clientName}
                    label={formatDate(date)}
                    dateIn={calculateDaysDifference(date)}
                    onDetailClick={() => goToDetailPage(_id)}
                    details={[
                      {
                        label: "Type of Meeting",
                        value: capitalizeFirstLetter(typeOfMeeting),
                        // style: { minWidth: '160px' },
                      },
                      {
                        label: "Mode of Meeting",
                        value: capitalizeFirstLetter(modeOfMeeting),
                        // style: { minWidth: '160px' },
                      },
                      {
                        label: "BU",
                        value: clientReference?.businessUnit?.name,
                        // style: { minWidth: '160px' },
                      },

                      {
                        label: "SC",
                        value: clientReference?.solutionCenter?.name,
                        // style: { minWidth: '130px' },
                      },
                      {
                        label: "Movement",
                        value: renderBoxWrap(pulseData),
                        // style: { minWidth: '130px' },
                      },
                    ]}
                  />
                )
              )
            )}
            {meetingList.length > 0 && (
              <MobilePagination
                count={count}
                page={page}
                rowsPerPage={10}
                setPage={setPage}
              />
            )}
          </>
        ) : (
          <TableWrapper
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRows}
            headerDetails={clientMeetHeader}
            userList={meetingList || []}
            order={order}
            setOrder={setOrder}
            orderBy={orderBy}
            setOrderBy={setOrderBy}
            count={count}
          >
            {meetingList?.map(
              (
                {
                  _id,
                  taskId,
                  title,
                  assignedTo,
                  location,
                  status,
                  dueDate,
                  pulseData,
                },
                index
              ) => {
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={index}
                    align={CENTER}
                    style={{ cursor: POINTER }}
                  >
                    <TableCell
                      align={"left"}
                      sx={{
                        minWidth: "180px",
                      }}
                    >
                      <LinkWrap onClick={() => goToDetailPage(taskId)}>
                        {taskId}
                      </LinkWrap>
                    </TableCell>
                    <TableCell
                      align={"left"}
                      sx={{
                        minWidth: "140px",
                      }}
                    >
                      <LocationWrap>{title}</LocationWrap>
                    </TableCell>
                    <TableCell align={"left"}>
                      <LocationWrap>{assignedTo?.name}</LocationWrap>
                    </TableCell>
                    <TableCell
                      align={"left"}
                      sx={{
                        minWidth: "130px",
                      }}
                    >
                      <LocationWrap>{"N/A"}</LocationWrap>
                    </TableCell>
                    <TableCell
                      align={"left"}
                      sx={{
                        minWidth: "90px",
                      }}
                    >
                      <LocationWrap>{status}</LocationWrap>
                    </TableCell>
                    <TableCell
                      align={"left"}
                      sx={{
                        minWidth: "90px",
                      }}
                    >
                      <LocationWrap>
                        {" "}
                        {moment.utc(dueDate).format("DD MMM YYYY")}
                      </LocationWrap>
                    </TableCell>
                    {/* <TableCell
                      align={"left"}
                      // sx={{
                      //   minWidth: '340px',
                      // }}
                    >
                      <BoxWrap>
                        {pulseData?.length > 0 ? (
                          <>
                            <TextWrap>
                              <SubText>Pulse</SubText>
                              {pulseData?.[0]?.order === "increased" ||
                              pulseData?.[0]?.order == null ? (
                                <DoubleUpArrowIcon
                                  style={{
                                    fill:
                                      pulseData?.[0]?.diff >= 2
                                        ? "#27AE60"
                                        : "#F2C94C",
                                    fontSize: "18px",
                                  }}
                                />
                              ) : pulseData?.[0]?.order === "decreased" ? (
                                <DoubleDownArrowIcon
                                  style={{
                                    fill: "#EB5757",
                                    fontSize: "18px",
                                  }}
                                />
                              ) : null}
                            </TextWrap>
                            {pulseData?.[0]?.RevenueImpactDiff !== "" && (
                              <TextWrap>
                                <SubText>Revenue Impact</SubText>

                                {pulseData?.[0]?.RevenueImpactOrder ===
                                  "increased" ||
                                pulseData?.[0]?.RevenueImpactOrder == null ? (
                                  <DoubleUpArrowIcon
                                    style={{
                                      fill:
                                        pulseData?.[0]?.RevenueImpactDiff >= 2
                                          ? "#27AE60"
                                          : "#F2C94C",
                                      fontSize: "18px",
                                    }}
                                  />
                                ) : pulseData?.[0]?.RevenueImpactOrder ===
                                  "decreased" ? (
                                  <DoubleDownArrowIcon
                                    style={{
                                      fill: "#EB5757",
                                      fontSize: "18px",
                                    }}
                                  />
                                ) : null}
                              </TextWrap>
                            )}
                            <TextWrap>
                              <SubText>Relationship</SubText>
                              {pulseData?.[0]?.relationshipOrder ===
                                "increased" ||
                              pulseData?.[0]?.relationshipOrder == null ? (
                                <DoubleUpArrowIcon
                                  style={{
                                    fill:
                                      pulseData?.[0]?.relationShipdiff >= 2
                                        ? "#27AE60"
                                        : "#F2C94C",
                                    fontSize: "18px",
                                  }}
                                />
                              ) : pulseData?.[0]?.relationshipOrder ===
                                "decreased" ? (
                                <DoubleDownArrowIcon
                                  style={{
                                    fill: "#EB5757",
                                    fontSize: "18px",
                                  }}
                                />
                              ) : null}
                            </TextWrap>
                          </>
                        ) : (
                          "-"
                        )}
                      </BoxWrap>
                    </TableCell> */}
                  </TableRow>
                );
              }
            )}
          </TableWrapper>
        )}
      </Grid>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAllTaskApi }, dispatch)
}

TaskTableComp.propTypes = {
  getAllTaskApi: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.any,
}

TaskTableComp.defaultProps = {}

export const TaskTable = connect(null, mapDispatchToProps)(TaskTableComp)
