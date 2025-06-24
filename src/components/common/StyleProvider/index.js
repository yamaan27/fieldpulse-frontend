import CssBaseline from '@mui/material/CssBaseline'
import { createGlobalStyle } from 'styled-components'
import { ThemeProvider } from '../ThemeProvider'
import theme from 'services/theme'
import { color } from 'services/colors'
import PropTypes from 'prop-types'
import { StyledEngineProvider } from '@mui/material/styles'
// import React from 'react'

const GlobalStyle = createGlobalStyle`
html, 
body {
  margin: 0; 
  height: 100%;
  background: ${color.backgroundColor['100']};
  font-family: 'Inter'; 
  ::-webkit-scrollbar {
    width:14px;
    height: 3px;
  }
  ::-webkit-scrollbar-track {
    background: ${color.brandColor.grey['900']};
  }
  ::-webkit-scrollbar-thumb {
    background: #888;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
#root {
  display: flex;
  flex-direction: column;
  height: 100%;
}    
`

export const StyleProvider = ({ children }) => {
  return (
    <>
      <GlobalStyle />
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          {children}
          <CssBaseline />
        </ThemeProvider>
      </StyledEngineProvider>
    </>
  )
}

StyleProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
