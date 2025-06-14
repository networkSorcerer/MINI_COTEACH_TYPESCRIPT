import { Widgets } from '@mui/icons-material';
import React from 'react';
import { Track } from '../../models/playlist';
import { useInView } from 'react-intersection-observer';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { useParams } from 'react-router-dom';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: '100%',
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
  return <div></div>;
};

export default SearchResultPage;
