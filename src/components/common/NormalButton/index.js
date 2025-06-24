import { Button } from '@mui/material'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import React from 'react'

//STYLES
const ButtonWrap = styled(Button)`
  min-height: 32px;
  text-transform: none;
  ${({ $active }) =>
    $active &&
    css`
      .MuiButton-startIcon {
        margin: 0;
      }
    `}
`

export const NormalButton = ({
  variant,
  color,
  size,
  label,
  icon,
  outlined,
  ...props
}) => {
  return (
    <ButtonWrap
      {...props}
      variant={outlined ? 'outlined' : variant}
      color={color}
      size={size}
      $active={icon}
    >
      {label}
    </ButtonWrap>
  )
}
NormalButton.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.bool,
  outlined: PropTypes.bool,
}

NormalButton.defaultProps = {
  variant: 'contained',
  color: 'secondary',
  size: 'large',
  label: '',
  icon: false,
  outlined: false,
}
