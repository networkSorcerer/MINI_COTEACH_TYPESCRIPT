import { TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../../models/search';
import SearchResulList from './SearchResulList';

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album],
  });
  console.log('search', data);
  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };
  return (
    <div>
      <Typography variant="h1" my="10px">
        Let's Find Something For Your Playlist
      </Typography>
      <TextField value={keyword} onChange={handleSearchKeyword}></TextField>
      {data?.pages.map((item) => {
        if (!item.tracks) return false;
        return <SearchResulList list={item.tracks?.items} />;
      })}
    </div>
  );
};

export default EmptyPlaylistWithSearch;
