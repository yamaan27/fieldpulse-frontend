import { useTheme } from '@mui/material/styles'
import {
  Grid,
  Box,
  Button as _Button,
  useMediaQuery,
  CircularProgress,
} from '@mui/material'
import { color } from 'services/colors'
import styled from 'styled-components'
import Icon from 'services/icon'
import PropTypes from 'prop-types'
import React from 'react'

const GridButtonWrap = styled(Grid)`
  justify-content: end;
`
const Button = styled(_Button)`
  min-width: 100px;
  height: 35px;
  border-radius: 8px;
`

export const ButtonContainer = ({
  labelLeft,
  labelRight,
  iconLeft,
  iconRight,
  loading,
  type,
  onCancel,
  onSubmit,
  disabled,
  size,
  leftVariant,
  rightVariant,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <GridButtonWrap container>
      {/* <Grid item xs="auto">
        <Box sx={{ mr: 1.5 }}>
          <Button
            onClick={onCancel}
            style={{
              fontWeight: 700,
              textTransform: 'none',
              color: labelLeft === 'Reject' ? '#EB5757' : '', // Apply color only for 'Reject'
              borderColor: labelLeft === 'Reject' ? '#EB5757' : '',
            }}
            variant={leftVariant ? leftVariant : 'outlined'}
            size={size ? size : isMobile ? 'medium' : 'large'}
            // color="secondary"
            color={labelLeft === 'Reject' ? 'secondary' : 'inherit'}
            startIcon={
              <Icon
                iconName={iconLeft}
                // iconColor={color.brandColor.secondary['main']}
                iconColor={
                  labelLeft === 'Reject'
                    ? '#EB5757'
                    : color.brandColor.secondary['main']
                }
              />
            }
          >
            {labelLeft}
          </Button>
        </Box>
      </Grid> */}
      {leftVariant !== "hidden" && (
        <Grid item xs="auto">
          <Box sx={{ mr: 1 }}>
            <Button
              onClick={onCancel}
              style={{
                fontWeight: 700,
                textTransform: "none",
                color: ["Reject", "Cancel Edit", "Cancel"].includes(labelLeft)
                  ? "#EB5757"
                  : "",
                borderColor: ["Reject", "Cancel Edit", "Cancel"].includes(
                  labelLeft
                )
                  ? "#EB5757"
                  : "",
              }}
              variant={leftVariant ? leftVariant : "outlined"}
              size={size ? size : isMobile ? "medium" : "large"}
              color={labelLeft === "Reject" ? "secondary" : "inherit"}
              startIcon={
                <Icon
                  iconName={iconLeft}
                  iconColor={
                    ["Reject", "Cancel Edit", "Cancel", "Start Task"].includes(
                      labelLeft
                    )
                      ? "#EB5757"
                      : color.brandColor.secondary["main"]
                  }
                />
              }
            >
              {labelLeft}
            </Button>
          </Box>
        </Grid>
      )}
      <Grid item xs="auto">
        <Box sx={{ ml: 1 }}>
          <Button
            onClick={onSubmit}
            type={type}
            // style={{ fontWeight: 700, textTransform: 'none' }}
            style={{
              fontWeight: 700,
              textTransform: "none",
              color: ["Reject", "Cancel Edit", "Cancel"].includes(labelRight)
                ? "#EB5757"
                : "",
              borderColor: ["Reject", "Cancel Edit", "Cancel"].includes(
                labelRight
              )
                ? "#EB5757"
                : "",
            }}
            variant={rightVariant ? rightVariant : "contained"}
            size={size ? size : isMobile ? "medium" : "large"}
            // color="secondary"
            // startIcon={
            //   loading ? (
            //     <CircularProgress size={18} />
            //   ) : (
            //     <Icon iconName={iconRight} />
            //   )
            // }
            startIcon={
              ["Reject", "Cancel Edit", "Cancel", "Start Task"].includes(
                labelRight
              ) ? (
                loading ? (
                  <CircularProgress size={18} />
                ) : (
                  <Icon iconName={iconRight} />
                )
              ) : (
                <Icon iconName={iconRight} />
              )
            }
            disabled={loading || disabled}
          >
            {labelRight}
          </Button>
        </Box>
      </Grid>
    </GridButtonWrap>
  );
}

ButtonContainer.propTypes = {
  labelLeft: PropTypes.string,
  labelRight: PropTypes.string,
  iconLeft: PropTypes.string,
  iconRight: PropTypes.string,
  loading: PropTypes.bool,
  type: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  startIcon: PropTypes.string,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  leftVariant: PropTypes.string,
  rightVariant: PropTypes.string,
}

ButtonContainer.defaultProps = {
  labelLeft: '',
  labelRight: '',
  iconLeft: '',
  iconRight: '',
  loading: false,
  type: '',
  onCancel: () => null,
  onSubmit: () => null,
  startIcon: '',
}
