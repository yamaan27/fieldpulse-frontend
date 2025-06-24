import { Box, Grid, Typography, Card, CardContent } from '@mui/material'

import styled from 'styled-components'
import Icon from 'services/icon'
import PropTypes from 'prop-types'
import React from 'react'

//STYLES
const StatusWrap = styled(Typography)`
  background: ${({ status }) =>
    status === 'active'
      ? '#eef9f9'
      : status === 'inactive'
        ? '#FFEBEB'
        : '#FBF4EB'};
  color: ${({ status }) =>
    status === 'active'
      ? '#27ae60'
      : status === 'inactive'
        ? '#EB5757'
        : '#DB8D39'};
  font-size: ${({ isCard }) => (isCard ? '12px' : '15px')};
  text-align: center;
  padding: 4px 12px;
  margin: 4px 12px;
  border-radius: 12px;
  text-transform: capitalize;
`
const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: none;
  border: 1px solid #d9d9d9;
  // margin-bottom: 20px;
  // margin: ${({ meetingLog }) => (meetingLog ? '20px' : '12px')};
  margin: 0 15px 20px 15px;
`

const TitleText = styled(Typography)`
  color: ${({ meetingLog, userManagement }) =>
    meetingLog || userManagement ? 'black' : '#a3b0bd'};
  font-size: 12px;
`

const InfoText = styled(Typography)`
  color: black;
  font-size: ${({ meetingLog }) => (meetingLog ? '14px' : '12px')};
  font-weight: ${({ meetingLog, userManagement }) =>
    meetingLog || userManagement ? '600' : 'normal'};
  min-width: fit-content;
`

const StyledName = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  // border-bottom: 1px solid #dadada;
`

const ViewDetails = styled(Typography)`
  // color: #006ada;
  font-size: 14px;
  display: flex;
  align-items: center;
`

const StyledBox = styled(Box)(({ centerContent }) => ({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
  borderTop: '1px solid #dadada',
  padding: '10px 16px',
  backgroundColor: '#C7DEF6',
  justifyContent: centerContent ? 'center' : '',
}))

export const ClientCard = ({
  title,
  subtitle,
  subtitleIcon = true,
  details = [],
  status,
  dateIn,
  onActionClick,
  onDetailClick,
  centerContent = false,
  meetingLog,
  userManagement,
  actionLabel = 'View Details',
  label,
  customActions = null,
  statusOptions = {
    active: { background: '#eef9f9', color: '#27ae60' },
    inactive: { background: '#FFEBEB', color: '#EB5757' },
    other: { background: '#FBF4EB', color: '#DB8D39' },
  },
}) => {
  const renderDetails = () =>
    details.map((detail, index) => (
      <Grid
        item
        xs={
          detail.label === 'Movement'
            ? 12
            : meetingLog || userManagement
              ? 6
              : 4
        }
        sm={detail.label === 'Movement' ? 8 : 4}
        md={4}
        key={index}
        style={detail.style || {}}
      >
        <TitleText meetingLog={meetingLog} userManagement={userManagement}>
          {detail.label}
        </TitleText>
        <InfoText meetingLog={meetingLog} userManagement={userManagement}>
          {detail.value || 'N/A'}
        </InfoText>
      </Grid>
    ))

  const getStatusStyles = (status) => {
    if (statusOptions[status]) {
      return statusOptions[status]
    }
    return statusOptions.other
  }

  return (
    <StyledCard>
      <CardContent style={{ padding: '0' }}>
        {(subtitle || status) && (
          <Box
            display="flex"
            justifyContent="space-between"
            padding="16px 16px 0 16px"
          >
            {subtitle && (
              <ViewDetails>
                {subtitleIcon && (
                  <Icon
                    iconName="location_on"
                    fontSize="22px"
                    iconColor={`#121212`}
                  />
                )}
                <Typography variant="body2" ml={1} style={{ color: '#121212' }}>
                  {subtitle}
                </Typography>
              </ViewDetails>
            )}
            {status && (
              <StatusWrap style={getStatusStyles(status)}>{status}</StatusWrap>
            )}
          </Box>
        )}
        {(title || label) && (
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom="1px solid #dadada"
            padding={label ? '12px 16px 6px 16px' : '0 16px 8px 16px'}
            backgroundColor={label ? '#CAE0FC' : ''}
            mb={meetingLog ? 0 : 1}
          >
            <StyledName gutterBottom mb={0}>
              {title}
            </StyledName>
            {onActionClick && (
              <ViewDetails onClick={onActionClick} sx={{ cursor: 'pointer' }}>
                <Icon
                  iconName="visibility"
                  fontSize="22px"
                  iconColor={`#006ADA`}
                />
                <Typography variant="body2" ml={1} color="#006ada">
                  {actionLabel}
                </Typography>
              </ViewDetails>
            )}
            {label && (
              <ViewDetails>
                <Typography variant="body2" ml={1} style={{ fontSize: '12px' }}>
                  {label}
                </Typography>
              </ViewDetails>
            )}
          </Box>
        )}

        {meetingLog && (
          <Box
            display="inline-flex"
            width="-webkit-fill-available"
            justifyContent="space-between"
            padding="0 16px 10px 12px"
            backgroundColor={'#CAE0FC'}
            mb={1.5}
          >
            <ViewDetails sx={{ cursor: 'pointer' }} onClick={onDetailClick}>
              <Icon
                iconName="visibility"
                fontSize="20px"
                iconColor={`#006ada`}
              />

              <Typography
                variant="body2"
                ml={1}
                style={{ color: '#006ada', fontSize: '12px' }}
              >
                View Details
              </Typography>
            </ViewDetails>

            {dateIn && (
              <ViewDetails>
                <Typography variant="body2" ml={1} style={{ fontSize: '12px' }}>
                  {dateIn}
                </Typography>
              </ViewDetails>
            )}
          </Box>
        )}

        <Grid
          container
          spacing={2}
          p={2}
          // pt={0}
          pt={userManagement ? 2 : 0}
          sx={{
            backgroundColor:
              meetingLog || userManagement ? '#E8EFF9' : 'inherit',
          }}
        >
          {renderDetails()}
        </Grid>

        {customActions && (
          <StyledBox centerContent={centerContent}>{customActions}</StyledBox>
        )}
      </CardContent>
    </StyledCard>
  )
}

ClientCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  subtitleIcon: PropTypes.bool,
  details: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ),
  status: PropTypes.string,
  dateIn: PropTypes.string,
  onActionClick: PropTypes.func,
  onDetailClick: PropTypes.func,
  actionLabel: PropTypes.string,
  label: PropTypes.string,
  customActions: PropTypes.node,
  centerContent: PropTypes.bool,
  meetingLog: PropTypes.bool,
  userManagement: PropTypes.bool,
  statusOptions: PropTypes.arrayOf(PropTypes.string),
}
