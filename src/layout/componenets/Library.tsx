import React, { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { styled } from '@mui/material';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import LoadingScreen from '../../common/components/LoadingScreen';
import ErrorMessage from '../../common/components/ErrorMessage';
import EmptyPlaylist from './EmptyPlaylist';
import PlayList from './PlayList';

const StyledList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
  overflowY: 'auto',
  maxHeight: '400px',
  /* 스크롤바 숨기기 */
  /* 1) WebKit 기반 브라우저 (Chrome, Safari) */
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  /* 2) Firefox */
  scrollbarWidth: 'none',
  /* 3) IE, Edge */
  '-ms-overflow-style': 'none',
});

const Library = () => {
  const listRef = useRef<HTMLUListElement>(null);
  // rootElement를 스크롤 컨테이너로 지정
  const { ref: sentinelRef, inView } = useInView({
    root: listRef.current,
    rootMargin: '0px',
    threshold: 0.1,
  });

  const { data, isLoading, error, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetCurrentUserPlaylists({
    limit: 10,
    offset: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) return <LoadingScreen />;
  if (error) return <ErrorMessage errorMessage={error.message} />;

  const pages = data?.pages ?? [];
  const totalItems = pages[0]?.total ?? 0;
  if (totalItems === 0) return <EmptyPlaylist />;

  return (
    <StyledList ref={listRef}>
      {pages.map((page, pageIndex) => page.items.map((pl) => <PlayList key={pl.id} playlists={[pl]} />))}
      {/* 스크롤 끝에서 이 div가 보이면 다음 페이지 로드 */}
      <li ref={sentinelRef} style={{ height: 1 }} />
      {isFetchingNextPage && (
        <li>
          <LoadingScreen />
        </li>
      )}
    </StyledList>
  );
};

export default Library;
