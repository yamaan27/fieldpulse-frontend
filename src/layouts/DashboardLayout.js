import React from "react";
import { Outlet } from "react-router-dom";
import Header from "components/common/Header";
import { SidebarMenu } from "components/common/Sidebar";
import styled from "styled-components";

// Styled components
const LayoutContainer = styled.div`
  background: #f7faff;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1100;
`;

const MainArea = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  flex-shrink: 0;
  // height: 100vh;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    width: ${(props) => (props.isSidebarOpen ? "100%" : "0")};
    z-index: 1200;
    background: #fff;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);

    &.active {
      transform: translateX(0);
    }
  }
`;

const ContentWrapper = styled.main`
  flex-grow: 1;
  padding-right: 25px;
  padding-top: 15px;
  height: calc(100vh - 64px);
  overflow-y: auto;

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

  @media (max-width: 768px) {
    padding-right: 15px;
    padding-left: 15px;
    width: 100%;
  }
`;

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutContainer>
      <HeaderWrapper>
        <Header onMenuClick={toggleSidebar} />
      </HeaderWrapper>
      <MainArea>
        <SidebarWrapper className={isSidebarOpen ? "active" : ""}>
          <SidebarMenu />
        </SidebarWrapper>
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
      </MainArea>
    </LayoutContainer>
  );
};

export default DashboardLayout;
