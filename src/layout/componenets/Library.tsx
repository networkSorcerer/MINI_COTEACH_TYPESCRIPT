import React, { useEffect } from 'react';
import EmptyPlaylist from './EmptyPlaylist';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import './Library.css'; // 스타일 따로 작성 (아래 참고)
import { Box, styled, Typography } from '@mui/material';
import LoadingScreen from '../../common/components/LoadingScreen';
import ErrorMessage from '../../common/components/ErrorMessage';
import PlayList from './PlayList';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useInView } from 'react-intersection-observer';

const StyledList = styled('ul')({
  listStyle: 'none', // 기본 점 없애기
  padding: 0, // 기본 padding 제거
  margin: 0, // 기본 margin 제거
  maxHeight: '300px', // 최대 높이 설정 (원하는 크기로)
  overflowY: 'auto', // 세로 스크롤 가능하게
});

const Library = () => {
  const { ref, inView } = useInView();

  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);
  console.log('ddd', data);
  const { data: user } = useGetCurrentUserProfile();
  if (!user) return <EmptyPlaylist />;

  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      {!data || data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <StyledList>
          {data?.pages.map((page, index) => (
            <PlayList playlists={page.items} key={index} />
          ))}
          <div ref={ref}>{isFetchingNextPage && <LoadingScreen />}</div>
        </StyledList>
      )}
    </div>
  );
};

export default Library;
