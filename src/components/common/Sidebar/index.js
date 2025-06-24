import React, { useState, useEffect } from 'react'
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PropTypes from 'prop-types'

import { CircularProgress, useMediaQuery } from '@mui/material'

import { clearUserRole, getUserData } from 'utils/authUtils'

import { useNavLinks } from 'helpers/Constants'

// import { getbyidApi } from 'action/UserManagement/UserManagementAct'

import styled, { css } from 'styled-components'
import Logo from 'assets/svg/dblogo.svg'

const SidebarContainer = styled.div`
  position: relative;
  z-index: 1000;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;

  .ps-sidebar-root {
    min-height: 100vh !important;
    position: fixed !important;
    border: none !important;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 1024px) {
      margin: 15px;
    }
    @media (max-width: 1024px) {
      margin: 15px;
    }

    @media (max-width: 768px) {
      margin: 0;
    }
  }

  .ps-sidebar-container {
    background-color: white !important;
    box-shadow: 0px 2px 12px 3px #b5e9ff40;

    @media (min-width: 1024px) {
      border-radius: 24px;
      max-width: 89%;
    }
    @media (max-width: 1024px) {
      border-radius: 24px;
      max-width: 89%;
    }

    @media (max-width: 768px) {
      border-radius: 0;
      max-width: 100%;
    }
  }

  .ps-menu-label {
    font-weight: 500;
    color: #4c4c4c;
  }

  .ps-menuitem-root {
    position: relative;
    color: #4c4c4c;

    .ps-menu-button {
      padding-left: 14px;
    }

    .ps-menu-icon {
      padding-left: 13px;
      border-radius: 16px !important;
      margin: 0;
      font-weight: 600;
      padding: 0px !important;

      ${({ active }) =>
        active
          ? css`
              filter: none;
              color: white;
            `
          : css`
              color: #006ada;
            `}
    }

    &:hover {
      color: #4c4c4c !important;
    }

    &.ps-active {
      background-color: #006ada !important;
      color: #ffffff !important;
      font-weight: 700 !important;
      position: relative;

      .ps-menu-button {
        &:hover {
          background-color: #006ada !important;
        }
      }

      .ps-menu-label {
        color: #ffffff !important;
        font-weight: 700 !important;
      }
      &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 10px;
        width: 6px;
        height: 100%;
        background-color: white;
      }
      &:hover {
        background-color: #006ada !important;
      }
    }
  }

  .logout-item {
    color: #eb5757 !important;
    .ps-menu-label {
      color: #eb5757 !important;
    }

    .ps-menu-icon {
      color: #eb5757 !important;
    }
  }

  .sidebar-content {
    display: flex;
    flex-direction: column;
    flex-grow: 1; /* Allow this container to grow and fill available space */
    position: relative;
    overflow-y: auto;

    @media (min-width: 1024px) {
      height: 75vh; /* Take full viewport height for larger screens */
    }
    @media (max-width: 1024px) {
      height: 75vh; /* Take full viewport height for smaller screens as well */
      overflow-y: auto;
    }

    @media (max-width: 768px) {
      height: 100vh; /* Take full device height on mobile */
      overflow-y: auto;
      padding-bottom: 120px;
    }
    @media (min-width: 768px) {
      margin-top: 30px;
      overflow-y: auto;
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    width: ${(props) => (props.isSidebarOpen ? '100%' : '0')};
    height: ${(props) => (props.isSidebarOpen ? '100%' : '0')};
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(2px);
    z-index: 1200 !important;
    display: ${(props) => (props.isSidebarOpen ? 'block' : 'none')};
    top: 0;
    left: 0;
    transform: ${(props) =>
      props.isSidebarOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
  }
`
const LogoWrapper = styled('div')({
  textAlign: 'center',
  padding: '20px 0px',
  minHeight: '92px',
  '@media (min-width: 768px)': {
    display: 'none',
  },
})

function SidebarMenuComp({
  isSidebarOpen,
  // getbyidApi,
  setIsSidebarOpen = () => {},
}) {
  const location = useLocation()
  const navigate = useNavigate()
  const { navLinks } = useNavLinks()
  const [userId, setUserId] = useState(null)
  // const [isLoading, setIsLoading] = useState(false)
  const isSmallScreen = useMediaQuery('(max-width:770px)')

  const [permissions, setPermissions] = useState([])

  useEffect(() => {
    const role = getUserData()
    setUserId(role)
  }, [])

  const handleLogout = () => {
    // logout()
    clearUserRole()

    localStorage.clear()
    navigate('/login')
  }

  useEffect(() => {
    if (userId) {
      getUserbyId()
    }
  }, [userId])

  // const getUserbyId = () => {
  //   setIsLoading(true)
  //   let query = {
  //     id: userId,
  //   }

  //   // getbyidApi(query)
  //   //   .then((response) => {
  //   //     setPermissions(response?.role?.permissions?.pages)
  //   //     setIsLoading(false)
  //   //   })
  //   //   .catch(({ error }) => {
  //   //     console.log('error', error)
  //   //     setIsLoading(false)
  //   //   })
  // }

  // const filteredNavLinks = navLinks.filter((navLink) => {
  //   const permission = permissions.find((p) => p.key === navLink.privilegesName)
  //   return permission && permission.allow
  // })

  const filteredNavLinks = navLinks.filter((navLink) => {
    // Include "Logout" only on smaller screens
    if (navLink.label === 'Logout' && isSmallScreen) {
      return isSmallScreen
    }
    const permission = permissions.find((p) => p.key === navLink.privilegesName)
    return permission && permission.allow
  })

  // if (isLoading) {
  //   return (
  //     <div style={{ textAlign: 'center' }}>
  //       <CircularProgress size={64} />
  //     </div>
  //   )
  // }

  return (
    <>
      <SidebarContainer
        isSidebarOpen={isSidebarOpen}
        onClick={() => setIsSidebarOpen(false)}
      >
        <Sidebar collapsed={false}>
          <div className="sidebar-content">
            {/* {isLoading ? (
              <div style={{ textAlign: 'center', paddingTop: '20px' }}>
                <CircularProgress size={64} />
              </div>
            ) : ( */}
            <>
              <LogoWrapper>
                <img
                  src={Logo}
                  alt="Logo"
                  style={{
                    width: "150px",
                    height: "auto",
                    imageRendering: "crisp-edges",
                  }}
                />
              </LogoWrapper>
              <Menu>
                {navLinks
                  // .filter(({ label }) => label !== 'Logout')
                  .map(({ to, label, iconName, disable }, index) => {
                    const isActive = location.pathname.startsWith(to);
                    const iconColor = disable
                      ? "#C4C4C4"
                      : isActive
                        ? "white"
                        : "#006ada";
                    const fontColor = disable ? "#C4C4C4" : "#4c4c4c";
                    return (
                      <MenuItem
                        icon={
                          <img
                            src={iconName}
                            alt={label}
                            style={{
                              filter: isActive
                                ? "brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(0%) hue-rotate(156deg) brightness(103%) contrast(104%)"
                                : "",
                              color: iconColor,
                            }}
                          />
                        }
                        key={index}
                        component={
                          disable ? (
                            "div"
                          ) : (
                            <Link to={to || location.pathname} />
                          )
                        }
                        active={!disable && isActive}
                        // className="ps-menuitem-root"
                        className={`ps-menuitem-root ${label === "Logout" ? "logout-item" : ""}`}
                        disable={disable}
                        style={{
                          color: fontColor,
                          pointerEvents: disable ? "none" : "auto",
                        }}
                        onClick={label === "Logout" ? handleLogout : undefined}
                      >
                        <span
                          style={{
                            color: fontColor,
                          }}
                          className="ps-menu-label"
                        >
                          {label}
                        </span>
                      </MenuItem>
                    );
                  })}
              </Menu>
            </>
            {/* )} */}
          </div>
          {!isSmallScreen && (
            <Menu>
              <MenuItem
                icon={
                  <img
                    src={
                      navLinks.find(({ label }) => label === "Logout").iconName
                    }
                    alt="Logout"
                    width={20}
                  />
                }
                component={<Link to="/login" />}
                className="logout-item"
                onClick={handleLogout}
              >
                Logout
              </MenuItem>
            </Menu>
          )}
        </Sidebar>
      </SidebarContainer>
    </>
  );
}

SidebarMenuComp.propTypes = {
  isSidebarOpen: PropTypes.bool,
  setIsSidebarOpen: PropTypes.func,
  // getbyidApi: PropTypes.func.isRequired,
}

// export default SidebarMenu

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      // getbyidApi,
    },
    dispatch
  )
}
export const SidebarMenu = connect(null, mapDispatchToProps)(SidebarMenuComp)
