import {
  Box,
  Button as _Button,
  Typography,
  useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { color } from 'services/colors'
import styled, { css } from 'styled-components'
import Icon from 'services/icon'
import PropTypes from 'prop-types'
import React from 'react'
//STYLES
const HeaderWrapper = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const Title = styled(Typography)`
  font-weight: 700;
  display: flex;
  align-items: center;
  .MuiTypography-root {
    // padding-left: 10px;
    color: ${color.brandColor.secondary['main']};
  }
  ${(props) => props.theme.breakpoints.only('xs')} {
    font-size: 18px;
    padding-left: 0px;
  }
  ${({ $active }) =>
    $active === 'DANGER' &&
    css`
      color: #eb5757;
    `}
  ${({ $active }) =>
    $active === 'WARNING' &&
    css`
      color: #db8d39;
    `}
`
const Button = styled(_Button)`
  color: white;
  box-shadow: none;
  font-weight: 700;
  ${(props) => props.theme.breakpoints.only('xs')} {
    font-size: 12px;
  }
`

export const TitleCard = ({
  icon,
  title,
  buttonText,
  buttonIcon,
  handleClick,
  create,
  active,
  isButtonDisabled,
}) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.only('xs'))
  return (
    <HeaderWrapper>
      <Title variant="h5" $active={active}>
        {title}
        {icon && (
          <Icon
            iconName="star_border"
            iconColor={color.brandColor.secondary['main']}
            fontSize="28px"
          />
        )}
      </Title>
      {buttonText && Boolean(!create) && (
        <Button
          disabled={isButtonDisabled}
          onClick={handleClick}
          variant="contained"
          size={isMobile ? 'medium' : 'large'}
          startIcon={<Icon iconName={buttonIcon} iconColor="white" />}
        >
          {buttonText}
        </Button>
      )}
    </HeaderWrapper>
  )
}

TitleCard.propTypes = {
  icon: PropTypes.bool,
  title: PropTypes.string,
  buttonText: PropTypes.string,
  handleClick: PropTypes.func,
  create: PropTypes.number,
  buttonIcon: PropTypes.string,
  active: PropTypes.string,
  isButtonDisabled: PropTypes.bool,
}

TitleCard.defaultProps = {
  icon: false,
  title: '',
  buttonText: '',
  handleClick: () => null,
  create: 0,
  buttonIcon: 'add_box',
  active: '',
  isButtonDisabled: false,
}
