import { Typography, IconButton, Box } from '@mui/material';
import React from 'react';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

interface CardProps {
  name: string;
  image: string;
  artistName: string | undefined;
}

const Card = ({ image, name, artistName }: CardProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        position: 'relative',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 3,
        cursor: 'pointer',
        '&:hover .play-button': {
          opacity: 1,
          transform: 'scale(1)',
        },
      }}
    >
      <img src={image} alt={name} style={{ width: '100%', display: 'block', height: 'auto' }} />

      {/* 재생 버튼: 기본적으로 숨겨져 있다가 hover 시 보임 */}
      <IconButton
        className="play-button"
        sx={{
          position: 'absolute',
          top: '70%',
          left: '70%',
          transform: 'translate(-50%, -50%) scale(0)',
          bgcolor: 'rgba(0, 128, 0, 0.8)', // 초록색 배경
          color: 'white',
          opacity: 0,
          transition: 'all 0.3s ease',
          '&:hover': {
            bgcolor: 'green',
            transform: 'translate(-50%, -50%) scale(1.1)',
          },
        }}
        aria-label="play"
        onClick={() => alert(`Play album: ${name}`)}
      >
        <PlayArrowIcon fontSize="large" />
      </IconButton>

      <Typography>{name}</Typography>
      <Typography>{artistName}</Typography>
    </Box>
  );
};

export default Card;
