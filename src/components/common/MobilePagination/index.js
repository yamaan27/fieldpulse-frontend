import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import PropTypes from 'prop-types'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'
import styled from 'styled-components'
import { color } from 'services/colors'

const PaginationContainer = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 0;
`

const PageButton = styled(Typography)`
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 4px;
  margin: 0 4px;
  transition:
    background 0.2s,
    color 0.2s;

  &:hover {
    background: ${color.brandColor.secondary['light']};
    color: white;
  }

  ${({ isActive }) =>
    isActive &&
    `
    background: ${color.brandColor.secondary['main']}; 
    color: white; 
  `}
`

const ArrowButton = styled(IconButton)`
  color: black;
  margin: 0 8px;

  &:disabled {
    opacity: 0.9;
    cursor: not-allowed;
  }
`

const MobilePagination = ({ count, page, rowsPerPage, setPage }) => {
  const totalPages = Math.ceil(count / rowsPerPage)
  const displayedPages = []

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) {
      displayedPages.push(i)
    }
  } else {
    displayedPages.push(1, 2)

    if (page > 3) {
      displayedPages.push('...')
    }

    if (page > 2 && page < totalPages - 1) {
      displayedPages.push(page)
    }

    if (totalPages - page > 2) {
      displayedPages.push('...')
    }

    displayedPages.push(totalPages - 1, totalPages)
  }

  return (
    <PaginationContainer mb={2}>
      <ArrowButton onClick={() => setPage(page - 1)} disabled={page === 1}>
        <ChevronLeft />
      </ArrowButton>

      {displayedPages.map((num, index) => (
        <Box key={index} mx={0.5}>
          {num === '...' ? (
            <Typography>...</Typography>
          ) : (
            <PageButton onClick={() => setPage(num)} isActive={num === page}>
              {num}
            </PageButton>
          )}
        </Box>
      ))}

      <ArrowButton
        onClick={() => setPage(page + 1)}
        disabled={page === totalPages}
      >
        <ChevronRight />
      </ArrowButton>
    </PaginationContainer>
  )
}

MobilePagination.propTypes = {
  count: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
}

export default MobilePagination
