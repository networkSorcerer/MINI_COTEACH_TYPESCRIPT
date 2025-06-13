import { useMutation, useQueryClient } from '@tanstack/react-query';
import useGetCurrentUserProfile from './useGetCurrentUserProfile';
import { AddMusicToPlaylistItems } from '../models/playlist';
import { addMusicToPlaylist } from '../apis/playlistApi';

const useAddMusicToPlaylist = (playlistIdFromParent?: string) => {
  const queryClient = useQueryClient();
  const { data: user } = useGetCurrentUserProfile();
  console.log('여기는 useAdd 훅 ', playlistIdFromParent);
  return useMutation({
    mutationFn: (params: AddMusicToPlaylistItems) => {
      if (!playlistIdFromParent) {
        return Promise.reject(new Error('playlist_id is undefined'));
      }
      if (!user) {
        return Promise.reject(new Error('user is not defined'));
      }
      return addMusicToPlaylist(playlistIdFromParent, params);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['playlist-detail', playlistIdFromParent] });
      console.log('성공');
    },
  });
};

export default useAddMusicToPlaylist;
