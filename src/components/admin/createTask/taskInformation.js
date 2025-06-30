import React, { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import axios from "axios";

import styled from "styled-components";

import {
  Grid,
  FormControl,
  FormLabel,
  Typography,
  Box,
  TextField,
} from "@mui/material";
import { NormalSelect } from "components/common";
import { NormalInput } from "components/common/NormalInput";
import DatePicker from "components/common/DatePicker";
import Asterisk from "components/common/Asterisk";
import { color } from "services/colors";
import PropTypes from "prop-types";
import { errorMessageToDisplay } from "services/helperFunctions";
import useDebounce from "hooks/useDebounce";
import { getAgentsApi } from "action/DropDown/DropDownAct";

import {
  meetingTypeOptions,
  modeOfMeetingOptions,
} from "services/helpers/constants/admin/meetingLog";

import moment from "moment";
import Icon from "services/icon";

const CustomFormLabel = styled(FormLabel)`
  color: black;
  font-weight: 400;
  font-size: 13px;
`;
const NoteTextField = styled(TextField)`
  width: 100%;
  margin-top: 10px;
  background: #f2f2f2;
  border-radius: 6px;
  .MuiOutlinedInput-root {
    & fieldset {
      border-color: #f2f2f2;
      border-radius: 6px;
    }
  }
  textarea {
    resize: none;
  }
`;
const CustomTypography = styled("span")`
  font-family: "Inter", sans-serif;
  font-size: 17px;
  font-weight: 600;
  line-height: 19.36px;
  text-align: left;
  margin-top: 10px;
`;
const CardWrapper = styled(Box)`
  background: white;
  min-height: 100%;
  padding: 20px 16px;
  border-radius: 25px;
  border: 1px solid ${color.brandColor.primary["900"]};
`;
const CardWrap = styled(Box)`
  padding-bottom: 15px;
`;
const SubTitle = styled(Typography).attrs({ variant: "body2" })`
  padding-bottom: 5px;
  color: ${color.brandColor.primary["400"]};
  font-weight: 500;
  font-size: 12px;
`;
const Title = styled(Typography).attrs({ variant: "body1" })`
  color: ${color.brandColor.primary["200"]};
  font-weight: 700;
  font-size: 16px;
`;

const StyledTextField = styled(NormalInput)`
  margin: 20px 0;
  background-color: #fff;
  width: 100%;

  ${(props) => props.theme.breakpoints.down("md")} {
    width: 95%;
  }

  ${(props) => props.theme.breakpoints.down("sm")} {
    width: 100%;
    font-size: 12px;
  }
`;

const TaskInformationComp = ({
  errors,
  getAgentsApi,
  values,
  setValues,
  ClientInfo,
  isEditMode,
  validator,
}) => {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const isFormMode = location.pathname.includes("form");
  const isDetailsMode = location.pathname.includes("details");
  const [clientOptions, setClientOptions] = useState([]);
  const [allGeographyOptions, setAllGeographyOptions] = useState([]);
  const debouncedSearch = useDebounce(search, 500);
  const [geographyOptions, setGeographyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const lgValue = isFormMode || isEditMode ? 3 : isDetailsMode ? 2 : 3;

  useEffect(() => {
    getAgentsApi().then((res) => {
      const formattedOptions = res.map((agent) => ({
        value: agent._id,
        label: agent.name,
      }));
      setClientOptions(formattedOptions); // or setAssigneeOptions if you're using a different state
      console.log("Assignee options:", formattedOptions);
    });
  }, []);
  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (!search || search.length < 2) return;

  //     setIsLoading(true);
  //     const suggestions = await fetchLocationByInput(search);

  //     setGeographyOptions(suggestions || []);
  //     setIsLoading(false);
  //   };

  //   const delayDebounce = setTimeout(fetchData, 500); // debounce

  //   return () => clearTimeout(delayDebounce);
  // }, [search]);

  useEffect(() => {
    const fetchData = async () => {
      if (!search || search.length < 2) return;

      setIsLoading(true);
      const suggestions = await fetchLocationByInput(search);

      setGeographyOptions(suggestions || []);
      setIsLoading(false);
    };

    const delayDebounce = setTimeout(fetchData, 500);

    return () => clearTimeout(delayDebounce);
  }, [search]);
  

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleNoteChange = (event) => {
    const { value } = event.target;
    setValues({ ...values, description: value });
    // validateInput('comments', value)
  };

  const handleSelectChange = (selectedOption, name) => {
    if (name === "location") {
      setValues((prev) => ({
        ...prev,
        location: selectedOption.value, // full object
      }));
    } else {
      setValues((prev) => ({
        ...prev,
        [name]: selectedOption?.value,
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value, // set at top level
    }));
  };

  console.log("TaskInformationComp values:", values);

  const handleDateChange = (newValue, fieldName) => {
    const formattedDate = moment(newValue).format("YYYY-MM-DD HH:mm:ss");

    const isValidDateTime = moment(
      newValue,
      "YYYY-MM-DD HH:mm:ss",
      true
    ).isValid();

    if (isValidDateTime) {
      setValues((prevValues) => ({
        ...prevValues,
        [fieldName]: formattedDate,
      }));
    } else {
      console.log(`Invalid date/time for ${fieldName}. No update made.`);
    }
  };
  const fetchLocationByPincode = async (pincode) => {
    if (!/^\d{6}$/.test(pincode)) return [];

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];

      if (data.Status === "Success") {
        return data.PostOffice.map((office) => ({
          label: `${office.Name}, ${office.District}, ${office.State}, India - ${pincode}`,
          value: {
            city: office.District,
            state: office.State,
            country: "India",
            pincode: office.Pincode,
          },
        }));
      }
    } catch (err) {
      console.error("Error fetching location:", err);
    }

    return [];
  };

  const fetchLocationByInput = async (input) => {
    try {
      if (!input || input.length < 3) return [];

      let response;

      if (/^\d{4,6}$/.test(input)) {
        response = await axios.get(
          `https://api.postalpincode.in/pincode/${input}`
        );

        const data = response.data[0];

        if (data.Status === "Success") {
          const suggestions = data.PostOffice.map((office) => ({
            label: `${office.Name}, ${office.District}, ${office.State} - ${office.Pincode}`,
            value: {
              city: office.District,
              country: "India",
              pincode: office.Pincode,
              state: office.State,
              area: office.Name,
            },
          }));
          return suggestions;
        }
      }

      response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
        params: {
          q: `${input}, India`,
          format: "json",
          addressdetails: 1,
          limit: 5,
        },
      });

      const suggestions = response.data.map((place) => ({
        label: place.display_name,
        value: {
          city:
            place.address.city ||
            place.address.town ||
            place.address.village ||
            "",
          state: place.address.state || "",
          country: place.address.country || "India",
          pincode: place.address.postcode || "",
          lat: place.lat,
          lng: place.lon,
        },
      }));

      return suggestions;
    } catch (error) {
      console.error("[fetchLocationByInput] Error fetching location:", error);
      return [];
    }
  };

  // const handleSearchInputChange = async (inputValue) => {
  //   setSearch(inputValue);
  //   setIsLoading(true);

  //   try {
  //     const suggestions = await fetchLocationByInput(inputValue); // ✅ await the promise

  //     setGeographyOptions(suggestions || []);
  //   } catch (err) {
  //     setGeographyOptions([]);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const debouncedFetchLocation = useCallback(
    debounce(async (inputValue) => {
      try {
        const suggestions = await fetchLocationByInput(inputValue);
        setGeographyOptions(suggestions || []);
      } catch (err) {
        console.error("Debounced fetch error:", err);
        setGeographyOptions([]);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handleSearchInputChange = (inputValue) => {
    if (!inputValue || inputValue.length < 3) return;
    setIsLoading(true);
    debouncedFetchLocation(inputValue);
  };
  

  const handleSelectInput = (inputValue) => {
    handleSearchInputChange(inputValue);
    return inputValue;
  };

  console.log("Meetings Deatils ClientInfo:", ClientInfo);

  console.log("📦 geographyOptions:", geographyOptions);
  console.log("📌 values.location:", values?.location);

  const selectedLocationOption = geographyOptions.find(
    (opt) =>
      opt.value?.area === values?.location?.area &&
      opt.value?.city === values?.location?.city &&
      opt.value?.state === values?.location?.state &&
      opt.value?.country === values?.location?.country &&
      opt.value?.pincode === values?.location?.pincode
  );
  console.log("🎯 selectedLocationOption:", selectedLocationOption);
  

  return (
    <Grid item xs={12} sm={12} md={12} sx={{ padding: "0 0 16px 16px" }}>
      <Grid container spacing={2}>
        <Grid
          item
          xs={isEditMode || isFormMode ? 12 : 6}
          sm={isEditMode || isFormMode ? 6 : 4}
          md={isEditMode || isFormMode ? 6 : 4}
          lg={lgValue}
        >
          <FormControl fullWidth>
            <CustomFormLabel>Title{isFormMode && <Asterisk />}</CustomFormLabel>
            {isFormMode && (
              <StyledTextField
                name="title"
                placeholder="Enter the value here"
                value={values?.title}
                onChange={handleInputChange}
                type="text"
              />
            )}
            {isDetailsMode && (
              <CustomTypography variant="body1">
                {ClientInfo?.title || "N/A"}
              </CustomTypography>
            )}
            {errorMessageToDisplay(
              validator,
              "title",
              values?.title,
              "required"
            )}
          </FormControl>
        </Grid>
        <Grid
          item
          xs={isEditMode || isFormMode ? 12 : 6}
          sm={isEditMode || isFormMode ? 6 : 4}
          md={isEditMode || isFormMode ? 6 : 4}
          lg={lgValue}
        >
          <FormControl fullWidth>
            <CustomFormLabel>
              Assigned To{isFormMode && <Asterisk />}
            </CustomFormLabel>
            {(isFormMode || isEditMode) && (
              <NormalSelect
                placeholder="Select Assignee"
                options={clientOptions}
                name="assignedTo"
                value={values?.assignedTo}
                handleChange={(selectedOption) =>
                  handleSelectChange(selectedOption, "assignedTo")
                }
              />
            )}
            {isDetailsMode && !isEditMode && (
              <CustomTypography>
                {values?.assignedTo?.name || "N/A"}
              </CustomTypography>
            )}
            {errorMessageToDisplay(
              validator,
              "assignedTo",
              values?.assignedTo,
              "required"
            )}
          </FormControl>
        </Grid>
        <Grid
          item
          xs={isEditMode || isFormMode ? 12 : 6}
          sm={isEditMode || isFormMode ? 6 : 4}
          md={isEditMode || isFormMode ? 6 : 4}
          lg={lgValue}
        >
          <CardWrap>
            <SubTitle>Location</SubTitle>
            {(isFormMode || isEditMode) && (
              <>
                {/* <NormalSelect
                  name="location"
                  placeholder="Enter Pincode or City"
                  value={[
                    values?.location?.area,
                    values?.location?.city,
                    values?.location?.country,
                    values?.location?.pincode,
                  ]
                    .filter(Boolean)
                    .join(", ")}
                  options={geographyOptions}
                  isLoading={isLoading}
                  handleChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "location")
                  }
                  handleInputChange={handleSelectInput}
                /> */}
                <NormalSelect
                  name="location"
                  placeholder="Enter Pincode or City"
                  // value={
                  //   values?.location
                  //     ? {
                  //         label: [
                  //           values.location.area,
                  //           values.location.city,
                  //           values.location.country,
                  //           values.location.pincode,
                  //         ]
                  //           .filter(Boolean)
                  //           .join(", "),
                  //         value: values.location,
                  //       }
                  //     : null
                  // }
                  value={selectedLocationOption?.label || null}
                  options={geographyOptions}
                  isLoading={isLoading}
                  handleChange={(selectedOption) =>
                    handleSelectChange(selectedOption, "location")
                  }
                  handleInputChange={handleSearchInputChange}
                />

                {errorMessageToDisplay(
                  validator,
                  "location",
                  values?.location,
                  "required"
                )}
              </>
            )}
            {isDetailsMode && !isEditMode && (
              <Title>
                {values?.location?.city ? `${values.location.city}, ` : ""}

                {values?.location?.country || "N/A"}
              </Title>
            )}
          </CardWrap>
        </Grid>

        <Grid
          item
          xs={isEditMode || isFormMode ? 12 : 6}
          sm={isEditMode || isFormMode ? 6 : 4}
          md={isEditMode || isFormMode ? 6 : 4}
          lg={lgValue}
        >
          <FormControl fullWidth>
            <CustomFormLabel>
              Due Date{isFormMode && <Asterisk />}
            </CustomFormLabel>
            {(isFormMode || isEditMode) && (
              <DatePicker
                value={values?.dueDate || null}
                placeholderText="Select Due Date"
                onChange={(newValue) => handleDateChange(newValue, "dueDate")}
                disabled={false}
                showTimeInput={false}
                showYearPicker={false}
                minDate={null}
                maxDate={null}
              />
            )}
            {isDetailsMode && !isEditMode && (
              <CustomTypography variant="body1">
                {moment(ClientInfo?.dueDate).format("DD MMM YYYY")}
              </CustomTypography>
            )}
            {errorMessageToDisplay(
              validator,
              "dueDate",
              values?.dueDate,
              "required"
            )}
          </FormControl>
        </Grid>

        <Grid
          item
          xs={isEditMode || isFormMode ? 12 : 6}
          sm={isEditMode || isFormMode ? 6 : 4}
          md={isEditMode || isFormMode ? 6 : 4}
          lg={5}
        >
          <FormControl fullWidth>
            <CustomFormLabel>
              Description{isFormMode && <Asterisk />}
            </CustomFormLabel>
            {(isFormMode || isEditMode) && (
              <NoteTextField
                multiline
                rows={4}
                variant="outlined"
                value={values.description || ""}
                onChange={handleNoteChange}
                placeholder="Enter the value here"
              />
            )}
            {isDetailsMode && !isEditMode && (
              <CustomTypography>
                {values?.description || "N/A"}
              </CustomTypography>
            )}
            {errorMessageToDisplay(
              validator,
              "description",
              values?.description,
              "required"
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getAgentsApi }, dispatch);
};

TaskInformationComp.propTypes = {
  validator: PropTypes.object,
  geographyOptions: PropTypes.array,
  setSearch: PropTypes.func.isRequired,
  getAgentsApi: PropTypes.func.isRequired,
  values: PropTypes.shape({
    assignedTo: PropTypes.string,
    clientName: PropTypes.string,
    modeOfMeeting: PropTypes.string,
    stakeholder: PropTypes.string,
    stakeholders: PropTypes.any,
    dueDate: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
    endTime: PropTypes.oneOfType([
      PropTypes.instanceOf(Date),
      PropTypes.string,
    ]),
  }).isRequired,
  setValues: PropTypes.func.isRequired,
  setAccountInfo: PropTypes.func.isRequired,
  stakeholderOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  setStakeholderOptions: PropTypes.func.isRequired,
  ClientInfo: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isEditMode: PropTypes.bool,
};

TaskInformationComp.defaultProps = {};

export const TaskInformation = connect(
  null,
  mapDispatchToProps
)(TaskInformationComp);
