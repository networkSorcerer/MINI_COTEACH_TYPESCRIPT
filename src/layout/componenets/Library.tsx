import React from 'react';
import EmptyPlaylist from './EmptyPlaylist';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import './Library.css'; // 스타일 따로 작성 (아래 참고)
import { Box, styled, Typography } from '@mui/material';

const StyledList = styled('ul')({
  listStyle: 'none', // 기본 점 없애기
  padding: 0, // 기본 padding 제거
  margin: 0, // 기본 margin 제거
  maxHeight: '300px', // 최대 높이 설정 (원하는 크기로)
  overflowY: 'auto', // 세로 스크롤 가능하게
});

const StyledListItem = styled('li')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '8px 12px',
  borderRadius: '8px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: '#f0f0f0',
  },
});

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });

  return (
    <StyledList>
      {data?.items.length === 0 ? (
        <li>
          <Typography variant="body2">플레이리스트가 없습니다.</Typography>
        </li>
      ) : (
        data?.items.map((playlist) => (
          <StyledListItem key={playlist.id}>
            <img
              src={playlist.images?.[0]?.url || 'https://via.placeholder.com/50'}
              alt={playlist.name}
              style={{ width: '50px', height: '50px', borderRadius: '4px' }}
            />
            <Typography variant="body2">{playlist.name}</Typography>
          </StyledListItem>
        ))
      )}
    </StyledList>
  );
};

export default Library;
