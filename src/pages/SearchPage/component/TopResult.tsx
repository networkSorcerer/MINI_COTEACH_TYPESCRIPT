import React from "react";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import { Box, Grid, styled, Typography, useTheme } from "@mui/material"; // useTheme 추가
import { Track } from "../../../models/playlist"; // Track 타입 임포트 경로 확인
import DefaultImage from "../../../layout/componenets/DefaultImage"; // DefaultImage 경로 확인

// Track 타입 정의 (만약 models/playlist.ts에 없다면 여기에 추가)
// Spotify API 응답에 맞춰 정확하게 정의해야 합니다.
/*
interface Artist {
  name: string;
  id: string;
  // ... 기타 속성
}

interface Image {
  url: string;
  height: number;
  width: number;
}

interface Album {
  album_type: string;
  images: Image[];
  name: string;
  // ... 기타 속성
}

export interface Track {
  id: string;
  name: string;
  artists: Artist[];
  album: Album; // album이 항상 있을 경우 (없으면 album?: Album으로)
  // ... 기타 속성
}
*/

const StyledTopResultCard = styled(Box)(({ theme }) => ({
  // 스크린샷과 유사한 카드 디자인
  backgroundColor: theme.palette.background.paper, // 또는 특정 색상 (e.g., '#1A1A1A')
  borderRadius: "8px",
  padding: "16px",
  display: "flex", // 내부 아이템 (이미지, 텍스트)을 세로로 배치하기 위해
  flexDirection: "column", // 아이템을 세로로 정렬
  alignItems: "flex-start", // 왼쪽 정렬
  gap: "16px", // 아이템 간 간격
  width: "50%", // 부모 컨테이너 너비에 맞춤
  maxWidth: "400px", // 스크린샷처럼 어느 정도 너비 제한 (선택 사항)
  cursor: "pointer", // 클릭 가능한 요소처럼 보이도록
  transition: "background-color 0.3s ease",
  "&:hover": {
    backgroundColor: theme.palette.action.hover, // 호버 시 배경색 변경
  },
}));

const AlbumImage = styled("img")({
  borderRadius: "8px",
  width: "50%", // 카드 너비에 맞춰 꽉 채움
  height: "auto",
  aspectRatio: "1 / 1", // 정사각형 유지
  objectFit: "cover", // 이미지가 잘리지 않게
});

const StyledDefaultImage = styled(DefaultImage)(({ theme }) => ({
  borderRadius: "8px",
  width: "100%", // 카드 너비에 맞춰 꽉 채움
  height: "auto",
  aspectRatio: "1 / 1", // 정사각형 유지
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: theme.palette.action.active, // 기본 이미지 배경색
  "& svg": {
    width: "50%", // 아이콘 크기
    height: "50%",
    color: theme.palette.text.secondary, // 아이콘 색상
  },
}));

interface TopResultProps {
  track: Track; // ★ 단일 Track 객체를 props로 받습니다.
}

const TopResult = ({ list }: TopResultProps) => {
  // ★ track 단일 객체로 변경
  const theme = useTheme(); // 테마 접근을 위해 useTheme 훅 사용

  console.log("TopResult - Received track:", list);

  if (!list) {
    return null; // track이 없으면 아무것도 렌더링하지 않음 (오류 방지)
  }

  // 이미지 URL을 안전하게 가져오기
  const imageUrl = list[0].album?.images?.[0]?.url;

  // 아티스트 이름을 안전하게 가져오기
  const artistNames =
    list[0].artists?.map((artist) => artist.name).join(", ") ||
    "알 수 없는 아티스트";

  return (
    <Box sx={{ mb: 4 }} width="100%">
      {" "}
      {/* 상단 여백, 이 Box는 TopResult 섹션의 제목을 감싸는 역할 */}
      <Typography variant="h5" sx={{ mb: 2 }} width="40%">
        Top result
      </Typography>
      <StyledTopResultCard>
        {" "}
        {/* 실제 카드 스타일을 적용한 Box */}
        {imageUrl ? (
          <AlbumImage
            src={imageUrl}
            alt={list.name || "Track Image"} // alt 속성 추가
          />
        ) : (
          <StyledDefaultImage>
            <MusicNoteIcon />{" "}
            {/* size prop이 아닌 styled-component에서 크기 조절 */}
          </StyledDefaultImage>
        )}
        <Box sx={{ width: "100%" }}>
          {" "}
          {/* 텍스트 정보를 감싸는 Box */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {list.name}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            Song • {artistNames}
          </Typography>
        </Box>
        {/* TODO: 호버 시 재생 버튼 추가 */}
        {/* <Box sx={{ position: 'absolute', bottom: 16, right: 16 }}>
              <PlayCircleFilledIcon fontSize="large" sx={{ color: 'primary.main' }} />
          </Box> */}
      </StyledTopResultCard>
    </Box>
  );
};

export default TopResult;
