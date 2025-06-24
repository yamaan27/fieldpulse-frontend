import { createTheme } from '@mui/material/styles'

import { color } from './colors'

// DEFAULT THEME FOR ENTIRE APPLICATION
const theme = createTheme({
  palette: {
    primary: {
      main: color.brandColor.secondary['main'],
    },
    secondary: {
      main: color.brandColor.secondary['main'],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  typography: {
    fontFamily: '"Inter",  sans-serif',
  },
  // '& .shrink': {
  //   transform: 'translate(14px, -8px) scale(1) !important'
  // },
  // overrides: {
  //   // '& .shrink': {
  //   //   transform: 'translate(14px, -8px) scale(1) !important'
  //   // },
  //   MuiButton: {
  //     outlined: {
  //       border: '1px solid #0050BB',
  //       color: '#0050BB',
  //       fontWeight: '700',
  //       borderRadius: 4
  //     }
  //   }
  //   // MuiSelect:{

  //   // },
  //   // MuiFilledInput: {
  //   //   root: {
  //   //     '& .MuiFilledInput-input': {
  //   //       padding: '21px 12px 10px'
  //   //     }
  //   //   }
  //   // },
  //   // MuiOutlinedInput: {
  //   //   root: {
  //   //     '& .MuiSelect-outlined': {
  //   //       padding: '21px 12px 10px'
  //   //     }
  //   //   }
  //   // }
  // }
})

export default theme
