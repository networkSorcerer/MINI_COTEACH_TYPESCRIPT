import { styled, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { SimplifiedPlaylist } from "../../../models/playlist";
import Playlistitem from "../../../common/components/Playlistitem";
import { addMusicToPlaylist } from "../../../apis/playlistApi";
import { getSpotifyAuthUrl } from "../../../utils/auth";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";

// Spotify Playlist item type 지정 (API 응답 형태 기준으로)
interface PlaylistItem {
  id?: string;
  name?: string;
  images?: { url: string }[];
  artistName: string | null;
}

interface PlayListProps {
  playlists: SimplifiedPlaylist[];
  trackUri2: string;
}

const StyledListItem = styled("li")({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "8px 12px",
  borderRadius: "8px",
  cursor: "pointer",
  transition: "background-color 0.2s ease",
  "&:hover": {
    backgroundColor: "#555",
  },
});

const PlayList2 = ({ playlists, trackUri2 }: PlayListProps) => {
  const { data: userProfile } = useGetCurrentUserProfile();
  console.log("trackUriPlaylist2", trackUri2);
  const handleClick = (id: string) => {
    if (userProfile) {
      addMusicToPlaylist(id, {
        uris: [trackUri2],
        position: 0, // 원하는 위치 지정 (옵션)
      });
    } else {
      getSpotifyAuthUrl();
    }
  };
  return (
    <>
      {playlists.map((item) => (
        <Playlistitem
          handleClick={handleClick}
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ""}
          key={item.id}
          artistName={"Playlist" + item.owner?.display_name}
        />
      ))}
      {/* {playlists.map((playlist) => (
        <StyledListItem key={playlist.id} onClick={() => handleClick(id)}>
          <img
            src={playlist.images?.[0]?.url || 'https://via.placeholder.com/50'}
            alt={playlist.name}
            style={{ width: '50px', height: '50px', borderRadius: '4px' }}
          />
          <Typography variant="body2">{playlist.name}</Typography>
        </StyledListItem>
      ))} */}
    </>
  );
};

export default PlayList2;
