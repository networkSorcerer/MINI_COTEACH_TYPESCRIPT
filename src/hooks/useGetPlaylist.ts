import { useQuery } from '@tanstack/react-query';
import { GetPlaylistRequest } from '../models/playlist';

const useGetPlaylist = (params: GetPlaylistRequest) => {
  return useQuery({
    queryKey: ['playlist-detail', params.playlistId],
    queryFn: () => {
      return getPlaylist(params);
    },
  });
};

export default useGetPlaylist;
