import React, { useState, useEffect, useRef } from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
// import Logo from 'assets/svg/dblogo.svg'
import Logo from "assets/svg/FieldPulse.png";

import AddchartIcon from "@mui/icons-material/Addchart";
import { SidebarMenu } from "components/common/Sidebar";

const PrimarySearchAppBar = styled("div")({
  flexGrow: 1,
  paddingTop: "1px",
  paddingBottom: "10px",
  marginLeft: "18px",
  marginRight: "18px",
  backgroundColor: "none",
  boxShadow: "0px 2px 12px 3px #B5E9FF40",
  borderRadius: "16px",
  padding: "0",
  marginTop: "15px",
  ".MuiSvgIcon-root": {
    fill: "#0c0a0a",
  },
  ".MuiPaper-root": {
    marginLeft: "0px",
    marginRight: "0px",
    background: "white",
    borderRadius: "16px",
    boxShadow: "none",
  },
  "@media (max-width: 768px)": {
    marginLeft: "10px",
    marginRight: "10px",
    marginTop: "10px",
  },
});

const StyledToolbar = styled(Toolbar)({
  paddingLeft: "15px",
  paddingRight: "24px",
  minHeight: "75px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  "@media (max-width: 768px)": {
    justifyContent: "center",
    position: "relative",
    padding: "0px 10px",
  },
});

const LogoWrapper = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  left: "50%",
  transform: "translateX(-50%)",
  "@media (min-width: 769px)": {
    justifyContent: "flex-start",
    position: "static",
    transform: "none",
  },
  img: {
    width: "152px",
    height: "auto",
    position: "unset",
    marginTop: "-50px",
    marginBottom: "-32px",
    "@media (max-width: 769px)": {
      width: "115px",
      height: "auto",
      position: "relative",
      left: "-9px",
    },
  },
});

const LogMeetingButton = styled("button")({
  backgroundColor: "#006ADA",
  color: "white",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "20px",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#005bb5",
  },
  "& .MuiSvgIcon-root": {
    marginRight: "8px",
    color: "white",
    fill: "white",
  },
});

const StyledIconButton = styled(IconButton)({
  borderRadius: "6px",
  height: "45px",
  minWidth: "40px",
});

// const StyledGridIconButton = styled(StyledIconButton)({
//   '@media (max-width: 768px)': {
//     display: 'none',
//   },
// })

const SectionDesktop = styled("div")({
  display: "flex",
  gap: "15px",
  alignItems: "center",
  "@media (max-width: 768px)": {
    display: "none",
  },
});

const SectionMobile = styled("div")({
  display: "none",
  "@media (max-width: 768px)": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
});

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef(null);

  const handleLogMeet = () => {
    navigate("/meeting_log/add_meeting/form");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <PrimarySearchAppBar>
      <AppBar position="static">
        <StyledToolbar>
          <SectionMobile>
            <StyledIconButton
              aria-label="menu"
              onClick={toggleSidebar}
              className="hamburger-icon"
            >
              <MenuIcon />
            </StyledIconButton>
            <Box>
              {/* <StyledIconButton aria-label="search">
                <SearchIcon />
              </StyledIconButton>
              <StyledIconButton aria-label="notifications">
                <Badge color="secondary">
                  <NotificationsNoneIcon />
                </Badge>
              </StyledIconButton> */}
            </Box>
          </SectionMobile>
          <LogoWrapper>
            <img src={Logo} alt="Logo" />
          </LogoWrapper>
          <SectionDesktop>
            {/* <StyledIconButton aria-label="search">
              <SearchIcon />
            </StyledIconButton>
            <StyledGridIconButton aria-label="grid">
              <Grid />
            </StyledGridIconButton>
            <StyledIconButton aria-label="notifications">
              <Badge color="secondary">
                <NotificationsNoneIcon />
              </Badge>
            </StyledIconButton>
            <StyledIconButton aria-label="profile">
              <PersonOutlineIcon />
            </StyledIconButton> */}
            <LogMeetingButton onClick={handleLogMeet}>
              <AddchartIcon />
              Create Task
            </LogMeetingButton>
          </SectionDesktop>
        </StyledToolbar>
      </AppBar>
      {isSidebarOpen && (
        <SidebarMenu
          ref={sidebarRef}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
    </PrimarySearchAppBar>
  );
}
