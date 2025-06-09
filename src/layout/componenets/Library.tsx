import React from 'react';
import EmptyPlaylist from './EmptyPlaylist';
import useGetCurrentUserPlaylists from '../../hooks/useGetCurrentUserPlaylists';

const Library = () => {
  const { data } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  console.log('ddd', data);
  return (
    <div>
      <EmptyPlaylist></EmptyPlaylist>
    </div>
  );
};

export default Library;
