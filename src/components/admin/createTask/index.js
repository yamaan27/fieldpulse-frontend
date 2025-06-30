import { Box, Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { color } from 'services/colors'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import React from 'react'
import AddchartIcon from '@mui/icons-material/Addchart'
import TitleWrapper from 'components/common/TitleWrapper'
import { TaskTable } from './taskTable'

const LogMeetingButton = styled("button")({
  backgroundColor: "#324559",
  color: "white",
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "20px",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#005bb5",
  },
  "& .MuiSvgIcon-root": {
    marginRight: "8px",
    color: "white",
    fill: "white",
  },
});

const BoxWrapper = styled(Box)`
  border-radius: 24px;
  background: white;
  border: 1px solid ${color.brandColor.primary['900']};
  padding-bottom: 20px;
  margin-bottom: 100px;
  position: relative;
  ${(props) => props.theme.breakpoints.only('xs')} {
    margin-bottom: 250px;
  }
`

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

  ${(props) => props.theme.breakpoints.down('md')} {
    display: flex;
    justify-content: center;
    border-radius: 16px 16px 0 0;
  }
`

const CreateTaskComp = () => {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('1')
  const [searchValue, setSearchValue] = useState('')
  const handleLogMeet = () => {
    navigate('/meeting_log/add_meeting/form')
  }
  useEffect(() => {
    if (!searchValue.length) setSearchValue('')
  }, [searchValue])
  return (
    <>
      <BoxWrapper>
        <Grid item xs={12} style={{ width: '100%' }}>
          <TitleWrapper
            title="Task List"
            filter={filter}
            setFilter={setFilter}
            showFormControls={true}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
          <TaskTable
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </Grid>
      </BoxWrapper>

      <FixedButtonWrapper>
        <LogMeetingButton onClick={handleLogMeet}>
          <AddchartIcon />
          Create Task
        </LogMeetingButton>
      </FixedButtonWrapper>
    </>
  )
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({}, dispatch)
}

CreateTaskComp.propTypes = {}

CreateTaskComp.defaultProps = {}

export const CreateTask = connect(null, mapDispatchToProps)(CreateTaskComp)
