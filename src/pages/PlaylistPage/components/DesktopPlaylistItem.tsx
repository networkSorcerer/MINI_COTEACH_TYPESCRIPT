import React from 'react';
import { Episode, PlaylistTrack, Track } from '../../../models/playlist';
import { styled, TableCell, TableRow } from '@mui/material';
interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '& .MuiTableCell-root': {
    borderBottom: 'none',
  },
}));
const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const isEpisode = (track: Track | Episode): track is Episode => {
    return 'description' in track;
  };
  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>{item.track.name || 'no name'}</TableCell>
      <TableCell>{isEpisode(item.track) ? 'N/A' : item.track.album?.name}</TableCell>
      <TableCell>{item.added_at || 'Unknown'}</TableCell>
      <TableCell>{item.track.duration_ms || 'Unknown'}</TableCell>
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
