import { Box, Grid, useMediaQuery } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { color } from 'services/colors'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ToggleButtonGroup as _ToggleButtonGroup } from '@mui/lab'
import ToggleButton from '@mui/lab/ToggleButton'
import AddchartIcon from '@mui/icons-material/Addchart'

import PropTypes from 'prop-types'

import { useNavigate } from 'react-router-dom'

import { Summary } from './Summary'
import { MonthlyReport } from "./MonthlyReport";
import { SolutionCenter } from './SolutionCenter'


import TitleWrapper from 'components/common/TitleWrapper'
import FooterButton from 'components/common/FooterButton'





const AccountBoxWrapper = styled(Box)`
  background: #fff;
  box-shadow: 0px 2px 12px 3px #b5e9ff40;
  border-radius: 24px;
  gap: 10px;
  padding-bottom: 20px;
  margin-bottom: 20px;

  min-height: 340px;

  display: flex;
  flex-direction: column;
  flex-grow: 1;

  ${(props) => props.theme.breakpoints.down('md')} {
    min-height: auto;
  }

  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 10px;
    margin: 5px;
    padding-bottom: 15px;
    min-height: auto;
  }
`

const ProjectInsightsComp = ({  }) => {
  const navigate = useNavigate();
  const topRef = useRef(null);
  const countsSetRef = useRef(false);
  const [filter, setFilter] = useState("1");
  const [accountData, setAccountData] = useState([]);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [countsLoaded, setCountsLoaded] = useState(false);
  const [counts, setCounts] = useState({
    overallGovernanceCount: 0,
    governanceCount: 0,
    overallAgOpportunityCount: 0,
    agOpportunityCount: 0,
    escalationCount: 0,
    overallEscalationCount: 0,
    xplusRecommendationCount: 0,
    overallXplusRecommendationCount: 0,
  });

  const isSmallScreen = useMediaQuery("(max-width:700px)");
 
  const handleFilters = (event) => {
    setFilter(event.target.value);
  };

  const handleLogMeet = () => {
    navigate("/meeting_log/add_meeting/form");
  };

  // useEffect(() => {
  //   if (topRef.current) {
  //     topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  //     window.scrollTo(0, 0)
  //   }
  // }, [page])

  useEffect(() => {
    setPage(1);
  }, [filter]);

  return (
    <>
      <Grid item xs={12} style={{ width: "100%" }} pb={0}>
        <TitleWrapper
          style={{ paddingBottom: "0" }}
          title="Project Insights"
          filter={filter}
        />
      </Grid>

      {/* <Box pb={30}> */}
      <Grid container pb={20} spacing={2} sx={{ alignItems: "stretch" }}>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          ref={topRef}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <AccountBoxWrapper>
            <Summary
              // selectedFilter={filter}
              // setCounts={setCounts}
              // topRef={topRef}
              style={{ flexGrow: 1 }}
              selectedFilter={filter}
              accountData={accountData}
              count={count}
              setCounts={setCounts}
              topRef={topRef}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
            />
          </AccountBoxWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={6}
          ref={topRef}
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <AccountBoxWrapper>
            <MonthlyReport
              // selectedFilter={filter}
              // setCounts={setCounts}
              // topRef={topRef}
              style={{ flexGrow: 1 }}
              selectedFilter={filter}
              accountData={accountData}
              count={count}
              setCounts={setCounts}
              topRef={topRef}
              page={page}
              setPage={setPage}
              isLoading={isLoading}
            />
          </AccountBoxWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          sx={{ display: "flex", flexDirection: "column" }}
          pb={isSmallScreen && 30}
        >
          <SolutionCenter
            style={{ flexGrow: 1 }}
            accountData={accountData}
            isLoading={countsLoaded ? false : isLoading}
            overallGovernance={counts.overallGovernanceCount}
            overallAgOpportunity={counts.overallAgOpportunityCount}
            overallEscalation={counts.overallEscalationCount}
            overallXplus={counts.overallXplusRecommendationCount}
          />
        </Grid>
      </Grid>
      {/* </Box> */}

      <Grid item xs={12} sm={12} md={12} lg={5}>
        <FooterButton
          icon={AddchartIcon}
          label="Log Meeting"
          onClick={handleLogMeet}
        />
      </Grid>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({  }, dispatch);
}

ProjectInsightsComp.propTypes = {

};

ProjectInsightsComp.defaultProps = {}

export const ProjectInsights = connect(
  null,
  mapDispatchToProps
)(ProjectInsightsComp)
