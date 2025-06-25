import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import useValidator from "services/useValidator";
import styled from 'styled-components'

import PropTypes from 'prop-types'

import {
  Box,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import CloseIcon from '@mui/icons-material/Close'

import { TitleCard } from 'components/common'

import { errorToast, successToast } from 'services/helperFunctions'
import Icon from 'services/icon'
import { color } from 'services/colors'

import { getUserEmail } from 'utils/authUtils'


import { MeetingInformation } from '../meetingInformation'

import { addTaskApi } from 'action/MeetingLog/MeetingLogAct'

const BoxWrapper = styled(Box)`
  border-radius: 24px;
  background: white;
  border: 1px solid ${color.brandColor.primary['900']};

  margin-bottom: 20px;
`

const BoxWrapperNoBg = styled(Box)`
  border-radius: 15px;

  background: none;
`

const CardTitle = styled(Typography).attrs({ variant: 'h6' })`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
    font-size: 18px;
  }
`

const HeaderWrap = styled(Box)`
  padding: 20px;
  width: 100%;
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 10px;
  }
`
const StyledButton = styled(Button)`
  width: max-content;
  font-size: 16px;
  height: 48px;
  border-radius: 8px;
  padding: 8px 48px;
  text-transform: none;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  margin-top: 20px;
  ${(props) => props.theme.breakpoints.only('xs')} {
    font-size: 14px;
    margin-top: 5px;
    padding: 8px 18px;
  }
`
const StyledButtonWhite = styled(Button)({
  width: 'max-content',
  backgroundColor: '#FFFFFF',
  color: '#006ADA',
  border: '1px solid #006ADA',
  fontSize: '16px',
  height: '48px',
  borderRadius: '8px',
  padding: '8px 48px',
  textTransform: 'none',
  fontWeight: 600,
  lineHeight: '20px',
  textAlign: 'left',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
  '@media (max-width: 600px)': {
    fontSize: '14px',
    padding: '8px 18px',
  },
})

const TitleWrap = styled(Box)`
  display: flex;
  flex-direction: column;
`
const BoxWrap = styled(Box)`
  display: flex;
  align-items: center;
  padding-left: 8px;
  ${(props) => props.theme.breakpoints.only('xs')} {
    align-items: start;
  }
`
const HighlightWrap = styled(Box)`
  display: flex;
  padding-bottom: 10px;
  ${(props) => props.theme.breakpoints.only('xs')} {
    display: inline-block;
  }
`

const AddMeetingComp = (props) => {
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [userEmail, setUserEmail] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [validator, showValidationMessage] = useValidator();
  const [stakeholderOptions, setStakeholderOptions] = useState([])

  useEffect(() => {
    const email = getUserEmail()
    setUserEmail(email)
  }, [])

  const navigate = useNavigate()
  const isSmallScreen = useMediaQuery('(max-width:1085px)')

  const handleBackClick = () => {
    navigate('/tasks')
  }

  

  const handleSubmit = (action) => {
    setErrors({})

    
    const validationErrors = {}

    if (validator.allValid()) {

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }))
    setIsLoading(true)
    let body = { ...values }
    delete body.relationshipstakeholder

    if (userEmail) {
      body.email = userEmail
    }
    let query = {
    };
    

    props
      .addTaskApi( query, body)
      .then(({ message }) => {
        successToast(message)
        navigate('/tasks')
        setIsLoading(false)
      })
      .catch(({ message }) => {
        errorToast(message)
        setIsLoading(false)
      })
    } else {
      showValidationMessage(true)
      toast.error('Please enter all mandatory fields')
    }
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={64} />
      </div>
    )
  }

  return (
    <>
      <BoxWrapperNoBg>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={8}>
            <BoxWrap>
              <Box sx={{ pr: "10px", zIndex: 1099 }}>
                <Icon
                  iconName="arrow_back_ios"
                  iconColor={color.brandColor.secondary.main}
                  onClick={handleBackClick}
                />
              </Box>
              <TitleWrap>
                <HighlightWrap>
                  <TitleCard title="Add Task" />
                </HighlightWrap>
              </TitleWrap>
            </BoxWrap>
          </Grid>
        </Grid>
      </BoxWrapperNoBg>
      {/* <Grid container pb={!values?.clientName ? 30 : 0}> */}
      <BoxWrapper style={{ marginBottom: "15px" }}>
        <Grid container spacing={2} style={{ width: "100%" }}>
          <Grid item xs={12} style={{ width: "100%" }}>
            <HeaderWrap>
              <Grid
                container
                spacing={2}
                style={{ width: "100%" }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={6} md={6} sx={{ display: "flex" }}>
                  <CardTitle>Task Information</CardTitle>
                </Grid>
              </Grid>
            </HeaderWrap>
            <MeetingInformation
              errors={errors}
              values={values}
              validator={validator}
              setValues={setValues}
              stakeholderOptions={stakeholderOptions}
              setStakeholderOptions={setStakeholderOptions}
            />
          </Grid>
        </Grid>
      </BoxWrapper>
      {/* </Grid> */}

      <>
        <Box
          display="flex"
          flexDirection={isSmallScreen ? "column" : "row"}
          justifyContent="flex-end"
          alignItems="center"
          gap={2}
          marginBottom={4}
          pb={isSmallScreen && 30}
        >
          <Box
            display="flex"
            flexDirection="row"
            gap={2}
            justifyContent={isSmallScreen ? "center" : "flex-end"}
            alignItems="center"
            width={isSmallScreen ? "100%" : "auto"}
          >
            <StyledButtonWhite
              type="submit"
              variant="outlined"
              endIcon={<CloseIcon style={{ color: "#006ADA" }} />}
              onClick={() => navigate("/tasks")}
            >
              Cancel
            </StyledButtonWhite>
          </Box>

          {isSmallScreen && (
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
                onClick={() => handleSubmit("submit")}
              >
                Submit
              </StyledButton>
            </Box>
          )}

          {!isSmallScreen && (
            <>
              <StyledButton
                type="submit"
                variant="contained"
                color="primary"
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleSubmit("submit")}
                // startIcon={isLoading ? <CircularProgress size={18} /> : null}
              >
                Submit
              </StyledButton>
            </>
          )}
        </Box>
      </>
    </>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addTaskApi }, dispatch)
}

AddMeetingComp.propTypes = {
  addTaskApi: PropTypes.func.isRequired,
}

AddMeetingComp.defaultProps = {}

export const AddMeeting = connect(null, mapDispatchToProps)(AddMeetingComp)
