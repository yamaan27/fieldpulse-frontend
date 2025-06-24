import PropTypes from "prop-types";
import Select, { components } from "react-select";
import React, { useState } from "react";
import Icon from "services/icon";
import { Box, Typography } from "@mui/material";
import styled from "styled-components";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const { ValueContainer, Placeholder } = components;

// const CustomValueContainer = ({ children, ...props }) => {
//   return (
//     <ValueContainer {...props}>
//       <Placeholder {...props} isFocused={props.isFocused}>
//         {props.selectProps.placeholder}
//       </Placeholder>
//       {React.Children.map(children, (child) =>
//         child && child.type !== Placeholder ? child : null
//       )}
//     </ValueContainer>
//   )
// }

const CustomValueContainer = ({ children, ...props }) => {
  // Check if the input has value or is focused to control placeholder visibility
  const hasInputValue =
    props.selectProps.inputValue || props.hasValue || props.isFocused;

  return (
    <ValueContainer {...props}>
      {!hasInputValue && (
        <Placeholder {...props}>{props.selectProps.placeholder}</Placeholder>
      )}
      {React.Children.map(children, (child) =>
        child && child.type !== Placeholder ? child : null
      )}
    </ValueContainer>
  );
};

const CustomDropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ArrowDropDownIcon sx={{ color: "black" }} />
    </components.DropdownIndicator>
  );
};

const IconWrapper = styled(Typography).attrs({ variant: "caption" })`
  position: absolute;
  top: 50%;
  right: 46px;
  transform: translateY(-50%);
  z-index: 9;
  display: flex;
  align-items: center;
`;

export const NormalSelect = ({
  options = [],
  placeholder,
  value,
  handleChange,
  error,
  // isLocation,
  disabled,
  // isCustomStyle,
  handleInputChange,
  isCustomMenuHeight,
  isHeight,
  isMulti,
  setMenuOpenState,
  ...props
}) => {
  const [isDropdownFocused, setIsDropdownFocused] = useState(false);


  const isValidValue = (val) => {
    if (!val) return false;
    if (typeof val === "string") {
      const trimmed = val.trim().toLowerCase();
      return (
        trimmed !== "" &&
        trimmed !== "undefined" &&
        trimmed !== "undefined, undefined" &&
        trimmed !== "undefined, undefined, undefined, undefined" &&
        trimmed !== "null"
      );
    }
    if (typeof val === "object") {
      return !!(val.label || val.value);
    }
    return false;
  };
  
  let resolvedValue;

  if (isMulti) {
    resolvedValue = [];
  } else if (!options || options.length === 0) {
    if (isValidValue(value)) {
      resolvedValue =
        typeof value === "string"
          ? { label: value, value }
          : { label: value.label || value.value || "", value };
    } else {
      resolvedValue = null; // show placeholder
    }
  } else {
    resolvedValue =
      options.find(
        (option) => option.value === value || option.label === value
      ) || null;
  }
  
  



  return (
    <Box sx={{ position: "relative" }}>
      {isDropdownFocused ? (
        <IconWrapper>
          <Icon iconName="search" iconColor="#808080" />
        </IconWrapper>
      ) : (
        ""
      )}
      <div style={{ display: "none" }}>
        <input
          type="text"
          name="prevent_autofill"
          id="prevent_autofill"
          value=""
          readOnly
        />
      </div>
      <Select
        inputProps={{ autoComplete: "new-password" }}
        onMenuOpen={() => {
          setIsDropdownFocused(true);
          setMenuOpenState(true);
        }}
        onMenuClose={() => {
          setIsDropdownFocused(false);
          setMenuOpenState(false);
        }}
        onInputChange={handleInputChange}
        isDisabled={disabled}
        // value={options.find((option) => option.value === value)}
        isMulti={isMulti}
        // value={isMulti ? [] : options.find((option) => option.value === value)}
        // value={
        //   isMulti
        //     ? []
        //     : options.find(
        //         (option) => option.value === value || option.label === value
        //       ) || null
        // }
        value={resolvedValue}
        // value={
        //   isMulti
        //     ? []
        //     : options.find((option) => {
        //         const optVal = option.value;
        //         const val = value;

        //         console.log("[Matching]", optVal, "vs", val);

        //         return (
        //           (optVal?.city === val?.city &&
        //             optVal?.pincode === val?.pincode) ||
        //           optVal === val ||
        //           option.label === val
        //         );
        //       }) || {
        //         label:
        //           typeof value === "string"
        //             ? value
        //             : `${value?.city || ""}${value?.city ? ", " : ""}${value?.country || ""} ${value?.pincode || ""}`,
        //         value: value,
        //       }
        // }
        {...props}
        error={error}
        options={options}
        components={{
          ValueContainer: CustomValueContainer,
          IndicatorSeparator: () => null,
          DropdownIndicator: CustomDropdownIndicator,
        }}
        placeholder={placeholder}
        styles={{
          menu: (base) => ({ ...base, zIndex: 9999 }),
          control: (provided, state) => ({
            ...provided,
            height: "48px",
            border: error && "1px solid #eb5757",
            backgroundColor: "#e8edf1",
            // borderColor: '#e8edf1',
            // borderRadius: '8px',
            borderColor: state.isFocused ? "#868686 !important" : "#e8edf1",
            boxShadow: state.isFocused ? "0 0 0 1px hsl(0, 0%, 50%)" : "none",
            borderRadius: "8px",
            "&:hover": {
              borderColor: "#868686 !important",
            },
          }),
          container: (provided) => ({
            ...provided,
            marginTop: 1,
          }),
          valueContainer: (provided) => ({
            ...provided,
            overflow: "visible",
          }),
          placeholder: (provided, state) => ({
            ...provided,
            visibility: state.hasValue ? "hidden" : "visible",
            transition: "none",
          }),
          menuList: (base) => ({
            ...base,
            height: (isCustomMenuHeight && "120px") || (isHeight && isHeight),
          }),
        }}
        onChange={handleChange}
      />
    </Box>
  );
};

CustomValueContainer.propTypes = {
  children: PropTypes.node,
  isFocused: PropTypes.string,
  selectProps: PropTypes.node,
  hasValue: PropTypes.bool,
};

NormalSelect.propTypes = {
  options: PropTypes.array,
  placeholder: PropTypes.string,
  value: PropTypes.array,
  handleChange: PropTypes.func,
  handleInputChange: PropTypes.func,
  error: PropTypes.bool,
  // isLocation: PropTypes.bool,
  disabled: PropTypes.bool,
  // isCustomStyle: PropTypes.bool,
  isMulti: PropTypes.bool,
  isCustomMenuHeight: PropTypes.bool,
  isHeight: PropTypes.string,
  locationRestrict: PropTypes.number,
  setMenuOpenState: PropTypes.func,
};

NormalSelect.defaultProps = {
  error: false,
  // isLocation: false,
  // isCustomStyle: false,
  isMulti: false,
  isCustomMenuHeight: false,
  setMenuOpenState: () => {},
};
