import { Widgets } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { Track } from '../../models/playlist';
import { useInView } from 'react-intersection-observer';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useParams } from 'react-router-dom';
import { Box, Button, styled, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import LoadingScreen from '../../common/components/LoadingScreen';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: '100%',
  height: '400px',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
}));

const AlbumImage = styled('img')({
  borderRadius: '4px',
  marginRight: '12px',
});

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  playlistId: string;
}

const SearchResultPage = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  playlistId,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();
  const { data: userProfile } = useGetCurrentUserProfile();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <StyledTableContainer>
      <TableBody sx={{ width: '100%' }}>
        {list.map((track) => (
          <StyledTableRow key={track.id}>
            <TableCell>
              <Box display="flex" alignItems="center">
                <AlbumImage src={track.album?.images[0]?.url || ''} width="40px" alt="album cover" />
                <Box>
                  <Typography fontWeight={700}>{track.name}</Typography>
                  <Typography color="text.secondary">
                    {track.artists ? track.artists[0].name : 'Unknown Artist'}
                  </Typography>
                </Box>
              </Box>
            </TableCell>
            <TableCell>{track.album?.name}</TableCell>
            <TableCell>
              <Button>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <div ref={ref} style={{ height: 1 }}>
          {isFetchingNextPage && <LoadingScreen />}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultPage;
