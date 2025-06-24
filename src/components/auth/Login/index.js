import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { toast } from 'react-toastify'
import styled from 'styled-components'

import Cookies from 'js-cookie'

import PropTypes from 'prop-types'
import { Formik, Form, ErrorMessage } from 'formik'
import { loginSchema } from 'services/validation/authSchema'
import loginCompSvg from 'assets/svg/login_comp.svg'
import FieldPulse from "assets/svg/FieldPulse.png";

import { loginApi } from 'action/AuthAct'

import { NormalInput } from 'components/common/NormalInput'
import { Checkbox } from 'components/common/CheckBox'

import { Box, Button, Link, Typography, CircularProgress } from '@mui/material'

const Root = styled(Box)`
  height: 100vh;
  width: 100%;
  background-size: cover;
  background: #eef7fb;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;

  @media (max-width: 768px) {
    background-color: #fff;
    background-image: none;
  }
`;

const OuterContainer = styled(Box)`
  width: 80%;
  height: fit-content;
  align-content: center;
  position: relative;
  gap: 100px;

  display: flex;
  flex-direction: row;

  @media (max-width: 1024px) {
    flex-direction: row;
    gap: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    gap: 30px;
  }
`

const LeftPane = styled(Box)`
  flex: 0.4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px 50px;
  background-color: #fff;
  box-shadow: 0px 2px 12px 3px #b5e9ff40;
  border-radius: 15px;
  box-sizing: border-box;
  overflow: auto;

  scrollbar-width: thin;
  scrollbar-color: #555555 transparent;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #b5e9ff40;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media (max-width: 1024px) {
    padding: 20px 30px;
    flex: 0.5;
  }

  @media (max-width: 768px) {
    flex: 1;
    box-shadow: none;
    width: 100%;
    padding: 20px;
  }

  @media (max-width: 480px) {
    padding: 10px;
    flex: 1;
  }
`

const RightPane = styled(Box)`
  flex: 0.6;
  background-image: url(${loginCompSvg});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1024px) {
    flex: 0.5;
  }

  @media (max-width: 768px) {
    display: none;
  }
`

const StyledTextField = styled(NormalInput)`
  margin: 20px 0;
  background-color: #fff;
  width: 100%;
  @media (max-width: 1024px) {
    width: 90% !important;
    font-size: 10px !important;
  }
`

const StyledButton = styled(Button)`
  width: 100%;
  font-size: 16px;
  height: 48px;
  border-radius: 8px;
  padding: 8px 10px;
  text-transform: none;
  font-weight: 600;
  line-height: 20px;
  text-align: left;
  margin-top: 20px;

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 6px 8px;
  }
`

const Logo = styled.img`
  width: 180px;
  align-self: center;
  margin-top: -28px;
  margin-bottom: -20px;

  @media (max-width: 1024px) {
    width: 180px;
  }

  @media (max-width: 480px) {
    width: 180px;
  }
`;

const CheckboxContainer = styled(Box)`
  display: flex;
  align-items: center;
  margin: 25px 0;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
  }
`

const ForgotPasswordLink = styled(Link)`
  text-align: right;
  width: 100%;
  font-size: 14px;
  font-weight: 600 !important;
  line-height: 20px !important;
  color: #324559 !important;
  text-decoration: none !important;

  @media (max-width: 1024px) {
    font-size: 12px !important;
  }

  @media (min-width: 769px) {
  }

  @media (max-width: 768px) {
    margin-top: 10px;
    text-align: center;
  }

  @media (max-width: 480px) {
    text-align: center;
  }
`;

const LoginText = styled(Typography)`
  color: #0c2c5e;
  align-self: flex-start;
  font-size: 34px;
  font-weight: 300;
  text-align: center;

  @media (max-width: 1024px) {
    font-size: 20px !important;
    color: #0c2c5e;
  }

  @media (max-width: 768px) {
    font-size: 24px !important;
    color: #0c2c5e;
    align-self: center;
    font-family: 'Lato', sans-serif;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    text-align: center;
  }

  @media (max-width: 480px) {
    font-size: 24px !important;
  }
`

const FormContainer = styled(Box)`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-top: 20px;

  @media (max-width: 1024px) {
    font-size: 10px;
  }

  @media (max-width: 768px) {
    margin-top: 10px;
  }
`

const MobileForgotPassword = styled(ForgotPasswordLink)`
  @media (min-width: 769px) {
    display: none;
  }
`

const DesktopForgotPassword = styled(ForgotPasswordLink)`
  cursor: pointer;
  @media (max-width: 768px) {
    display: none;
  }
`
const StyledErrorMessage = styled.div`
  color: red;
  font-size: 12px;
  margin: 5px 0;
`

const LoginComp = ({ loginApi }) => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [credentials, setCredentials] = React.useState({
    email: '',
    password: '',
    rememberMe: false,
  })

  // const initialState = {
  //   email: '',
  //   password: '',
  //   rememberMe: false,
  // }

  // const initialState = {
  //   email: credentials.email || '',
  //   password: credentials.password || '',
  //   rememberMe: credentials.rememberMe || false,
  // }

  // React.useEffect(() => {
  //   const rememberedUser = localStorage.getItem('rememberedUser')
  //   if (rememberedUser) {
  //     const parsedCredentials = JSON.parse(rememberedUser)
  //     setCredentials({
  //       ...parsedCredentials,
  //       rememberMe: true,
  //     })
  //   }
  // }, [])

  React.useEffect(() => {
    const rememberedUser = Cookies.get('rememberedUser')

    if (rememberedUser) {
      const parsedCredentials = JSON.parse(rememberedUser)

      if (
        parsedCredentials?.email?.trim() &&
        parsedCredentials?.password?.trim()
      ) {
        setCredentials({
          ...parsedCredentials,
          rememberMe: true,
        })
      }
    }
  }, [])

  const handleSubmit = (values, { setSubmitting }) => {
    setIsLoading(true);
    const { rememberMe, ...body } = values;
    // if (rememberMe) {
    //   localStorage.setItem('rememberedUser', JSON.stringify(body))
    // }
    if (rememberMe) {
      Cookies.set("rememberedUser", JSON.stringify(body), {
        expires: 30,
        // secure: true,
      });
    } else {
      Cookies.remove("rememberedUser");
    }
    loginApi(body)
      .then(({ message }) => {
        toast.success(message);
        navigate("/dashboard");
        setIsLoading(false);
      })
      .catch(({ message }) => {
        toast.error(message);
        setSubmitting(false);
        setIsLoading(false);
      });
  };

  // const handleSubmit = (values, { setSubmitting }) => {
  //   setIsLoading(true);
  //   const { rememberMe, ...body } = values;

  //   if (rememberMe) {
  //     Cookies.set("rememberedUser", JSON.stringify(body), {
  //       expires: 30,
  //     });
  //   } else {
  //     Cookies.remove("rememberedUser");
  //   }

  //   console.log("📡 Sending login API request with body:", body);

  //   loginApi(body)() // ⬅️ Important: call the returned function
  //     .then(({ message, user }) => {
  //       console.log("✅ Login successful:", user);
  //       toast.success(message);

  //       // ⬇️ Redirect to dashboard after successful login
  //       navigate("/dashboard");

  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("❌ Login error:", error.message);
  //       toast.error(error.message || "Login failed");
  //       setSubmitting(false);
  //       setIsLoading(false);
  //     });
  // };
  

  const handleForgotPassword = () => {
    navigate('/forgot-password')
  }

  // const handleCheckboxChange = (e) => {
  //   console.log('Checkbox Change Triggered - Event:', e.target)
  //   setCredentials({
  //     ...credentials,
  //     [e.target.name]: e.target.checked,
  //   })
  //   console.log('Updated Credentials after Checkbox Change:', {
  //     ...credentials,
  //     [e.target.name]: e.target.checked,
  //   })
  // }

  const handleCheckboxChange = (e, values) => {
    setCredentials((prevState) => {
      const updatedCredentials = {
        ...prevState,
        [e.target.name]: e.target.checked,
        email: values.email || prevState.email,
        password: values.password || prevState.password,
      }

      return updatedCredentials
    })
  }

  return (
    <Root>
      <OuterContainer>
        <LeftPane>
          <Logo src={FieldPulse} alt="DB Logo" />
          <LoginText>Login</LoginText>
          <Formik
            initialValues={credentials}
            validationSchema={loginSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
            {({
              // errors,
              // touched,
              handleChange,
              handleBlur,
              values,
              isSubmitting,
            }) => (
              <Form style={{ width: "100%" }}>
                <FormContainer>
                  <StyledTextField
                    name="email"
                    titleLabel="Email"
                    placeholder="Please enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    style={{ marginBottom: "20px !important" }}
                  />
                  <ErrorMessage name="email" component={StyledErrorMessage} />

                  <StyledTextField
                    name="password"
                    titleLabel="Password"
                    placeholder="Please enter your password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="password"
                  />
                  <ErrorMessage
                    name="password"
                    component={StyledErrorMessage}
                  />

                  <CheckboxContainer>
                    <Checkbox
                      name="rememberMe"
                      label="Remember me"
                      checked={values.rememberMe}
                      onChange={(e) => {
                        handleChange(e);
                        handleCheckboxChange(e, values);
                      }}
                    />
                    <DesktopForgotPassword onClick={handleForgotPassword}>
                      Forgot Password?
                    </DesktopForgotPassword>
                  </CheckboxContainer>

                  <StyledButton
                    type="submit"
                    variant="contained"
                    color="primary"
                    // endIcon={<ArrowForwardIcon />}
                    disabled={isSubmitting}
                    // onClick={() => navigate('/dashboard')}
                    startIcon={
                      isLoading ? <CircularProgress size={18} /> : null
                    }
                  >
                    Login
                  </StyledButton>

                  <MobileForgotPassword
                    onClick={() => navigate("/forgot-password")}
                  >
                    Forgot Password?
                  </MobileForgotPassword>
                </FormContainer>
              </Form>
            )}
          </Formik>
        </LeftPane>
        <RightPane />
      </OuterContainer>
    </Root>
  );
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ loginApi }, dispatch)
}

LoginComp.propTypes = { loginApi: PropTypes.func.isRequired }

LoginComp.defaultProps = {}

export const Login = connect(null, mapDispatchToProps)(LoginComp)
