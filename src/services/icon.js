import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Icon = ({
  iconName,
  iconColor,
  fontSize = "20px",
  cursor,
  className,
  onClick,
  padding,
}) => {
  return (
    <Typography
      component="span"
      className={className}
      style={{
        fontSize,
        cursor,
        color: `${iconColor ? iconColor : "primary"}`,
        fontWeight: 500,
        padding: padding,
      }}
      onClick={onClick}
    >
      {iconName ? iconName : ""}
    </Typography>
  );
};
export default Icon;

Icon.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  fontSize: PropTypes.string,
  padding: PropTypes.string,
  cursor: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
};
Icon.defaultProps = {
  iconName: "",
  iconColor: "",
  fontSize: "",
  padding: "",
  cursor: "pointer",
  className: "material-icons md-36",
  onClick: null,
};
