import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'

import PropTypes from 'prop-types'
import Select from 'react-select';


import {
  Box,
  Grid,
  Typography,
  FormControl,
  CircularProgress,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import styled from 'styled-components'

import { color } from 'services/colors'
import Icon from 'services/icon'
import { getUserRole } from 'utils/authUtils'
import { validateInput } from 'services/helpers/constants/admin/userManagement'

import { NormalSelect, TitleCard, ButtonContainer } from 'components/common'
import { NormalInput } from 'components/common/NormalInput'

// import {
//   getSCApi,
//   getBUApi,
//   getClientNameSCApi,
//   getClientNameBUApi,
//   getRoleApi,
// } from 'action/DropDown/DropDownAct'
import { createUserApi } from 'action/UserManagement/UserManagementAct'
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
  padding-bottom: 5px;
`
const SubTitle = styled(Typography).attrs({ variant: 'body2' })`
  padding-bottom: 5px;
  color: ${color.brandColor.primary['400']};
  font-weight: 500;
  font-size: 12px;
`
const TitleWrap = styled(Box)`
  display: flex;
  flex-direction: column;
`

const Title = styled(Typography).attrs({ variant: 'body1' })`
  color: ${color.brandColor.primary['200']};
  font-weight: 700;
  font-size: 16px;
  margin-top: 8px;
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

const TextWrap = styled(Typography).attrs({ variant: 'caption' })`
  background: ${(props) => props.bgColor || '#eef9f9'};
  color: ${(props) => props.textColor || '#27ae60'};
  padding: 10px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  display: flex;
  gap: 10px;
  align-items: center;
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

const UserManagementFormComp = (props) => {
  const theme = useTheme()
  const [values, setValues] = useState({})
  const [scOptions, setSCOptions] = useState([])
  const [solutionCenter, setSolutionCenter] = useState({ name: '', _id: '' })
  const [businessUnit, setBusinessUnit] = useState({ name: '', _id: '' })
  const [selectedSolutionCenterId, setSelectedSolutionCenterId] = useState(null)
  const [selectedBusinessUnitId, setSelectedBusinessUnitId] = useState(null)
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'))
  console.log("📦 values:", values);

  const [buOptions, setBUOptions] = useState([])
  const [PMOptions, setPMOptions] = useState([])
  const [roleOptions, setRoleOptions] = useState([
    { label: "Admin", value: "admin" },
    { label: "Agent", value: "agent" },
    { label: "Manager", value: "manager" },
    { label: "Viewer", value: "viewer" },
  ]);
  const [userRole, setUserRole] = useState(null)
  const [errors, setErrors] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleBackClick = () => {
    navigate('/user-management')
  }

  useEffect(() => {
    const role = getUserRole()
    setUserRole(role)
  }, [])




  

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })

    const errorMessage = validateInput(name, value)
    setErrors((prev) => ({ ...prev, [name]: errorMessage }))
  }
  // const handleSelectChange = (selectedOption, name) => {
    

  //   const errorMessage = validateInput(name, selectedOption?.value)
  //   setErrors((prev) => ({ ...prev, [name]: errorMessage }))
  // }
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
  const handleSubmit = () => {
    setErrors({})

    const requiredFields = ['name', 'email','password', 'phone','location', 'role']
    
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

      toast.error('Please enter all mandatory fields')
      return
    }

    // if (validator.allValid()) {
    setIsLoading(true)
    let body = values
    props
      .createUserApi(body)
      .then((res) => {
        toast.success(res.message);
        console.log("✅ User created successfully:", res.message);
        setIsLoading(false);
        console.log("✅ Navigation triggered");
        navigate("/user-management");
      })
      .catch((err) => {
        toast.error(err.message || err.error);
        setIsLoading(false);
      });
    // } else {
    //   showValidationMessage(true)
    // }
  }

  return (
    <>
      {" "}
      <Box>
        <Box sx={{ my: 2 }}>
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
                    <TitleCard title="Add New User" />
                  </HighlightWrap>
                </TitleWrap>
              </BoxWrap>
            </Grid>
            {!isSmallScreen && (
              <Grid item sx={12} md={6}>
                <ButtonContainer
                  onSubmit={handleSubmit}
                  onCancel={handleBackClick}
                  labelLeft="Cancel"
                  labelRight="Save"
                  iconLeft="cancel"
                  iconRight="save"
                  size="small"
                  leftVariant="outlined"
                  rightVariant="contained"
                  loading={isLoading}
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
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} pb={30}>
                <CardWrapper>
                  <Box>
                    <CardTitle>General Information</CardTitle>
                  </Box>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <CardWrap>
                        <SubTitle>
                          Name <Asterisk />
                        </SubTitle>
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
                      </CardWrap>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CardWrap>
                        <SubTitle>
                          Email <Asterisk />
                        </SubTitle>
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
                      </CardWrap>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CardWrap>
                        <SubTitle>
                          Password <Asterisk />
                        </SubTitle>
                        <FormControl fullWidth>
                          <NormalInput
                            name="password"
                            placeholder="Enter here"
                            value={values.password}
                            onChange={handleInputChange}
                            type="text"
                          />
                          {errors.password && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.password}
                            </span>
                          )}
                        </FormControl>
                      </CardWrap>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CardWrap>
                        <SubTitle>
                          Mobile Number <Asterisk />
                        </SubTitle>
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
                      </CardWrap>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CardWrap>
                        <SubTitle>
                          Location <Asterisk />
                        </SubTitle>
                        <FormControl fullWidth>
                          <NormalInput
                            name="location"
                            placeholder="Enter here"
                            value={values.location}
                            onChange={handleInputChange}
                            type="text"
                          />
                          {errors.location && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.location}
                            </span>
                          )}
                        </FormControl>
                      </CardWrap>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <CardWrap>
                        <SubTitle>
                          Role <Asterisk />
                        </SubTitle>
                        <FormControl fullWidth>
                          <NormalSelect
                            name="role"
                            placeholder="Select here"
                            options={roleOptions}
                            value={values.role}
                            // value={
                            //   roleOptions.find(
                            //     (opt) => opt.value === values.role
                            //   ) || null
                            // }
                            handleChange={(selectedOption) =>
                              handleSelectChange(selectedOption, "role")
                            }
                          />
                          {/* <Select
                            options={[
                              { label: "Admin", value: "admin" },
                              { label: "Agent", value: "agent" },
                              { label: "Manager", value: "manager" },
                              { label: "Viewer", value: "viewer" },
                            ]}
                            placeholder="Select role"
                            onChange={(selectedOption) => {
                              console.log("✅ Selected:", selectedOption);
                            }}
                          /> */}
                          {errors.role && (
                            <span style={{ color: "red", fontSize: "12px" }}>
                              {errors.role}
                            </span>
                          )}
                        </FormControl>
                      </CardWrap>
                    </Grid>
                  </Grid>
                </CardWrapper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
      <FixedButtonWrapper>
        {isSmallScreen && (
          <Grid item sx={12} md={4}>
            <ButtonContainer
              onSubmit={handleSubmit}
              onCancel={handleBackClick}
              labelLeft="Cancel"
              labelRight="Save"
              iconLeft="cancel"
              iconRight="save"
              size="small"
              leftVariant="outlined"
              rightVariant="contained"
              loading={isLoading}
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
      // getSCApi,
      // getBUApi,
      createUserApi,
      // getClientNameSCApi,
      // getClientNameBUApi,
      // getRoleApi,
    },
    dispatch
  )
}

UserManagementFormComp.propTypes = {
  // getSCApi: PropTypes.func.isRequired,
  // getBUApi: PropTypes.func.isRequired,
  createUserApi: PropTypes.func.isRequired,
  // getClientNameSCApi: PropTypes.func.isRequired,
  // getClientNameBUApi: PropTypes.func.isRequired,
  // getRoleApi: PropTypes.func.isRequired,
}

UserManagementFormComp.defaultProps = {}

export const UserManagementForm = connect(
  null,
  mapDispatchToProps
)(UserManagementFormComp)
