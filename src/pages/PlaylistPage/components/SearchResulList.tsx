import React from 'react';
import { Track } from '../../../models/playlist';
import { Typography } from '@mui/material';

interface SearchResultListProps {
  list: Track[];
}
const SearchResulList = ({ list }: SearchResultListProps) => {
  return (
    <div>
      {list.map((track) => (
        <Typography variant="h2">{track.name}</Typography>
      ))}
    </div>
  );
};

export default SearchResulList;
