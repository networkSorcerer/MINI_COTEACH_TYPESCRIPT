import React from 'react';
import { Box, Typography, Avatar, IconButton } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

// Artist 타입 정의
interface Artist {
  id: string;
  name: string;
  images: { url: string }[];
}

interface ArtistsProps {
  list: Artist[];
}

const Artists = ({ list }: ArtistsProps) => {
  return (
    <Box sx={{ mb: 4 }} display="block">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Artists
      </Typography>
      <Grid2 container spacing={2}>
        {list.map((artist) => (
          <Grid2 xs={4} sm={3} md={2} key={artist.id}>
            <Box
              sx={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                '&:hover .play-button': {
                  transform: 'translate(-50%, -50%) scale(1.1)',
                  opacity: 1,
                },
              }}
            >
              <Avatar
                src={artist.images[0]?.url || 'placeholder-artist.png'}
                alt={artist.name}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 1,
                  border: '1px solid grey',
                }}
              />
              <Typography variant="subtitle1">{artist.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Artist
              </Typography>
              <IconButton
                className="play-button"
                sx={{
                  position: 'absolute',
                  top: '70%',
                  left: '70%',
                  transform: 'translate(-50%, -50%) scale(0)',
                  bgcolor: 'rgba(0, 128, 0, 0.8)',
                  color: 'white',
                  opacity: 0,
                  transition: 'all 0.3s ease',
                }}
                aria-label="play"
              >
                <PlayArrowIcon fontSize="large" />
              </IconButton>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Artists;
