import React from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { Typography, Button, styled, Box } from '@mui/material';
import theme from '../../theme';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';

const LibraryHeadStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
}));
const LibraryHead = () => {
  const { mutate: createPlaylist } = useCreatePlaylist();
  const handleCreatePlaylist = () => {
    createPlaylist({ name: '나의 플레이 리스트' });
  };
  return (
    <>
      <LibraryHeadStyle>
        <BookmarkIcon />
        <Typography varient="h1" fontWeight={700}>
          Your Library
        </Typography>
        <Button onClick={handleCreatePlaylist}>
          <AddIcon />
        </Button>
      </LibraryHeadStyle>
    </>
  );
};

export default LibraryHead;
