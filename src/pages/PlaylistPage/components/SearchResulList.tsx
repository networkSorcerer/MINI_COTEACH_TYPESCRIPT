import { useInView } from "react-intersection-observer";
import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { Track } from "../../../models/playlist";
import LoadingScreen from "../../../common/components/LoadingScreen";
import useGetCurrentUserProfile from "../../../hooks/useGetCurrentUserProfile";
import { getSpotifyAuthUrl } from "../../../utils/auth";
import useAddMusicToPlaylist from "../../../hooks/useAddMusicToPlaylist";
import { useParams } from "react-router-dom";

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.background.paper,
  color: theme.palette.common.white,
  width: "100%",
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

interface SearchResultListProps {
  list: Track[];
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  playlistId: string; // playlist_id를 props로 받음
}

const SearchResultList = ({
  list,
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  playlistId,
}: SearchResultListProps) => {
  const [ref, inView] = useInView();
  const { data: userProfile } = useGetCurrentUserProfile();
  const { id } = useParams<{ id: string }>();
  const { mutate: addMusicToPlaylist } = useAddMusicToPlaylist(id);
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleAddMusic = (trackUri: string) => {
    console.log("trackUri", trackUri);
    if (userProfile) {
      addMusicToPlaylist({
        uris: [trackUri],
        position: 0, // 원하는 위치 지정 (옵션)
      });
    } else {
      getSpotifyAuthUrl();
    }
  };

  return (
    <StyledTableContainer>
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
              <Button onClick={() => handleAddMusic(track.uri)}>Add</Button>
            </TableCell>
          </StyledTableRow>
        ))}
        <div ref={ref} style={{ height: 1 }}>
          {isFetchingNextPage && <LoadingScreen />}
        </div>
      </TableBody>
    </StyledTableContainer>
  );
};

export default SearchResultList;
