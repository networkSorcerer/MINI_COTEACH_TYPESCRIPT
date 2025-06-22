import React from "react";
import moment from "moment";
import { Episode, PlaylistTrack, Track } from "../../../models/playlist";
import { styled, TableCell, TableRow, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface DesktopPlaylistItemProps {
  index: number;
  item: PlaylistTrack;
}

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .MuiTableCell-root": {
    borderBottom: "none",
  },
}));

const DesktopPlaylistItem = ({ item, index }: DesktopPlaylistItemProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // 'sm' 이하 = 모바일

  const isEpisode = (track: Track | Episode): track is Episode => {
    return "description" in track;
  };

  return (
    <StyledTableRow>
      <TableCell>{index}</TableCell>
      <TableCell>
        {/* 모바일: 이미지 + 제목 / 데스크탑: 제목만 */}
        {isMobile ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              src={
                isEpisode(item.track)
                  ? item.track.images?.[0]?.url
                  : item.track.album?.images?.[0]?.url
              }
              alt={item.track.name}
              style={{ width: 40, height: 40, marginRight: 8 }}
            />
            {item.track.name || "no name"}
          </div>
        ) : (
          item.track.name || "no name"
        )}
      </TableCell>
      {/* 데스크탑에서만 표시되는 부분 */}
      {!isMobile && (
        <>
          <TableCell>
            {isEpisode(item.track) ? "N/A" : item.track.album?.name}
          </TableCell>
          <TableCell>
            {item.added_at
              ? moment(item.added_at).format("YYYY-MM-DD")
              : "Unknown"}
          </TableCell>
          <TableCell>
            {isEpisode(item.track)
              ? "N/A"
              : moment.utc(item.track.duration_ms).format("mm:ss")}
          </TableCell>
        </>
      )}
    </StyledTableRow>
  );
};

export default DesktopPlaylistItem;
