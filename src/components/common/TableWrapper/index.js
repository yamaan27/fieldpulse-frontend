import {
  Table as _Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination as _TablePagination,
  Paper as _Paper,
  TableRow,
  TableSortLabel as _TableSortLabel,
  Typography,
  Grid,
} from "@mui/material";

import styled, { css } from "styled-components";
import { color } from "services/colors";
import Icon from "services/icon";
import PropTypes from "prop-types";
import React from "react";

//STYLES
const Table = styled(_Table)`
  border: 1px solid #d9d9d9 !important;
  .MuiTableHead-root {
    background: ${color.brandColor.secondary["100"]};
    .MuiTableCell-head,
    span {
      width: max-content;
      color: ${color.brandColor.secondary["main"]};
      font-size: 18px;
      font-weight: 600;
      ${(props) => props.theme.breakpoints.only("xs")} {
        font-size: 14px;
      }
      justify-content: space-between;
    }
    .MuiTableCell-head {
      box-shadow:
        inset -1px 0px 0px #d9d9d9,
        inset 0px -1px 0px #d9d9d9;
    }
  }
  .MuiTableBody-root {
    tr {
      &:hover {
        td {
          background: #fbf4eb !important;
          font-weight: 600;
        }
      }
      &:nth-child(even) {
        td {
          background: #f8f9fd;
        }
      }
    }
    .MuiTableRow-root {
      td,
      th {
        border: 1px solid ${color.brandColor.primary["800"]};
      }
      &:nth-child(even) {
        background: ${color.brandColor.primary["1000"]};
      }
      td {
        height: 63px;
        padding: 0px 16px;
        background: #fff;
      }
    }
  }
  .MuiTableSortLabel-icon {
    display: none;
  }
`;

const TablePagination = styled(_TablePagination)`
  .MuiSelect-select.MuiSelect-select {
    background: ${color.brandColor.primary["1000"]};
    border: 1px solid ${color.brandColor.secondary["main"]};
    color: ${color.brandColor.secondary["main"]};
    border-radius: 4px;
  }
  .MuiIconButton-root {
    width: 52px;
    background: ${color.brandColor.primary["1000"]};
    color: ${color.brandColor.secondary["main"]};
    border: 1px solid ${color.brandColor.secondary["main"]};
    border-radius: 4px;
  }
  .MuiIconButton-root {
    padding: 3px 12px 3px 12px;
    margin: 12px;
  }
  .MuiIconButton-root.Mui-disabled {
    opacity: 0.7;
    cursor: none;
  }
`;
const Paper = styled(_Paper)`
  box-shadow: none;
  ${({ $customColumn }) =>
    $customColumn &&
    css`
      .MuiTableContainer-root {
        padding-bottom: 110px;
      }
    `}
`;

const TableRowWrapper = styled(TableRow)`
  height: 120px;
`;

const TableSortLabel = styled(_TableSortLabel)`
  display: flex;
  cursor: default;
  .material-icons {
    padding-left: 15px;
  }
`;

export const TableWrapper = ({
  children,
  userList,
  headerDetails,
  order = "",
  // orderBy = '',
  page,
  rowsPerPage,
  pagination = true,
  insights = false,
  count,
  setOrder,
  setOrderBy,
  setPage,
  setRowsPerPage,
  // setUserList,
  loading,
  customStyleFirst,
  customColumn,
  colSpan,
  className,
}) => {
  const handleRequestSort = (event, property) => {
    const isAsc = order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  return (
    <Paper $customColumn={customColumn}>
      <TableContainer>
        <Table
          className={className}
          $customStyleFirst={customStyleFirst}
          aria-labelledby="tableTitle"
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              {headerDetails.map((headCell, index) => (
                <TableCell key={index}>
                  <TableSortLabel
                    onClick={headCell.sort && createSortHandler(headCell.key)}
                  >
                    {headCell.label}
                    {headCell.sort && <Icon iconName="unfold_more" />}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRowWrapper>
                <TableCell align="center" colSpan={colSpan}>
                  loading...
                </TableCell>
              </TableRowWrapper>
            ) : userList.length > 0 ? (
              <>{children}</>
            ) : (
              <TableRowWrapper>
                <TableCell align="center" colSpan={colSpan}>
                  <Typography>No Data</Typography>
                </TableCell>
              </TableRowWrapper>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          {pagination && count >= 10 && (
            <TablePagination
              SelectProps={{
                disabled: loading,
              }}
              backIconButtonProps={
                loading
                  ? {
                      disabled: loading,
                    }
                  : undefined
              }
              nextIconButtonProps={
                loading
                  ? {
                      disabled: loading,
                    }
                  : undefined
              }
              // rowsPerPageOptions={[50, 100, 150, 200]}
              rowsPerPageOptions={insights ? [] : [50, 100, 150, 200]}
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              page={page - 1}
              onPageChange={handleChangePage}
            />
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

TableWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  userList: PropTypes.array,
  headerDetails: PropTypes.array,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  count: PropTypes.number,
  customStyle: PropTypes.bool,
  customcolor: PropTypes.bool,
  setOrder: PropTypes.func,
  setOrderBy: PropTypes.func,
  setPage: PropTypes.func,
  setRowsPerPage: PropTypes.func,
  setUserList: PropTypes.func,
  pagination: PropTypes.bool,
  insights: PropTypes.bool,
  loading: PropTypes.bool,
  customSpace: PropTypes.bool,
  customStyleFirst: PropTypes.bool,
  isCustomButton: PropTypes.bool,
  customColumn: PropTypes.bool,
  customFontSize: PropTypes.bool,
  colSpan: PropTypes.number,
  isExportListEnabled: PropTypes.bool,
  onPressExcel: PropTypes.func,
  isExcelLoading: PropTypes.bool,
  className: PropTypes.string,
};

TableWrapper.defaultProps = {
  colSpan: 12,
};
