import {
  AddMusicToPlaylistItems,
  AddMusicToPlaylistItemsRes,
  CreatePlaylistRequest,
  GetCurrentUserPlaylistRequest,
  GetCurrentUserPlaylistResponse,
  GetPlaylistItemsRequest,
  GetPlaylistRequest,
  Playlist,
  PlaylistTrack,
} from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({
  limit,
  offset,
}: GetCurrentUserPlaylistRequest): Promise<GetCurrentUserPlaylistResponse> => {
  try {
    const response = await api.get(`/me/playlists`, {
      params: { limit, offset },
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch current user playlists");
  }
};

export const getPlaylist = async (
  params: GetPlaylistRequest
): Promise<Playlist> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}`, {
      params: params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist detail");
  }
};

export const getPlaylistItems = async (
  params: GetPlaylistItemsRequest
): Promise<PlaylistTrack> => {
  try {
    const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
      params,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to fetch playlist items");
  }
};

export const createPlaylist = async (
  user_id: string,
  params: CreatePlaylistRequest
): Promise<Playlist> => {
  try {
    const { name, playlistPublic, collaborative, description } = params;
    const response = await api.post(`/users/${user_id}/playlists`, {
      name,
      public: playlistPublic,
      collaborative,
      description,
    });
    return response.data;
  } catch (error) {
    throw new Error("fail to create playlist");
  }
};

export const addMusicToPlaylist = async (
  playlist_id: string,
  params: AddMusicToPlaylistItems
): Promise<AddMusicToPlaylistItemsRes> => {
  console.log("여기는 api id", playlist_id);
  console.log("여기는 api params", params);
  try {
    const { uris, position } = params;
    const response = await api.post(`/playlists/${playlist_id}/tracks`, params);
    return response.data;
  } catch (error) {
    throw new Error("fail to create playlist");
  }
};
