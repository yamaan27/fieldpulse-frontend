import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import FooterButton from "components/common/FooterButton";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

import {
  Box,
  Grid,
  Tooltip,
  TableCell,
  TableRow,
  Typography,
  CircularProgress,
  FormControl,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import styled from "styled-components";
import { color } from "services/colors";
import PropTypes from "prop-types";

import Icon from "services/icon";
import { userManagementHeader } from "services/helpers/constants/admin/userManagement";
import { endPoints } from "services/helpers/config";
import {
  deleteUserApi,
  getAllUsersApi,
} from "action/UserManagement/UserManagementAct";

import { TableWrapper } from "components/common/TableWrapper";
import { NormalButton } from "components/common/NormalButton";
import Modal from "components/common/CustomModal";
import { errorToast, successToast } from "services/helperFunctions";
import { NormalInput } from "components/common/NormalInput";
import useDebounce from "hooks/useDebounce";
import { ClientCard } from "components/common/Card";
import MobilePagination from "components/common/MobilePagination";

//STYLES

const FilterBox = styled(Box)`
  padding: 20px 15px;
`;
const Title = styled(Typography).attrs({ variant: "h6" })`
  font-weight: 700;
`;

const BoxWrap = styled(Box)`
  // background: #fff;
  background: ${({ isSmallScreen }) => (isSmallScreen ? "none" : "#fff")};
  border-radius: 24px;
  // padding-bottom: 30px;
  ${(props) => props.theme.breakpoints.only("xs")} {
    // margin-bottom: 100px;
  }
`;
const BoxWrapper = styled(Box)`
  border-radius: 24px;
  // background: white;
  // border: 1px solid ${color.brandColor.primary["900"]};
  background: ${({ isSmallScreen }) => (isSmallScreen ? "none" : "white")};
  border: ${({ isSmallScreen }) =>
    isSmallScreen ? "none" : `1px solid ${color.brandColor.primary["900"]}`};
  padding-bottom: 20px;
  margin-bottom: 80px;
  position: relative;
  ${(props) => props.theme.breakpoints.only("xs")} {
    margin-bottom: 200px;
  }
  ${(props) => props.theme.breakpoints.only("sm")} {
    margin-bottom: 150px;
  }
`;

const CancelButton = styled(NormalButton)`
  margin-right: 5px;
`;
const SubContent = styled(Typography)`
  color: ${color.brandColor.primary["500"]};
  padding-bottom: 30px;
  border-bottom: 1px solid ${color.brandColor.primary["900"]};
`;

const SmallText = styled(Typography)({
  fontSize: "12px",
});

// const StyledBox = styled(Box)(() => ({
//   display: 'flex',
//   width: '100%',
//   alignItems: 'center',
//   borderTop: '1px solid #dadada',
//   padding: '10px 16px',
//   backgroundColor: '#C7DEF6',
//   // flexWrap: 'wrap',
// }))

const dummyUsers = [
  {
    _id: "1",
    name: "john_doe",
    email: "john@example.com",
    phone: "9876543210",
    role: { name: "Admin" },
  },
  {
    _id: "2",
    name: "jane_smith",
    email: "jane@example.com",
    phone: "9123456780",
    role: { name: "Editor" },
  },
  {
    _id: "3",
    name: "ali_khan",
    email: "ali@example.com",
    phone: "9999999999",
    role: { name: "User" },
  },
];

const UserManagementComp = (props) => {
  let { CENTER, LEFT, POINTER } = endPoints.common;
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [userManagementList, setUserManagementList] = useState([]);
  const [page, setPage] = useState(1);
  const [Id, setId] = useState(null);
  const [rowsPerPage, setRows] = useState(50);
  const [count, setCount] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 800);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const isSmallScreenButton = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    FetchDataList();
  }, [page, rowsPerPage, debouncedSearchValue, isSmallScreen]);

  useEffect(() => {
    if (!searchValue.length) {
      setSearchValue("");
    }
  }, [searchValue]);

  const FetchDataList = () => {
    setIsLoading(true);
    const query = {
      page,
      // pageSize: rowsPerPage,
      pageSize: isSmallScreen ? 10 : rowsPerPage,
    };
    if (debouncedSearchValue && debouncedSearchValue.trim() !== "") {
      query.name = debouncedSearchValue;
    }
    props
      .getAllUsersApi(query)
      .then((res) => {
        const users = Array.isArray(res) ? res : res?.users;
        const total = users?.length ?? 0;

        setUserManagementList(users);
        setCount(total);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      });
  };

  const handleSearch = (event) => {
    setSearchValue(event.target.value);
  };
  const goToDetailPage = (_id, edit = false) => {
    navigate(`/user-management/details/${_id}`, {
      state: { id: _id, edit },
    });
  };
  const handleDelete = () => {
    setIsLoading(true);
    let query = {
      id: Id,
    };
    props
      .deleteUserApi(query)
      .then((res) => {
        successToast(res.message);
        setModalOpen(false);
        FetchDataList();
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("❌ Delete error:", err.message || err);
        errorToast(err.message || "Something went wrong");
        setModalOpen(false);
        setIsLoading(false);
      });
  };

  const capitalizeFirstLetter = (string) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAddUser = () => {
    navigate("/user-management/form");
  };

  return (
    <>
      <BoxWrapper isSmallScreen={isSmallScreen}>
        <FilterBox>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={12} md={5}>
              <Box>
                <Title>User Management</Title>
              </Box>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={12}
              md={7}
              justifyContent="end"
              alignItems="center"
              gap={"10px"}
            >
              <FormControl style={{ flexGrow: 1 }}>
                <Grid item xs={12} sm={12} md={12}>
                  <NormalInput
                    type="search"
                    revealed
                    placeholder="Search..."
                    height="50px"
                    value={searchValue}
                    onChange={handleSearch}
                  />
                </Grid>
              </FormControl>
              {!isSmallScreenButton && (
                <NormalButton
                  label="Add New User"
                  variant="contained"
                  onClick={() => navigate("/user-management/form")}
                  style={{ marginLeft: "10px" }}
                />
              )}
            </Grid>
          </Grid>
        </FilterBox>
        {isLoading ? (
          <div style={{ textAlign: "center", paddingTop: "20px" }}>
            <CircularProgress size={64} />
          </div>
        ) : (
          <BoxWrap isSmallScreen={isSmallScreen} mb={isSmallScreen && 2}>
            {isSmallScreen ? (
              <>
                {userManagementList.length === 0 ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="100%"
                  >
                    <Typography variant="h6">No Data Found</Typography>
                  </Box>
                ) : (
                  userManagementList.map(
                    ({ _id, name, email, phone, role }) => (
                      <ClientCard
                        key={_id}
                        subtitleIcon={false}
                        centerContent={true}
                        userManagement={true}
                        details={[
                          {
                            label: "Name",
                            value: name,
                            // style: { minWidth: '160px' },
                          },
                          {
                            label: "Role",
                            value: role?.name,
                            // style: { minWidth: '160px' },
                          },

                          {
                            label: "Mobile Number",
                            value: phone,
                            // style: { minWidth: '130px' },
                          },
                          {
                            label: "Email",
                            value: email,
                            style: {
                              // minWidth: '150px',
                              // paddingLeft: 0,
                              minWidth: "fit-content",
                            },
                          },
                        ]}
                        customActions={
                          <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            gap={"20px"}
                            padding="0 16px 0 16px"
                          >
                            <Box
                              display="flex"
                              gap={"10px"}
                              alignItems="center"
                              onClick={() => goToDetailPage(_id)}
                              style={{ cursor: "pointer" }}
                            >
                              <Icon
                                iconName="visibility"
                                fontSize="18px"
                                iconColor="#4C4C4C"
                                // onClick={() => goToDetailPage(_id)}
                              />
                              <SmallText variant="body2">View</SmallText>
                            </Box>
                            <Box
                              display="flex"
                              gap={"10px"}
                              alignItems="center"
                              onClick={() => goToDetailPage(_id, true)}
                              style={{ cursor: "pointer" }}
                            >
                              <Icon
                                iconName="edit"
                                fontSize="18px"
                                iconColor="#4C4C4C"
                                // onClick={() => goToDetailPage(_id, true)}
                              />
                              <SmallText variant="body2">Edit</SmallText>
                            </Box>
                            <Box
                              display="flex"
                              gap={"10px"}
                              alignItems="center"
                              onClick={() => {
                                setModalOpen(true);
                                setId(_id);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <Icon
                                // onClick={() => {
                                //   setModalOpen(true)
                                //   setId(_id)
                                // }}
                                iconName="delete"
                                fontSize="18px"
                                iconColor="#4C4C4C"
                              />
                              <SmallText variant="body2">Delete</SmallText>
                            </Box>
                          </Box>
                        }
                      />
                    )
                  )
                )}
                {userManagementList.length > 0 && (
                  <MobilePagination
                    count={count}
                    page={page}
                    rowsPerPage={10}
                    setPage={setPage}
                  />
                )}

                <FooterButton
                  icon={PersonAddIcon}
                  label="Add New User"
                  onClick={handleAddUser}
                />
              </>
            ) : (
              <TableWrapper
                page={page}
                setPage={setPage}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRows}
                headerDetails={userManagementHeader}
                userList={userManagementList}
                count={count}
              >
                {userManagementList.map(({ _id, name, email, phone, role }) => {
                  const left = LEFT;
                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={_id}
                      align={CENTER}
                      style={{ cursor: POINTER }}
                    >
                      <TableCell
                        align={left}
                        onClick={() => goToDetailPage(_id)}
                      >
                        {capitalizeFirstLetter(name)}
                      </TableCell>
                      <TableCell align={left}>{email}</TableCell>
                      <TableCell align={left}>{phone}</TableCell>
                      <TableCell align={left}>{role}</TableCell>
                      <TableCell align="center">
                        <Box
                          display="flex"
                          justifyContent="space-around"
                          gap={"7px"}
                          className="table-option"
                        >
                          <Tooltip title="Delete">
                            <div
                              onClick={() => {
                                setModalOpen(true);
                                setId(_id);
                              }}
                              style={{ cursor: "pointer" }}
                            >
                              <Icon
                                iconName="delete"
                                fontSize="20px"
                                iconColor="#4C4C4C"
                              />
                            </div>
                          </Tooltip>
                          <Tooltip title="View">
                            <div
                              onClick={() => goToDetailPage(_id)}
                              style={{ cursor: "pointer" }}
                            >
                              <Icon
                                iconName="visibility"
                                fontSize="20px"
                                iconColor="#4C4C4C"
                              />
                            </div>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <div
                              onClick={() => goToDetailPage(_id, true)}
                              style={{ cursor: "pointer" }}
                            >
                              <Icon
                                iconName="edit"
                                fontSize="20px"
                                iconColor="#4C4C4C"
                              />
                            </div>
                          </Tooltip>

                          {/* <Tooltip title="Edit">
                            <Icon
                              iconName="edit"
                              fontSize="20px"
                              iconColor="#4C4C4C"
                              onClick={() => goToDetailPage(_id, true)}
                              style={{ cursor: "pointer" }}
                            />
                          </Tooltip> */}
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableWrapper>
            )}
          </BoxWrap>
        )}
        <Modal
          handleClose={() => {
            setModalOpen(false);
          }}
          open={modalOpen}
          actions={
            <>
              <CancelButton
                label="Cancel"
                size="medium"
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setModalOpen(false);
                }}
              />
              <NormalButton
                label="Delete"
                size="medium"
                onClick={handleDelete}
              />
            </>
          }
          title="Delete User?"
        >
          <SubContent>Are you sure you want to delete this user?</SubContent>
        </Modal>
      </BoxWrapper>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getAllUsersApi,
      deleteUserApi,
    },
    dispatch
  );
};

UserManagementComp.propTypes = {
  getAllUsersApi: PropTypes.func.isRequired,
  deleteUserApi: PropTypes.func.isRequired,
};

UserManagementComp.defaultProps = {};

export const UserManagement = connect(
  null,
  mapDispatchToProps
)(UserManagementComp);
