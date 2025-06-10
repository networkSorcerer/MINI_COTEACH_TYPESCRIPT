import { styled, Typography } from '@mui/material';
import React from 'react';
import { SimplifiedPlaylist } from '../../models/playlist';
import Playlistitem from '../../common/components/Playlistitem';
import { useNavigate } from 'react-router-dom';

// Spotify Playlist item type 지정 (API 응답 형태 기준으로)
interface PlaylistItem {
  id?: string;
  name?: string;
  images?: { url: string }[];
  artistName: string | null;
}

interface PlayListProps {
  playlists: SimplifiedPlaylist[];
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

const PlayList = ({ playlists }: PlayListProps) => {
  const navigate = useNavigate();
  const handleClick = (id: string) => {
    navigate(`/playlist/${id}`);
  };
  return (
    <>
      {playlists.map((item) => (
        <Playlistitem
          handleClick={handleClick}
          name={item.name || ''}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ''}
          key={item.id}
          artistName={'Playlist' + item.owner?.display_name}
        />
      ))}
      {/* {playlists.map((playlist) => (
        <StyledListItem key={playlist.id} onClick={() => handleClick(id)}>
          <img
            src={playlist.images?.[0]?.url || 'https://via.placeholder.com/50'}
            alt={playlist.name}
            style={{ width: '50px', height: '50px', borderRadius: '4px' }}
          />
          <Typography variant="body2">{playlist.name}</Typography>
        </StyledListItem>
      ))} */}
    </>
  );
};

export default PlayList;
