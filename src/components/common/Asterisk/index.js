import { Typography } from '@mui/material'
import React from 'react'

const Asterisk = () => {
  return (
    <Typography
      component="span"
      sx={{ color: 'red', ml: 0.5, fontSize: 'small' }}
      aria-label="required"
    >
      *
    </Typography>
  )
}

export default Asterisk
