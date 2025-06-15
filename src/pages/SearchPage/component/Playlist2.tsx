import { styled, Typography, Snackbar, Alert } from "@mui/material"; // ⭐ Snackbar, Alert 임포트 추가
import { useNavigate } from "react-router-dom";
import { SimplifiedPlaylist } from "../../../models/playlist";
import Playlistitem from "../../../common/components/Playlistitem";
import { addMusicToPlaylist } from "../../../apis/playlistApi";
import { getSpotifyAuthUrl } from "../../../utils/auth";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import React, { useState } from "react"; // ⭐ useState 훅 임포트 추가

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
  // const navigate = useNavigate(); // useNavigate는 현재 코드에서 사용되지 않아 제거해도 무방합니다.

  // ⭐ Snackbar 관련 로컬 상태 추가
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "info" | "warning"
  >("success");

  console.log("trackUriPlaylist2", trackUri2);

  // ⭐ Snackbar 닫기 핸들러
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClick = async (playlist_id: string) => {
    // ⭐ async 키워드 추가
    if (userProfile) {
      try {
        await addMusicToPlaylist(playlist_id, {
          // ⭐ await 키워드 추가
          uris: [trackUri2],
          position: 0, // 원하는 위치 지정 (옵션)
        });
        // ⭐ 성공 메시지 설정 및 스낵바 열기
        setSnackbarMessage("음악이 플레이리스트에 추가되었습니다!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      } catch (error) {
        console.error("음악 추가 실패:", error);
        // ⭐ 실패 메시지 설정 및 스낵바 열기
        setSnackbarMessage(
          `음악 추가 실패: ${
            error instanceof Error ? error.message : "알 수 없는 오류 발생"
          }`
        );
        setSnackbarSeverity("error");
        setSnackbarOpen(true);

        // Spotify 인증 오류 발생 시 로그인 유도
        // 에러 객체의 구조에 따라 `(error as any).status` 또는 `(error as AxiosError).response?.status` 등으로 접근
        if (error && (error as any).status === 401) {
          // 예시: 401 Unauthorized 오류
          getSpotifyAuthUrl();
        }
      }
    } else {
      // ⭐ 로그인 필요 메시지 설정 및 스낵바 열기
      setSnackbarMessage("플레이리스트에 음악을 추가하려면 로그인해야 합니다.");
      setSnackbarSeverity("info"); // 정보성 메시지
      setSnackbarOpen(true);
      getSpotifyAuthUrl(); // 로그인 안 된 경우 Spotify 인증 URL로 이동
    }
  };

  return (
    <>
      {playlists.map((item) => (
        <Playlistitem
          handleClick={handleClick} // Playlistitem이 클릭될 때 handleClick(item.id)를 호출한다고 가정
          name={item.name || ""}
          image={(item.images && item.images[0]?.url) || null}
          id={item.id || ""}
          key={item.id}
          artistName={"Playlist" + item.owner?.display_name}
        />
      ))}

      {/* ⭐ Snackbar 컴포넌트를 PlayList2 내부에 직접 배치 */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000} // 3초 후 자동 닫힘
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // 하단 중앙에 표시
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default PlayList2;
