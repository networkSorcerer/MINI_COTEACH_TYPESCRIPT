import { ApiResponse } from './apiResponse';
import { ExternalUrls, Followers, Image, Owner } from './commonType';

export interface GetCurrentUserPlaylistRequest {
  limit?: number;
  offset?: number;
}

export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>;

export interface SimplifiedPlaylist extends BasePlaylist {
  tracks?: {
    href: string;
    total: number;
  };
}

export interface GetPlaylistRequest {
  playlist_id: string;
  market?: string;
  fields?: string;
  additional_types?: string;
}

export interface Playlist extends BasePlaylist {
  tracks: ApiResponse<PlaylistTrack>;
  followers: Followers;
}

export interface BasePlaylist {
  collaborative?: boolean;
  description?: string | null;
  external_urls: ExternalUrls;
  href?: string;
  id?: string;
  images?: Image[];
  name?: string;
  owner: Owner;
  public?: boolean;
  snapshot_id?: string;
  type?: 'playlist';
  url?: string;
}

export interface PlaylistTrack {
  added_at?: string | null;
  added_by?: {
    external_urls?: ExternalUrls;
    followers?: Followers;
    href?: string;
    id?: string;
    type?: string;
    uri?: string;
  };
  is_local?: boolean;
  track: Track | Episode;
}
export type RestrictionReason = 'market' | 'product' | 'explicit';
export interface Track {
  album?: {
    album_type: string;
    total_tracks: BigInteger;
    available_markets: string[];
    external_urls: ExternalUrls;
    name: string;
    release_date: string;
    release_date_precision: string;
    images: Image;
    href: string;
    id: string;
    restriction: RestrictionReason;
    type: string;
    uri: string;
    artist: {
      external_urls: ExternalUrls;
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    };
  };
  artists?: {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  };
  available_markets?: string[];
  disc_number?: BigInteger;
  duration_ms?: BigInteger;
  explicit?: boolean;
  external_ids?: {
    isrc: string;
    ean: string;
    upc: string;
  };
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  is_playable?: boolean;
  linked_from?: Track;
  restrictions?: {
    reason: string;
  };
  name?: string;
  popularity?: BigInteger;
  preview_url?: string | null;
  track_number?: BigInteger;
  type?: 'track';
  uri?: string;
  is_local?: boolean;
}
export interface Episode {
  //   audio_preview_url: string | null;
  description: string;
  html_description: string;
  duration_ms: BigInteger;

  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point?: {
    fully_played?: boolean;
    resume_position_ms?: BigInteger;
  };
  type: 'episode';
  uri: string;
  restrictions?: {
    reason: string;
  };
  show: {
    available_markets: string[];
    copyrights: {
      text: string;
      type: string;
    }[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image;
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: 'show';
    uri: string;
    total_episodes: BigInteger;
  };
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
  offset?: number;
  limit?: number;
}

export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>;

export interface CreatePlaylistRequest {
  name: string;
  playlistPublic?: boolean;
  collaborative?: boolean;
  description?: string;
}

export type SimplifiedEpisode = Omit<Episode, 'show'>;

export interface AddMusicToPlaylistItems {
  uris?: string[];
  position?: number;
}

export interface AddMusicToPlaylistItemsRes {
  snapshot_id?: string;
}
