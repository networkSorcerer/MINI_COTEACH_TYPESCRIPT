import { Widgets } from "@mui/icons-material";
import React, { useEffect, useRef, useState } from "react";
import { Track } from "../../models/playlist";
import { useInView } from "react-intersection-observer";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import LoadingScreen from "../../common/components/LoadingScreen";
import Library2 from "./component/Library2";
const StyledList = styled("ul")({
  listStyle: "none",
  padding: 0,
  margin: 0,
  overflowY: "auto",
  maxHeight: "600px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  /* 2) Firefox */
  scrollbarWidth: "none",
  /* 3) IE, Edge */
  "-ms-overflow-style": "none",
});
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
  height: "400px",
  "&::-webkit-scrollbar": {
    display: "none",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const AlbumImage = styled("img")({
  borderRadius: "4px",
  marginRight: "12px",
});
const ProfileMenu = styled(Menu)({
  "& .MuiPaper-root": {
    color: "white",
    minWidth: "160px",
  },
});
const ProfileMenuItem = styled(MenuItem)({
  "&:hover": {
    backgroundColor: "#444",
  },
});
interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  playlistId: string;
}

const SearchResultPage = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  playlistId,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();
  const [selectedTrackUri, setSelectedTrackUri] = useState<string | null>(null); // ⭐ 이 상태를 추가

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data: userProfile } = useGetCurrentUserProfile();
  const { id } = useParams<{ id: string }>();
  console.log("result", list);
  const handleMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    track: Track
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedTrackUri(track.uri); // ⭐ 메뉴가 열릴 때 해당 track의 URI 저장
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const getMyPlaylist = () => {};
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);
  return (
    <Box width="100%">
      <StyledTableContainer>
        <Typography>Songs</Typography>
        <TableBody sx={{ width: "100%" }}>
          {list.map((track) => (
            <StyledTableRow key={track.id}>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <AlbumImage
                    src={track.album?.images[0]?.url || ""}
                    width="40px"
                    alt="album cover"
                  />
                  <Box>
                    <Typography fontWeight={700}>{track.name}</Typography>
                    <Typography color="text.secondary">
                      {track.artists ? track.artists[0].name : "Unknown Artist"}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>
              <TableCell>{track.album?.name}</TableCell>
              <TableCell>
                <>
                  <Button onClick={(event) => handleMenuOpen(event, track)}>
                    Add
                  </Button>
                  <ProfileMenu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    keepMounted
                  >
                    <ProfileMenuItem>
                      {userProfile ? (
                        // ⭐ selectedTrackUri가 유효할 때만 Library2를 렌더링하도록 조건 추가
                        selectedTrackUri ? (
                          <Library2 trackUri={selectedTrackUri} />
                        ) : (
                          "트랙 URI를 불러오는 중..." // 또는 로딩/에러 메시지
                        )
                      ) : (
                        "로그인하세요"
                      )}{" "}
                    </ProfileMenuItem>
                  </ProfileMenu>
                </>
              </TableCell>
            </StyledTableRow>
          ))}
          <div ref={ref} style={{ height: 1 }}>
            {isFetchingNextPage && <LoadingScreen />}
          </div>
        </TableBody>
      </StyledTableContainer>
    </Box>
  );
};

export default SearchResultPage;
