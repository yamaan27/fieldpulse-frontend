import { Box, Grid } from "@mui/material";
import { color } from "services/colors";
import styled from "styled-components";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import React from "react";

import ComingSoon from "assets/coming_soon.svg";
import TitleWrapper from "components/common/TitleWrapper";

const BoxWrapper = styled(Box)`
  border-radius: 15px;
  background: white;
  border: 1px solid ${color.brandColor.primary["900"]};
  min-height: 712px;
`;

const ImageWrap = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 12rem;
  // ${(props) => props.theme.breakpoints.down("sm")} {
  //   padding-top: 0;
  //   img {
  //     height: 121px;
  //   }
  // }
`;

const LiveMapComp = () => {
  return (
    <>
      <Grid item xs={12} style={{ width: "100%" }} pb={0}>
        <TitleWrapper style={{ paddingBottom: "0" }} title="Live Map" />
      </Grid>
      <BoxWrapper>
        <ImageWrap>
          <img src={ComingSoon} alt="ComingSoon" />
        </ImageWrap>
      </BoxWrapper>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch);
};

LiveMapComp.propTypes = {};

LiveMapComp.defaultProps = {};

export const LiveMap = connect(null, mapDispatchToProps)(LiveMapComp);
