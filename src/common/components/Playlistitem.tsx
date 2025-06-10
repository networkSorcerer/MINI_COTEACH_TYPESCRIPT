import React from 'react';
import { ListItemAvatar, ListItemText, Typography, styled, Avatar, Box } from '@mui/material';

interface PlaylistItemProps {
  image: string | null;
  name: string;
  artistName: string | null;
  id: string;
}

const PlaylistitemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  transition: 'background-color 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PlaylistAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(6),
  height: theme.spacing(6),
  marginRight: theme.spacing(2),
}));

const PlaylistName = styled(Typography)(({ theme }) => ({
  fontWeight: theme.typography.fontWeightMedium,
  color: theme.palette.text.primary,
}));

const Playlistitem = ({ image, name, artistName, id }: PlaylistItemProps) => {
  return (
    <PlaylistitemContainer>
      <ListItemAvatar>{image ? <PlaylistAvatar src={image} alt={name} /> : 'No image'}</ListItemAvatar>
      <ListItemText
        primary={<PlaylistName variant="body1">{name}</PlaylistName>}
        secondary={
          <Typography variant="body2" color="text.secondary">
            {artistName}
          </Typography>
        }
      />
    </PlaylistitemContainer>
  );
};

export default Playlistitem;
