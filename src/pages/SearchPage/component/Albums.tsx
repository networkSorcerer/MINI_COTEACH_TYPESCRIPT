import React from "react";
import { Box, Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CategoryCard from "../../../common/components/CategoryCard";
import { Track } from "../../../models/playlist";

// Album 타입 정의가 필요합니다.
// interface Album { id: string; name: string; images: { url: string }[]; artists: { name: string }[]; /* ... */ }

interface AlbumsProps {
  albums: Track[]; // Album[] 타입으로 교체 필요
}

const Albums = ({ albums }: AlbumsProps) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Albums
      </Typography>
      <Grid2 container spacing={2}>
        {albums.map((album) => (
          <Grid2 xs={6} sm={4} md={2} key={album.id}>
            <CategoryCard
              href={album.href} // 앨범 상세 페이지 링크
              icons={album.images[0]?.url}
              name={album.name}
              // CategoryCard에 artist 이름도 표시하고 싶다면 props 추가
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Albums;
