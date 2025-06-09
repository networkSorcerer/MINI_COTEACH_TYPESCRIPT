import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Typography, Button, styled, Box } from '@mui/material';
import theme from '../../theme';

const LibraryHeadStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
}));
const LibraryHead = () => {
  return (
    <LibraryHeadStyle>
      {' '}
      <BookmarkIcon />
      <Typography varient="h1" fontWeight={700}>
        Your Library
      </Typography>
      <Button>
        <AddIcon />
      </Button>
    </LibraryHeadStyle>
  );
};

export default LibraryHead;
