import React from 'react';
import { useParams } from 'react-router-dom';
import useGetPlaylist from '../../hooks/useGetPlaylist';

const PlaylistDetailPage = () => {
  const { id } = useParams();
  const { data } = useGetPlaylist({ playlistId: id });
  return <div>PlaylistDetailPage</div>;
};

export default PlaylistDetailPage;
