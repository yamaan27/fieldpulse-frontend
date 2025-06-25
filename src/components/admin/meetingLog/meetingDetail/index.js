import { connect } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

import PropTypes from 'prop-types'

import {
  Box,
  CircularProgress,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { TitleCard, ButtonContainer } from 'components/common'

import Icon from 'services/icon'
import { color } from 'services/colors'
import {
  getFieldLabel,
  fieldLabels,
  baseRequiredFields2,
} from 'services/helpers/constants/admin/meetingLog'

import moment from 'moment'


import { MeetingInformation } from '../meetingInformation'
import {
  editMeetingApi,
  getMeetingbyidApi,
} from 'action/MeetingLog/MeetingLogAct'

import { errorToast, successToast } from 'services/helperFunctions'
import { toast } from 'react-toastify'

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
const FixedButtonWrapper = styled(Box)`
  position: fixed;
  bottom: -1px;
  left: 0;
  width: 100%;
  padding: 16px;
  background: white;
  border-top: 1px solid ${color.brandColor.primary['900']};
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  display: none;

  ${(props) => props.theme.breakpoints.down('md')} {
    display: flex;
    justify-content: center;
    border-radius: 16px 16px 0 0;
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

const MeetingDetailComp = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isEditMode, setIsEditMode] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const [meetingData, setMeetingData] = useState(null)
  const [values, setValues] = useState({})
  const [errors, setErrors] = useState({})
  const [stakeholderOptions, setStakeholderOptions] = useState([])
  // const [accountInfo, setAccountInfo] = useState({})
  const id = location.state?.id || '-'

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  const isSmallScreenButton = useMediaQuery('(max-width:1085px)')

  useEffect(() => {
    getMeetingbyId()
  }, [id])
  const getMeetingbyId = () => {
    setIsLoading(true)
    let query = {
      id: id,
    }

    props
      .getMeetingbyidApi(query)
      .then((response) => {
        const formattedResponse = {
          ...response,
          date: moment.utc(response.date).format('YYYY-MM-DD HH:mm:ss'),
        }

        setMeetingData(formattedResponse)
        setValues(formattedResponse)
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }
  const handleBackClick = () => {
    navigate('/tasks')
  }


  const handleCancelEdit = () => {
    setIsEditMode(false)
  }

  const handleSaveEdit = (action) => {
    setErrors({})

   

    
    const validationErrors = {}

   

    const externalStakeholders = values.stakeholders || []
    if (externalStakeholders.length === 0) {
      validationErrors.stakeholders = 'Stakeholder is required'
    }

    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors)

    //   const errorMessage = Object.values(validationErrors).join(', ')

    //   toast.error(errorMessage)
    //   return
    // }

    setErrors((prevErrors) => ({
      ...prevErrors,
      ...validationErrors,
    }))

    

    setIsLoadingBtn(true)
    let body = {
      ...values,
      meetingId: id,
      clientId: values?.clientReference?._id,
    }
    delete body.clientReference

    setIsLoading(true)

    let query = {
      sendClient: false,
      sendInternal: false,
      submit: false,
    }

    if (action === 'sendClient') {
      query.sendClient = true
    } else if (action === 'sendInternal') {
      query.sendInternal = true
    } else if (action === 'submit') {
      query.submit = true
    }

    props
      .editMeetingApi(query, body)
      .then(({ message }) => {
        setIsEditMode(false)
        successToast(message)
        setIsLoadingBtn(false)
        navigate('/tasks')
        setIsLoading(false)
      })
      .catch(({ message }) => {
        setIsLoadingBtn(false)
        errorToast(message)
        setIsLoading(false)
      })
  }

  const handleEditClick = () => {
    setIsEditMode(true)
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center' }}>
        <CircularProgress size={64} />
      </div>
    )
  }

  console.log('Inside meetingData')

  return (
    <>
      <BoxWrapperNoBg>
        <Grid
          container
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          paddingBottom="15px"
        >
          <Grid item xs={12} sm={12} md={6}>
            <BoxWrap>
              <Box sx={{ pr: '10px', zIndex: 1099 }}>
                <Icon
                  iconName="arrow_back_ios"
                  iconColor={color.brandColor.secondary.main}
                  onClick={handleBackClick}
                />
              </Box>
              <TitleWrap>
                <HighlightWrap>
                  <TitleCard title="Meeting Note Details" />
                </HighlightWrap>
              </TitleWrap>
            </BoxWrap>
          </Grid>
          {/* <Grid item xs={12} sm={6} md={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <NormalInput
                    revealed
                    placeholder="Select Client Name..."
                    height="50px"
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid> */}
          {!isSmallScreen && (
            <Grid item sx={12} sm={12} md={6}>
              <ButtonContainer
                labelRight={isEditMode ? 'Cancel Edit' : 'Edit'}
                iconRight={isEditMode ? 'cancel' : 'edit'}
                size="small"
                leftVariant={'hidden'}
                rightVariant={isEditMode ? 'outlined' : 'contained'}
                onSubmit={isEditMode ? handleCancelEdit : handleEditClick}
                loading={isLoadingBtn}
              />
            </Grid>
          )}
        </Grid>
      </BoxWrapperNoBg>

      <BoxWrapper>
        <Grid container spacing={2} style={{ width: '100%' }}>
          <Grid item xs={12} style={{ width: '100%' }}>
            <HeaderWrap>
              <Grid
                container
                spacing={2}
                style={{ width: '100%' }}
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item xs={12} sm={6} md={6} sx={{ display: 'flex' }}>
                  <CardTitle>Meeting Information</CardTitle>
                </Grid>
              </Grid>
            </HeaderWrap>
            <MeetingInformation
              ClientInfo={meetingData}
              errors={errors}
              values={values}
              setValues={setValues}
              isEditMode={isEditMode}
              stakeholderOptions={stakeholderOptions}
              setStakeholderOptions={setStakeholderOptions}
              // setAccountInfo={setAccountInfo}
            />
          </Grid>
        </Grid>
      </BoxWrapper>





      {isEditMode && (
        <>
          <Box
            display="flex"
            flexDirection={isSmallScreenButton ? 'column' : 'row'}
            justifyContent="flex-end"
            alignItems="center"
            gap={2}
            marginBottom={8}
            pb={isSmallScreen && 30}
            // sx={{
            //   pb: { xs: 25, sm: 25 }, // Apply padding-bottom only on xs and sm screens
            // }}
          >
            <Box
              display="flex"
              flexDirection="row"
              gap={2}
              justifyContent={isSmallScreenButton ? 'center' : 'flex-end'}
              alignItems="center"
              width={isSmallScreenButton ? '100%' : 'auto'}
            >
              <StyledButtonWhite
                type="submit"
                variant="outlined"
                endIcon={<CloseIcon style={{ color: '#006ADA' }} />}
                onClick={handleCancelEdit}
              >
                Cancel
              </StyledButtonWhite>


            </Box>

            {isSmallScreenButton && (
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
                  onClick={() => handleSaveEdit('submit')}
                >
                  Submit
                </StyledButton>
              </Box>
            )}

            {!isSmallScreenButton && (
              <>
                {/* <Box
                  display="flex"
                  flexDirection="row"
                  justifyContent="center"
                  alignItems="center"
                  width="100%"
                  gap={2}
                > */}
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleSaveEdit('sendInternal')}
                >
                  Submit & Send Internal
                </StyledButton>
                <StyledButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  endIcon={<ArrowForwardIcon />}
                  onClick={() => handleSaveEdit('submit')}
                  // startIcon={isLoading ? <CircularProgress size={18} /> : null}
                >
                  Submit
                </StyledButton>
                {/* </Box> */}
              </>
            )}
          </Box>
        </>
      )}
      <FixedButtonWrapper>
        {isSmallScreen && (
          <Grid item sx={12} md={4}>
            <ButtonContainer
              labelRight={isEditMode ? 'Cancel Edit' : 'Edit'}
              iconRight={isEditMode ? 'cancel' : 'edit'}
              size="small"
              leftVariant={'hidden'}
              rightVariant={isEditMode ? 'outlined' : 'contained'}
              onSubmit={isEditMode ? handleCancelEdit : handleEditClick}
              loading={isLoadingBtn}
            />
          </Grid>
        )}
      </FixedButtonWrapper>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getMeetingbyidApi,
      editMeetingApi,
    },
    dispatch
  )
}

MeetingDetailComp.propTypes = {
  getMeetingbyidApi: PropTypes.func.isRequired,
  editMeetingApi: PropTypes.func.isRequired,
}

MeetingDetailComp.defaultProps = {}

export const MeetingDetail = connect(
  null,
  mapDispatchToProps
)(MeetingDetailComp)
