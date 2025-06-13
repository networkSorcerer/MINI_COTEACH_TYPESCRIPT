import React, { useEffect, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import useGetPlaylist from '../../hooks/useGetPlaylist';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import {
  Box,
  Grid,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import DefaultImage from '../../layout/componenets/DefaultImage';
import useGetPlaylistItems from '../../hooks/useGetPlaylistItems';
import DesktopPlaylistItem from './components/DesktopPlaylistItem';
import { PAGE_LIMIT } from '../../configs/commonConfig';
import { useInView } from 'react-intersection-observer';
import LoadingScreen from '../../common/components/LoadingScreen';
import EmptyPlaylistWithSearch from './components/EmptyPlaylistWithSearch';
import LoginButton from '../../common/components/LoginButton';
import ErrorMessage from '../../common/components/ErrorMessage';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  maxHeight: '300px',
  borderRadius: '8px',
  overflowY: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none', // IE and Edge
  scrollbarWidth: 'none', // Firefox
  position: 'relative',
}));

const PlaylistHeader = styled('div')(({ theme }) => ({
  overflowY: 'auto',
  position: 'sticky',
  display: 'flex',
  alignItems: 'center',
  background: ' linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)',
  padding: '16px',
  zIndex: 1, // 헤더가 위에 오도록
}));

const ImageGrid = styled(Grid)(({ theme }) => ({
  minHeight: '100px',
  maxHeight: '130px',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    width: '50%',
  },
}));

const AlbumImage = styled('img')(({ theme }) => ({
  borderRadius: '8px',
  height: 'auto',
  width: '50%',

  [theme.breakpoints.down('md')]: {
    maxWidth: '200px',
  },
}));

const StyledDefaultImage = styled(DefaultImage)(({ theme }) => ({
  borderRadius: '8px',
  height: 'auto',
  width: '50%',
  display: 'flex', // 내부 아이콘 중앙 정렬 위해
  justifyContent: 'center',
  alignItems: 'center',

  [theme.breakpoints.down('md')]: {
    maxWidth: '200px',
  },

  // 내부 svg 아이콘 크기 조절
  '& svg': {
    width: '100%', // 부모 크기에 맞게 늘림
    height: '80%',
    maxWidth: '200px', // 반응형 최대 크기 설정
  },
}));

const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: '3rem',
  textAlign: 'left',

  [theme.breakpoints.down('md')]: {
    fontSize: '1rem',
  },
}));

const PlaylistDetailPage = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { ref: sentinelRef, inView } = useInView({
    root: containerRef.current,
    threshold: 1.0, // 마지막 row가 완전히 보여야 트리거
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  const { id } = useParams<string>();
  console.log('id', id);

  if (id === undefined) return <Navigate to="/" />;

  const { data: playlist, isLoading: isPlaylistLoading, error: playlistError } = useGetPlaylist({ playlist_id: id });

  const {
    data: playlistItems,
    isLoading: isPlaylistItemsLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  console.log('playlistItems', playlistItems);

  if (error || playlistError) {
    if (error?.status === 401 || playlistItems === undefined) {
      //로그인을 안해서 권한 없음 에러라면 로그인 버튼
      return (
        <Box display="flex" alignItems="center" justifyContent="center" height="100%" flexDirection="column">
          <Typography variant="h2" fontWeight={700} mb="20px">
            다시 로그인 하세요
          </Typography>
          <LoginButton />
        </Box>
      );
    }
    return <ErrorMessage errorMessage="Failed to load" />; // 정말 리스트 가져오기 실패라면 fail to load
  }
  return (
    <div>
      <PlaylistHeader container spacing={7}>
        <ImageGrid item sm={12} md={2}>
          {playlist?.images ? (
            <AlbumImage src={playlist?.images[0].url} alt="playlist_cover.jpg" />
          ) : (
            <StyledDefaultImage>
              <MusicNoteIcon fontSize="large" />
            </StyledDefaultImage>
          )}
        </ImageGrid>
        <Grid item sm={12} md={10}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5" width="20px" />
              <Typography variant="subtitle1" color="white" ml={1} fontWeight={700}>
                {playlist?.owner?.display_name ? playlist?.owner.display_name : 'unknown'}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>

      <StyledTableContainer ref={containerRef}>
        {playlist?.tracks?.total === 0 ? (
          <EmptyPlaylistWithSearch></EmptyPlaylistWithSearch>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {playlistItems?.pages.map((page, pageIndex) =>
                page.items.map((item, itemIndex) => (
                  <DesktopPlaylistItem
                    item={item}
                    key={pageIndex * PAGE_LIMIT + itemIndex + 1}
                    index={pageIndex * PAGE_LIMIT + itemIndex + 1}
                  />
                ))
              )}
              <TableRow sx={{ height: '5px' }} ref={sentinelRef} />
              {isFetchingNextPage && (
                <TableRow>
                  <TableCell colSpan={5}>
                    <LoadingScreen />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </StyledTableContainer>
    </div>
  );
};

export default PlaylistDetailPage;
