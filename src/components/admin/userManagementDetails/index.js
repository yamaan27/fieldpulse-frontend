import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Box,
  CircularProgress,
  FormControl,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'

import PropTypes from 'prop-types'

import { toast } from 'react-toastify'

import styled from 'styled-components'

import { color } from 'services/colors'
import Icon from 'services/icon'

import { ButtonContainer, NormalSelect, TitleCard } from 'components/common'
import { NormalButton } from 'components/common/NormalButton'
import Modal from 'components/common/CustomModal'

import { getUserRole } from 'utils/authUtils'

import {
  getbyidApi,
  EditUserApi,
  deleteUserApi,
} from 'action/UserManagement/UserManagementAct'

import { validateInput } from 'services/helpers/constants/admin/userManagement'
import { NormalInput } from 'components/common/NormalInput'


import Asterisk from 'components/common/Asterisk'

const CardWrapper = styled(Box)`
  background: white;
  min-height: 100%;
  padding: 20px 16px;
  border-radius: 25px;
  border: 1px solid ${color.brandColor.primary['900']};
`
const CardTitle = styled(Typography).attrs({ variant: 'h6' })`
  padding-bottom: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
  }
`
const CardWrap = styled(Box)`
  // padding-bottom: 15px;
`
const SubTitle = styled(Typography).attrs({ variant: 'body2' })`
  padding-bottom: 5px;
  color: ${color.brandColor.primary['400']};
  font-weight: 500;
  font-size: 12px;
`
const Title = styled(Typography).attrs({ variant: 'body1' })`
  color: ${color.brandColor.primary['200']};
  font-weight: 700;
  font-size: 16px;
`
const Sctitle = styled(Typography).attrs({ variant: 'body1' })`
  color: ${color.brandColor.primary['200']};
  font-weight: 700;
  font-size: 16px;
  margin-top: 8px;
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
const CancelButton = styled(NormalButton)`
  margin-right: 5px;
`
const SubContent = styled(Typography)`
  color: ${color.brandColor.primary['500']};
  padding-bottom: 30px;
  // border-bottom: 1px solid ${color.brandColor.primary['900']};
`
const TextWrap = styled(Typography).attrs({ variant: 'caption' })`
  background: ${(props) => props.bgColor || '#eef9f9'};
  color: ${(props) => props.textColor || '#27ae60'};
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  // margin-top: 10px;
  font-weight: 500;
  display: flex;
  gap: 10px;
  align-items: center;

  ${(props) => props.theme.breakpoints.only('xs')} {
    font-size: 12px;
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

const UserManagementDetailsComp = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [userData, setUserData] = useState(null)
  const [isEditMode, setIsEditMode] = useState(location.state?.edit)
  const [selectedSolutionCenterId, setSelectedSolutionCenterId] = useState(null)
  const [selectedBusinessUnitId, setSelectedBusinessUnitId] = useState(null)
  const [values, setValues] = useState({})
  const [scOptions, setSCOptions] = useState([])
  const [buOptions, setBUOptions] = useState([])
  const [userRole, setUserRole] = useState(null)
  const [PMOptions, setPMOptions] = useState([])
const [roleOptions, setRoleOptions] = useState([
    { label: "Admin", value: "admin" },
    { label: "Agent", value: "agent" },
    { label: "Manager", value: "manager" },
    { label: "Viewer", value: "viewer" },
  ]);
  const [errors, setErrors] = useState({})
  const id = location.state?.id || '-'

  const theme = useTheme()
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const role = getUserRole()
    setUserRole(role)
  }, [])

  
  useEffect(() => {
    if (isEditMode) {
      setValues((prevValues) => {
        if (prevValues.role !== values.role) {
          return {
            ...prevValues,
            businessUnitids: '',
            solutionCenterids: '',
            ClientIds: null,
          }
        }
        return prevValues
      })
    }
  }, [values.role])
  const handleDelete = () => {
    let query = {
      id: id,
    }
    props
      .deleteUserApi(query)
      .then(({ message }) => {
        toast.success(message)
        navigate('/user-management')
      })
      .catch(({ error }) => {
        toast.error(error)
      })
  }

  const handleBackClick = () => {
    navigate('/user-management')
  }

  useEffect(() => {
    getUserbyId()
  }, [id])

  // useEffect(() => {
  //   if (values.role === 'SC' || values.role === 'PM') {
  //     props.getSCApi().then((res) => {
  //       const formattedOptions = res.map((sc) => ({
  //         value: sc._id,
  //         label: sc.name,
  //       }))
  //       setSCOptions(formattedOptions)
  //     })
  //   }
  //   if (values.role === 'BU' || values.role === 'BDM') {
  //     props.getBUApi().then((res) => {
  //       const formattedOptions = res.map((bu) => ({
  //         value: bu._id,
  //         label: bu.name,
  //       }))
  //       setBUOptions(formattedOptions)
  //     })
  //   }
  // }, [values.role])

  const getUserbyId = () => {
    setIsLoading(true)
    let query = {
      id: id,
    }

    props
      .getbyidApi(query)
      .then((response) => {
        console.log('response', response)
        setUserData(response.user)
        setValues({
          name: response?.user.name,
          email: response?.user.email,
          phone: response?.user.phone,
          role: response?.user.role,
        });
        setIsLoading(false)
      })
      .catch(() => setIsLoading(false))
  }
  const handleDeleteClient = () => {
    setModalOpen(true)
  }
  const handleEditClick = () => {
    setIsEditMode(true)
  }

  const handleCancelEdit = () => {
    setIsEditMode(false)
  }
  const handleSaveEdit = () => {
    setErrors({})

    const requiredFields = ['name', 'email', 'number', 'role']

    

    const validationErrors = {}

    Object.keys(values).forEach((key) => {
      const errorMessage = validateInput(key, values[key])
      if (errorMessage) validationErrors[key] = errorMessage
    })

    requiredFields.forEach((field) => {
      if (!values[field] || (typeof values === 'string' && !values.trim())) {
        validationErrors[field] = `${
          field.charAt(0).toUpperCase() + field.slice(1)
        } is required`
      }
      if (Array.isArray(values[field]) && values[field].length === 0) {
        validationErrors[field] =
          `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
      }
    })

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)

      const errorMessage = Object.values(validationErrors).join(', ')

      toast.error(errorMessage)
      return
    }
    setIsLoadingBtn(true)
    setIsLoading(true)
    // if (validator.allValid()) {
    setIsEditMode(false)
    let body = {
      ...values,
      id,
      // type : values.type.name,
    }
    props
      .EditUserApi(body)
      .then(({ message }) => {
        toast.success(message)
        navigate('/user-management')
        setModalOpen(false)
        setIsLoadingBtn(false)
        setIsLoading(false)
      })
      .catch((err) => {
        setModalOpen(false)
        setIsLoadingBtn(false)
        setIsLoading(false)
        setIsEditMode(true)
        toast.error(err.message || err.error)
      })
    // } else {
    //   showValidationMessage(true)
    // }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    const errorMessage = validateInput(name, value)
    setErrors((prev) => ({ ...prev, [name]: errorMessage }))
  }

   const handleSelectChange = (selectedOption, name) => {
      console.log("🔽 Role selected:", selectedOption, "for field:", name);
  
      const errorMessage = validateInput(name, selectedOption?.value);
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
  
      // Also update the values object
      setValues((prev) => ({
        ...prev,
        [name]: selectedOption?.value || "",
      }));
    };

  

  const handleClientRemove = (valueToRemove) => {
    const updatedClientIds = values.ClientIds?.filter(
      (stakeholderId) => stakeholderId !== valueToRemove
    )

    setValues((prevValues) => ({
      ...prevValues,
      ClientIds: updatedClientIds,
    }))
  }
  // if (isLoading) {
  //   return (
  //     <div style={{ textAlign: 'center' }}>
  //       <CircularProgress size={64} />
  //     </div>
  //   )
  // }

  return (
    <>
      {" "}
      <Box>
        <Box sx={{ my: 2, zIndex: 9999 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={6}>
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
                    <TitleCard
                      title={isEditMode ? "Edit User" : "User Detail"}
                    />
                  </HighlightWrap>
                </TitleWrap>
              </BoxWrap>
            </Grid>
            {!isSmallScreen && (
              <Grid item sx={12} md={6}>
                <ButtonContainer
                  onCancel={isEditMode ? handleCancelEdit : handleDeleteClient}
                  onSubmit={isEditMode ? handleSaveEdit : handleEditClick}
                  labelLeft={isEditMode ? "Cancel" : "Delete"}
                  labelRight={isEditMode ? "Save" : "Edit"}
                  iconLeft={isEditMode ? "cancel" : "delete"}
                  iconRight={isEditMode ? "save" : "edit"}
                  size="small"
                  leftVariant="outlined"
                  rightVariant="contained"
                  loading={isLoadingBtn}
                />
              </Grid>
            )}
          </Grid>
        </Box>
        {isLoading ? (
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <CircularProgress size={64} />
          </div>
        ) : (
          <Box sx={{ mt: 2, mb: 20 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} pb={30}>
                <CardWrapper>
                  <Box>
                    <CardTitle>General Information</CardTitle>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={isEditMode ? 12 : 6} sm={6} md={4}>
                      <CardWrap>
                        <SubTitle>Name {isEditMode && <Asterisk />}</SubTitle>
                        {isEditMode ? (
                          <FormControl fullWidth>
                            <NormalInput
                              name="name"
                              placeholder="Enter here"
                              value={values.name}
                              onChange={handleInputChange}
                              type="text"
                            />
                            {errors.name && (
                              <span style={{ color: "red", fontSize: "12px" }}>
                                {errors.name}
                              </span>
                            )}
                          </FormControl>
                        ) : (
                          <Title>{userData?.name || "N/A"}</Title>
                        )}
                      </CardWrap>
                    </Grid>

                    <Grid
                      item
                      xs={isEditMode ? 12 : 6}
                      sm={isEditMode ? 6 : 6}
                      md={4}
                    >
                      <CardWrap>
                        <SubTitle>
                          Mobile number {isEditMode && <Asterisk />}
                        </SubTitle>
                        {isEditMode ? (
                          <FormControl fullWidth>
                            <NormalInput
                              name="phone"
                              placeholder="Enter here"
                              value={values.phone}
                              onChange={handleInputChange}
                              type="text"
                            />
                            {errors.phone && (
                              <span style={{ color: "red", fontSize: "12px" }}>
                                {errors.phone}
                              </span>
                            )}
                          </FormControl>
                        ) : (
                          <Title>{userData?.phone || "N/A"}</Title>
                        )}
                      </CardWrap>
                    </Grid>
                    <Grid
                      item
                      xs={isEditMode ? 12 : "auto"}
                      sm={"auto"}
                      md={"auto"}
                      sx={{
                        minWidth: { xs: "50%", sm: "50%", md: "33.33%" },
                      }}
                    >
                      <CardWrap>
                        <SubTitle>Email {isEditMode && <Asterisk />}</SubTitle>
                        {isEditMode ? (
                          <FormControl fullWidth>
                            <NormalInput
                              name="email"
                              placeholder="Enter here"
                              value={values.email}
                              onChange={handleInputChange}
                              type="text"
                            />
                            {errors.email && (
                              <span style={{ color: "red", fontSize: "12px" }}>
                                {errors.email}
                              </span>
                            )}
                          </FormControl>
                        ) : (
                          <Title>{userData?.email || "N/A"}</Title>
                        )}
                      </CardWrap>
                    </Grid>
                    <Grid
                      item
                      xs={isEditMode ? 12 : "auto"}
                      sm={isEditMode ? 6 : 4}
                      md={4}
                      sx={{
                        minWidth: { xs: "145px" },
                      }}
                    >
                      <CardWrap>
                        <SubTitle>Role {isEditMode && <Asterisk />}</SubTitle>
                        {isEditMode ? (
                          <FormControl fullWidth>
                            <NormalSelect
                              name="role"
                              placeholder="Select here"
                              options={roleOptions}
                              value={values.role}
                              handleChange={(selectedOption) =>
                                handleSelectChange(selectedOption, "role")
                              }
                            />
                            {errors.role && (
                              <span style={{ color: "red", fontSize: "12px" }}>
                                {errors.role}
                              </span>
                            )}
                          </FormControl>
                        ) : (
                          <Title>{userData?.role || "N/A"}</Title>
                        )}
                      </CardWrap>
                    </Grid>
                    
                    {/* <Grid
                      item
                      xs={isEditMode ? 12 : "auto"}
                      sm={"auto"}
                      md={"auto"}
                      sx={{
                        minWidth: { xs: "50%", sm: "50%", md: "33.33%" },
                      }}
                    >
                      <CardWrap>
                        <SubTitle>Location {isEditMode && <Asterisk />}</SubTitle>
                        {isEditMode ? (
                          <FormControl fullWidth>
                            <NormalInput
                              name="email"
                              placeholder="Enter here"
                              value={values.email}
                              onChange={handleInputChange}
                              type="text"
                            />
                            {errors.email && (
                              <span style={{ color: "red", fontSize: "12px" }}>
                                {errors.email}
                              </span>
                            )}
                          </FormControl>
                        ) : (
                          <Title>{userData?.email || "N/A"}</Title>
                        )}
                      </CardWrap>
                    </Grid> */}
                    
                  </Grid>
                  
                </CardWrapper>
              </Grid>
              
            </Grid>
          </Box>
        )}
      </Box>
      <Modal
        handleClose={() => {
          setModalOpen(false);
        }}
        open={modalOpen}
        actions={
          <>
            <CancelButton
              label="Cancel"
              size="medium"
              variant="outlined"
              color="secondary"
              onClick={() => {
                setModalOpen(false);
              }}
            />
            <NormalButton label="Delete" size="medium" onClick={handleDelete} />
          </>
        }
        title="Delete User?"
      >
        <SubContent>Are you sure you want to delete this user?</SubContent>
      </Modal>
      <FixedButtonWrapper>
        {isSmallScreen && (
          <Grid item sx={12} md={4}>
            <ButtonContainer
              onCancel={isEditMode ? handleCancelEdit : handleDeleteClient}
              onSubmit={isEditMode ? handleSaveEdit : handleEditClick}
              labelLeft={isEditMode ? "Cancel" : "Delete"}
              labelRight={isEditMode ? "Save" : "Edit"}
              iconLeft={isEditMode ? "cancel" : "delete"}
              iconRight={isEditMode ? "save" : "edit"}
              size="small"
              leftVariant="outlined"
              rightVariant="contained"
              loading={isLoadingBtn}
            />
          </Grid>
        )}
      </FixedButtonWrapper>
    </>
  );
}
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getbyidApi,
      EditUserApi,
      deleteUserApi,
    },
    dispatch
  )
}

UserManagementDetailsComp.propTypes = {
  getbyidApi: PropTypes.func.isRequired,
  EditUserApi: PropTypes.func.isRequired,
  deleteUserApi: PropTypes.func.isRequired,
}

UserManagementDetailsComp.defaultProps = {}

export const UserManagementDetails = connect(
  null,
  mapDispatchToProps
)(UserManagementDetailsComp)
