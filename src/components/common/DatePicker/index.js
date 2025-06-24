import React from 'react'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
  DesktopDatePicker,
  DesktopDateTimePicker,
  MobileDatePicker,
  MobileDateTimePicker,
} from '@mui/x-date-pickers'
import moment from 'moment'
import 'moment/locale/en-gb'
import { Button, Box } from '@mui/material'
import PropTypes from 'prop-types'
import { useMediaQuery } from '@mui/material'

const TodayButtonToolbar = ({ onTodayClick }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0.5rem',
        paddingRight: '1rem',
      }}
    >
      <Button
        variant="text"
        onClick={onTodayClick}
        sx={{
          minWidth: 'auto',
          padding: '0.25rem 0.5rem',
        }}
      >
        Today
      </Button>
    </Box>
  )
}

const DatePicker = (props) => {
  const {
    value,
    placeholderText,
    minDate,
    maxDate,
    onChange,
    disabled,
    showTimeInput,
    showYearPicker,
    StartTime,
  } = props

  moment.locale('en-gb')
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'))

  const customStyles = {
    backgroundColor: '#e8edf1',
    width: '-webkit-fill-available',
    borderColor: '#e8edf1',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    boxSizing: 'border-box',
    // height: '48px',
    justifyContent: 'center',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e8edf1',
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#e8edf1',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: '#868686 !important',
      borderRadius: '8px',
    },
    '& .Mui-error': {
      borderColor: 'transparent !important',
    },
    '& .MuiInputBase-input': {
      color: 'black',
      height: '30px',
      borderRadius: '8px',
    },
    '& css-1fix5d6-MuiInputBase-root-MuiOutlinedInput-root .MuiInputBase-input':
      {
        color: '#9e9e9e',
      },
    '&:hover .MuiInputBase-root': {
      borderColor: '#868686 !important',
      // borderWidth: '1px',
    },
    '& .MuiFormControl-root.MuiTextField-root:focus-visible .MuiOutlinedInput-notchedOutline':
      {
        // borderColor: '#868686 !important',
      },
    '& .MuiFormControl-root.MuiTextField-root:hover .MuiOutlinedInput-notchedOutline':
      {
        borderColor: '#868686 !important',
      },
  }

  const handleTodayClick = () => {
    onChange(moment())
  }

  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      {showTimeInput ? (
        isMobile ? (
          <MobileDateTimePicker
            value={value ? moment(value) : null}
            disabled={disabled}
            minDate={minDate ? moment(minDate) : undefined}
            maxDate={maxDate ? moment(maxDate) : undefined}
            format="DD/MM/YYYY HH:mm"
            onChange={onChange}
            views={['year', 'month', 'day', 'hours', 'minutes']}
            slotProps={{
              textField: {
                size: 'small',
                placeholder: placeholderText,
                sx: customStyles,
              },
            }}
          />
        ) : (
          <DesktopDateTimePicker
            value={value ? moment(value) : null}
            disabled={disabled}
            minDate={minDate ? moment(minDate) : undefined}
            maxDate={maxDate ? moment(maxDate) : undefined}
            minDateTime={StartTime ? moment(StartTime) : undefined}
            format="DD/MM/YYYY HH:mm"
            onChange={onChange}
            ampm={false}
            views={['year', 'month', 'day', 'hours', 'minutes']}
            slotProps={{
              textField: {
                size: 'small',
                // readOnly: true,
                placeholder: placeholderText,
                sx: customStyles,
              },
              layout: {
                sx: {
                  display: 'flex',
                  flexDirection: 'column-reverse',
                },
              },
            }}
            slots={{
              toolbar: () => (
                <TodayButtonToolbar onTodayClick={handleTodayClick} />
              ),
            }}
            // viewRenderers={{
            //   hours: renderTimeViewClock,
            //   minutes: renderTimeViewClock,
            //   seconds: renderTimeViewClock,
            // }}
          />
        )
      ) : showYearPicker ? (
        <DesktopDatePicker
          views={['year']}
          value={value ? moment(value) : null}
          onChange={onChange}
          minDate={minDate ? moment(minDate) : undefined}
          maxDate={maxDate ? moment(maxDate) : undefined}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              size: 'small',
              // readOnly: true,
              placeholder: placeholderText,
              sx: customStyles,
            },
            layout: {
              sx: {
                display: 'flex',
                flexDirection: 'column-reverse',
              },
            },
          }}
          slots={{
            toolbar: () => (
              <TodayButtonToolbar onTodayClick={handleTodayClick} />
            ),
          }}
        />
      ) : isMobile ? (
        <MobileDatePicker
          disabled={disabled}
          value={value ? moment(value) : null}
          minDate={minDate ? moment(minDate) : undefined}
          onChange={onChange}
          maxDate={maxDate ? moment(maxDate) : undefined}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              size: 'small',
              placeholder: placeholderText,
              sx: customStyles,
            },
          }}
        />
      ) : (
        <DesktopDatePicker
          disabled={disabled}
          value={value ? moment(value) : null}
          minDate={minDate ? moment(minDate) : undefined}
          onChange={onChange}
          maxDate={maxDate ? moment(maxDate) : undefined}
          format="DD/MM/YYYY"
          slotProps={{
            textField: {
              size: 'small',
              // readOnly: true,
              placeholder: placeholderText,
              sx: customStyles,
            },
            layout: {
              sx: {
                display: 'flex',
                flexDirection: 'column-reverse',
              },
            },
          }}
          slots={{
            toolbar: () => (
              <TodayButtonToolbar onTodayClick={handleTodayClick} />
            ),
          }}
        />
      )}
    </LocalizationProvider>
  )
}

// Define prop types
DatePicker.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(moment)])
    .isRequired,
  placeholderText: PropTypes.string,
  minDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
  ]),
  maxDate: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
  ]),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  showTimeInput: PropTypes.bool,
  showYearPicker: PropTypes.bool,
  StartTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(moment),
  ]),
}

TodayButtonToolbar.propTypes = {
  onTodayClick: PropTypes.func.isRequired,
}

// Set default props
DatePicker.defaultProps = {
  placeholderText: '',
  minDate: null,
  maxDate: null,
  disabled: false,
  showTimeInput: false,
  showYearPicker: false,
  StartTime: null,
}

export default DatePicker
