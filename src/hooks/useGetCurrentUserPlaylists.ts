import { useQueries, useQuery } from '@tanstack/react-query';
import { getCurrentUserProfile } from '../apis/userApi';
import { getCurrentUserPlaylists } from '../apis/playlistApi';
import { GetCurrentUserPlaylistRequest } from '../models/playlist';

const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistRequest) => {
  return useQuery({
    queryKey: ['current-user-playlists'],
    queryFn: () => {
      return getCurrentUserPlaylists({ limit, offset });
    },
  });
};

export default useGetCurrentUserPlaylists;
