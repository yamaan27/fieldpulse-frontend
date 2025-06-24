import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import styled from 'styled-components'

const NormalInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
  width: 100%;
  transition: border 0.3s;

  &:hover {
    .MuiOutlinedInput-root {
      border: 1px solid hsl(0, 0%, 50%);
    }
  }

  .MuiOutlinedInput-root.Mui-focused {
    border-color: hsl(0, 0%, 50%);
    box-shadow: 0 0 0 1px hsl(0, 0%, 50%);
  }

  .MuiFormLabel-root {
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    color: #000000;
    font-size: 26px;

    @media screen and (max-width: 667px) {
      font-size: 16px;
      line-height: 25px;
    }
  }

  .MuiInputBase-root {
    background: #fdfdfd;
    border-radius: 8px;
    width: ${({ width }) => (width ? width : '100%')};
    height: ${({ height }) => (height ? height : '48px')};
    background: #e8edf1;
    border: none;
  }

  .MuiOutlinedInput-notchedOutline {
    border: none;
  }

  .MuiInputBase-input {
    font-size: 14px;
    padding: ${({ type }) => (type === 'username' ? '8px 0' : '8px 10px')};
    border-radius: 8px;
    color: #000000;
  }

  &.searchbox .MuiOutlinedInput-root {
    padding-left: 38px;
    background-image: url('../../../assets/svg/Search_Icon.svg');
    background-repeat: no-repeat;
    background-position: 6% 45%;
  }
  & + & {
    margin-top: 23px;
  }
`

const UsernameLabel = styled.label`
  font-family: 'Inter', sans-serif;
  margin-bottom: 5px;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
  text-align: left;
`

const StyledTextField = styled(TextField)`
  .MuiInputBase-input::placeholder {
    color: #000000 !important;
    font-weight: 500 !important;
  }
  .MuiInputBase-input.Mui-disabled {
    -webkit-text-fill-color: #4a4a4a;
    font-weight: 500;
  }
`

export const NormalInput = ({
  placeholder = '',
  titleLabel = '',
  onChange,
  value = '',
  name,
  disabled = false,
  type = 'text',
  max = '',
  min = '',
  labelSize = 'fs-18',
  isSearchBox = false,
  height,
  width,
  InputIconProps,
}) => {
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((prev) => !prev)

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <NormalInputContainer
      height={height}
      width={width}
      className={`normal-input ${isSearchBox && 'searchbox'}`}
    >
      {titleLabel && (
        <UsernameLabel className={`mb-1 ${labelSize}`}>
          {titleLabel}
        </UsernameLabel>
      )}

      <StyledTextField
        variant="outlined"
        name={name}
        type={type === 'password' && showPassword ? 'text' : type}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        inputProps={{ minLength: min, maxLength: max }}
        onChange={onChange}
        fullWidth
        InputProps={{
          startAdornment: type === 'username' && (
            <InputAdornment position="start">
              <PersonOutlineIcon sx={{ color: 'black' }} />
            </InputAdornment>
          ),
          endAdornment: type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {!showPassword ? (
                  <VisibilityOffIcon sx={{ color: 'black' }} />
                ) : (
                  <VisibilityIcon sx={{ color: 'black' }} />
                )}
              </IconButton>
            </InputAdornment>
          ),
          InputIconProps,
          ...(isSearchBox && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }),
        }}
      />
    </NormalInputContainer>
  )
}

NormalInput.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  titleLabel: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  max: PropTypes.string,
  min: PropTypes.string,
  icon: PropTypes.node,
  labelSize: PropTypes.string,
  isSearchBox: PropTypes.bool,
  height: PropTypes.string,
  width: PropTypes.string,
  InputIconProps: PropTypes.object,
}
