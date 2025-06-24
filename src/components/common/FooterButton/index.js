import React from 'react'
import PropTypes from 'prop-types'
import { Box } from '@mui/material'
import styled from 'styled-components'
import { color } from 'services/colors'

const FixedButtonWrapper = styled(Box)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 16px;
  background: white;
  border-top: 1px solid ${color.brandColor.primary['900']};
  box-shadow: 0px -2px 10px rgba(0, 0, 0, 0.1);
  display: none;
  margin-top: auto;

  ${(props) => props.theme.breakpoints.down('md')} {
    display: flex;
    justify-content: center;
    border-radius: 16px 16px 0 0;
  }
`

const FooterButtonStyled = styled('button')({
  backgroundColor: '#006ADA',
  color: 'white',
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '20px',
  border: 'none',
  padding: '8px 16px',
  borderRadius: '8px',
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: '#005bb5',
  },
  '& .MuiSvgIcon-root': {
    marginRight: '8px',
    color: 'white',
    fill: 'white',
  },
})

const FooterButton = ({ icon: IconComponent, label, onClick }) => {
  return (
    <FixedButtonWrapper>
      <FooterButtonStyled onClick={onClick}>
        {IconComponent && <IconComponent />}
        {label}
      </FooterButtonStyled>
    </FixedButtonWrapper>
  )
}

FooterButton.propTypes = {
  icon: PropTypes.elementType,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default FooterButton
