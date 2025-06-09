import { Box, Button, styled, Typography } from '@mui/material';
import React from 'react';
const LibraryHelp = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  width: '90%',
  height: '130px',
  borderRadius: '8px',
  backgroundColor: '#1e1e1e',
  marginTop: '20px',
  padding: '10px',
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: '20px',
  fontWeight: '700',
});
const EmptyPlaylist = () => {
  return (
    <div>
      {' '}
      <LibraryHelp>
        {' '}
        <Typography variant="h2" fontWeight={700}>
          Create your first playlist
        </Typography>
        <Typography variant="body2">It's easy, we'll help you</Typography>
        <CreatePlaylistButton variant="contained" color="secondary">
          Create playlist
        </CreatePlaylistButton>
      </LibraryHelp>
    </div>
  );
};

export default EmptyPlaylist;
