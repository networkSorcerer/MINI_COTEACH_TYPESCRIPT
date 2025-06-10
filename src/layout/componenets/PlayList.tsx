import { styled, Typography } from '@mui/material';
import React from 'react';

// Spotify Playlist item type 지정 (API 응답 형태 기준으로)
interface PlaylistItem {
  id?: string;
  name?: string;
  images?: { url: string }[];
}

interface PlayListProps {
  playlists: PlaylistItem[];
}

const StyledListItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#555',
  },
});

const PlayList: React.FC<PlayListProps> = ({ playlists }) => {
  return (
    <>
      {playlists.map((playlist) => (
        <StyledListItem key={playlist.id}>
          <img
            src={playlist.images?.[0]?.url || 'https://via.placeholder.com/50'}
            alt={playlist.name}
            style={{ width: '50px', height: '50px', borderRadius: '4px' }}
          />
          <Typography variant="body2">{playlist.name}</Typography>
        </StyledListItem>
      ))}
    </>
  );
};

export default PlayList;
