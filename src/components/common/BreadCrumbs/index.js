import {
  Breadcrumbs as Breadcrumb,
  Box,
  Typography as _Typography,
  Link as _Link,
} from '@mui/material'
import styled from 'styled-components'
import Icon from 'services/icon'
import { color } from 'services/colors'
import PropTypes from 'prop-types'
import React from 'react'
import { useNavigate } from 'react-router-dom'

//STYLES
const Link = styled(_Link)`
  font-weight: 500;
  font-size: 13px;
  display: flex;
  cursor: pointer;
  color: black;
`
const Typography = styled(_Typography)`
  font-weight: 500;
  font-size: 13px;
  // color: ${color.brandColor.grey['100']};
  color: #007f6d;
  text-decoration: underline;
`
export const BreadCrumbs = ({ breadCrumbsList = [] }) => {
  const navigate = useNavigate()
  return (
    <Box sx={{ mb: 1 }}>
      <Breadcrumb
        separator={
          <Icon
            iconName="chevron_right"
            iconColor={color.brandColor.primary['main']}
            fontSize="18px"
          />
        }
        aria-label="breadcrumb"
        sx={{
          '& .MuiBreadcrumbs-separator': {
            marginLeft: 0,
            marginRight: 0,
          },
        }}
      >
        {breadCrumbsList.map(({ label, redirectUrl, currentLabel }, index) => (
          <Box key={index}>
            {label && (
              <Link
                color="secondary"
                // onClick={() => {
                //   history.push(redirectUrl)
                // }}
                onClick={() => {
                  if (redirectUrl) {
                    navigate(redirectUrl)
                  }
                }}
                underline="always"
              >
                {label}
              </Link>
            )}
            {currentLabel && <Typography>{currentLabel}</Typography>}
          </Box>
        ))}
      </Breadcrumb>
    </Box>
  )
}
BreadCrumbs.propTypes = {
  breadCrumbsList: PropTypes.array,
}
BreadCrumbs.defaultProps = {
  breadCrumbsList: [],
}
