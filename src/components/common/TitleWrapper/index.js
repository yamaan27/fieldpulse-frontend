import React from 'react'

import styled from 'styled-components'

// import { NormalSelect } from 'components/common'
import { NormalInput } from 'components/common/NormalInput'

import { Box, Grid, Typography, FormControl } from '@mui/material'
// import ToggleButton from '@mui/lab/ToggleButton'
// import { ToggleButtonGroup as _ToggleButtonGroup } from '@mui/lab'

// import { color } from 'services/colors'
// import Icon from 'services/icon'

import PropTypes from 'prop-types'

// Styled Components
// const ToggleButtonGroup = styled(_ToggleButtonGroup)`
//   justify-content: end;
//   width: 100%;
//   .MuiToggleButton-sizeSmall {
//     border: none;
//     font-weight: 500;
//     font-size: 16px;
//     line-height: 20px;
//     color: ${color.brandColor.grey['100']};
//   }
//   .MuiToggleButton-root {
//     text-transform: capitalize;
//     border-radius: 6px;
//     margin-right: 15px;
//     min-width: auto;
//     padding: 2px 3px;
//     color: #004680;
//     &:last-child {
//       margin-right: 0px;
//     }
//     &.Mui-selected {
//       font-weight: 700;
//       background-color: ${color.brandColor.primary['100']};
//       color: white !important;

//       svg {
//         fill: white !important;
//       }
//     }
//   }
//   ${(props) => props.theme.breakpoints.down('sm')} {
//     display: flex;
//     gap: 5px;
//     .MuiToggleButton-root {
//       padding: 6px;
//       font-size: 14px;
//       margin: 0px 0px 10px;
//     }
//   }
// `

const CardTitle = styled(Typography).attrs({ variant: 'h6' })`
  font-weight: 700;
  display: flex;
  align-items: center;
  span {
    padding-right: 10px;
  }
  ${(props) => props.theme.breakpoints.down('sm')} {
    font-size: 18px;
    padding-top: 10px;
  }
`

const HeaderWrap = styled(Box)`
  padding: 20px 0 20px 20px;
  width: 100%;
  ${(props) => props.theme.breakpoints.down('sm')} {
    padding: 10px 0 10px 10px;
  }
`

// const ListWrap = styled(Typography).attrs({ variant: 'body2' })`
//   border-left: 1px solid #787486;
//   margin-right: 15px;
//   span {
//     background: #006ada;
//     padding: 4px 6px;
//     color: #fff;
//   }
// `

const TitleWrapper = ({
  title,
  // filter,
  // setFilter,
  showFormControls,
  searchValue,
  setSearchValue,
}) => {
  const handleSearch = (event) => {
    setSearchValue(event.target.value)
  }
  return (
    <HeaderWrap>
      <Grid
        container
        spacing={2}
        style={{ width: '100%' }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Grid item xs={12} sm={6}>
          <CardTitle>{title}</CardTitle>
        </Grid>
        {showFormControls && (
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2} justifyContent="end">
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <NormalInput
                    type="search"
                    revealed
                    placeholder="Search..."
                    height="50px"
                    value={searchValue}
                    onChange={handleSearch}
                  />
                </FormControl>
              </Grid>
              {/* <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <NormalSelect placeholder="Type" options={[]} />
                </FormControl>
              </Grid> */}
              {/* <Grid item xs={12} sm={3}>
                <FormControl fullWidth>
                  <NormalSelect placeholder="Type" options={[]} />
                </FormControl>
              </Grid> */}
            </Grid>
          </Grid>
        )}
        {/* <Grid
          item
          xs={12}
          sm={2}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <ToggleButtonGroup
            value={filter}
            exclusive
            onChange={(event, newFilter) => {
              if (newFilter !== null) {
                setFilter(newFilter)
              }
            }}
            aria-label="text alignment"
          >
            <ToggleButton value={'1'} size="small">
              <Icon
                iconName="sort"
                iconColor={
                  filter === '1' ? 'white' : color.brandColor.primary.main
                }
                fontSize="25px"
                padding="4px"
              />
            </ToggleButton>
            <ToggleButton value={'2'} size="small">
              <Icon
                iconName="tips_and_updates"
                iconColor={
                  filter === '2' ? 'white' : color.brandColor.primary.main
                }
                fontSize="25px"
                padding="4px"
              />
            </ToggleButton>
            <ListWrap sx={{ mr: '20px' }} />
            <ToggleButton value={'3'} size="small">
              <Icon
                iconName="list"
                iconColor={
                  filter === '3' ? 'white' : color.brandColor.primary.main
                }
                fontSize="25px"
                padding="4px"
              />
            </ToggleButton>
            <ToggleButton value={'4'} size="small">
              <Icon
                iconName="map"
                iconColor={
                  filter === '4' ? 'white' : color.brandColor.primary.main
                }
                fontSize="25px"
                padding="4px"
              />
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid> */}
      </Grid>
    </HeaderWrap>
  )
}

TitleWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
  setFilter: PropTypes.func.isRequired,
  MeetTableComponent: PropTypes.elementType,
  showFormControls: PropTypes.bool,
  searchValue: PropTypes.string,
  setSearchValue: PropTypes.any,
}

export default TitleWrapper
