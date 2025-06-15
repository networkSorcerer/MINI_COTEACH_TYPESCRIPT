import React from "react";
import { Box, Typography, Avatar } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2"; // Grid2 임포트
import { Track } from "../../../models/playlist";

// Artist 타입 정의가 필요합니다.
// interface Artist { id: string; name: string; images: { url: string }[]; /* ... */ }

interface ArtistsProps {
  artists: Track[]; // Artist[] 타입으로 교체 필요
}

const Artists = ({ artists }: ArtistsProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Artists
      </Typography>
      <Grid2 container spacing={2}>
        {artists.map((artist) => (
          <Grid2 xs={4} sm={3} md={2} key={artist.id}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Avatar
                src={artist.images[0]?.url || "placeholder-artist.png"}
                alt={artist.name}
                sx={{
                  width: 100,
                  height: 100,
                  mb: 1,
                  border: "1px solid grey",
                }} // 아티스트 이미지는 보통 원형이므로 border-radius 적용
              />
              <Typography variant="subtitle1">{artist.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Artist
              </Typography>
            </Box>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Artists;
