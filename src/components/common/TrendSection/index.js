import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'

import { Box, Typography, FormLabel } from '@mui/material'

import Asterisk from 'components/common/Asterisk'

const SectionWrapper = styled(Box)`
  // margin-top: 24px;
  margin-bottom: 16px;
  // overflow-x: auto;

  // ${(props) => props.theme.breakpoints.down('sm')} {
  //   margin-top: 20px;
  // }
  ${(props) => props.theme.breakpoints.up('md')} {
    margin-bottom: 10px;
  }
`

const CustomFormLabel = styled(FormLabel)`
  color: black;
  font-weight: 400;

  ${(props) => props.theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`

const TrendCard = styled(Typography).attrs({ variant: 'caption' })`
  background: ${(props) => props.bgColor || '#FAFAFA'};
  width: 32px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  color: ${(props) => props.textColor || 'white'};
  font-weight: 500;
  margin-right: 10px;
  margin-bottom: 5px;
  font-size: 14px;
  cursor: pointer;

  ${(props) => props.theme.breakpoints.down('sm')} {
    width: 28px;
    height: 28px;
    font-size: 14px;
  }
`

const TrendSection = ({ title, userThreshold, onChange }) => {
  const isFormMode = location.pathname.includes('form')
  const values = Array(10)
    .fill(null)
    .map((_, index) => index + 1)

  const getColor = () => {
    if (userThreshold >= 1 && userThreshold <= 5) {
      return '#eb5757'
    } else if (userThreshold >= 6 && userThreshold <= 7) {
      return '#DB8D39'
    } else if (userThreshold >= 8 && userThreshold <= 9) {
      return '#F2C94C'
    } else if (userThreshold <= 10) {
      return '#27AE60'
    }
    return '#FFFFFF'
  }

  const handleClick = (value) => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <SectionWrapper>
      <CustomFormLabel>
        {title}
        {isFormMode && <Asterisk />}
      </CustomFormLabel>
      <Box display="flex" flexWrap="wrap" sx={{ mt: '5px' }}>
        {values.map((value, index) => (
          <TrendCard
            key={index}
            bgColor={value <= userThreshold ? getColor(value) : undefined}
            textColor={value <= userThreshold ? 'white' : 'black'}
            onClick={() => handleClick(value)}
          >
            {value}
          </TrendCard>
        ))}
      </Box>
    </SectionWrapper>
  )
}

TrendSection.propTypes = {
  title: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  userThreshold: PropTypes.number.isRequired,
  onChange: PropTypes.func,
}

export default TrendSection
