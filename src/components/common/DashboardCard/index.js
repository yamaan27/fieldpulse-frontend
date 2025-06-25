import { Box, Grid, Typography } from '@mui/material'
import styled from 'styled-components'
import React from 'react'
import Icon from 'services/icon'
import PropTypes from 'prop-types'

const CardTitle = styled(Typography)`
  text-decoration: underline;
  font-weight: 700;
  font-size: 14px;
`
const CardSubText = styled(Typography)`
  font-size: 13px;
  font-weight: 700;
  display: flex;
  align-items: center;
`
const BoxWrap = styled(Box)`
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
`
const TextWrap = styled(Typography).attrs({ variant: 'caption' })`
  margin-right: 12px;
  color: ${({ iconColor }) => iconColor};
  background-color: ${({ bgColor }) => bgColor};
  padding: 2px 10px;
  border-radius: 12px;
  display: inline-block;
  span {
    margin-right: 5px;
  }
  span.material-icons {
    position: relative;
    top: 4px;
  }
`
const CardWrap = styled(Box)`
  background: rgba(251, 244, 235, 1);
  margin: 10px;
  border-radius: 15px;
  padding: 10px 15px;
  box-sizing: border-box;
`

// Dynamic DashboardCard component
export const DashboardCard = ({
  title = 'Default Title',
  location,
  value,
  objectives = [],
  backgroundColor,
  customValue,
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <CardWrap backgroundColor={backgroundColor}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={9} sm={9}>
              <CardTitle>{title}</CardTitle>
            </Grid>
            <Grid item xs={3} sm={3}>
              {location ? (
                <CardSubText>
                  <Icon iconName="location_on" fontSize="18px" />
                  {location}
                </CardSubText>
              ) : (
                <CardSubText>{value}</CardSubText>
              )}
            </Grid>
          </Grid>
          {objectives?.length > 0 && (
            <BoxWrap>
              {objectives.length > 0
                ? objectives.map(
                    ({ label, iconName, iconColor, bgColor }, key) => (
                      <TextWrap
                        key={key}
                        iconColor={iconColor}
                        bgColor={bgColor}
                      >
                        <Icon
                          iconName={iconName}
                          iconColor={iconColor}
                          fontSize="18px"
                        />
                        {label}
                      </TextWrap>
                    )
                  )
                : '-'}
            </BoxWrap>
          )}
          {customValue}
        </CardWrap>
      </Grid>
    </Grid>
  )
}

// Define PropTypes for the component
DashboardCard.propTypes = {
  title: PropTypes.string,
  location: PropTypes.string,
  value: PropTypes.string,
  objectives: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      iconName: PropTypes.string.isRequired,
      iconColor: PropTypes.string,
      bgColor: PropTypes.string,
    })
  ),
  backgroundColor: PropTypes.string,
  customValue: PropTypes.node,
}
