import React from 'react'
import {
  FormControlLabel as MuiFormControlLabel,
  Checkbox as MuiCheckbox,
} from '@mui/material'
import PropTypes from 'prop-types'

export const Checkbox = ({
  bold = false,
  color = 'primary',
  label,
  disabled,
  // labelFontSize = '16px',
  ...checkboxProps
}) => {
  return (
    <MuiFormControlLabel
      disabled={disabled}
      control={<MuiCheckbox color={color} {...checkboxProps} />}
      label={label}
      sx={{
        '& .MuiFormControlLabel-label': {
          fontFamily: 'Inter, sans-serif',
          fontSize: '14px',
          fontWeight: bold ? 500 : 'normal',
          lineHeight: '20px',
          width: 'max-content',

          '@media (max-width: 1024px)': {
            fontSize: '12px',
          },
        },
      }}
    />
  )
}

Checkbox.propTypes = {
  bold: PropTypes.bool,
  color: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  labelFontSize: PropTypes.string,
}

Checkbox.defaultProps = {
  bold: false,
  color: 'primary',
  label: '',
  disabled: false,
  labelFontSize: '16px',
}
