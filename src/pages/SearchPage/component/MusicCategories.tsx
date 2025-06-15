import useGetMusicCategries from "../../../hooks/useGetMusicCategries";
import LoadingScreen from "../../../common/components/LoadingScreen";
import { Box, Grid, Typography } from "@mui/material";
import ErrorMessage from "../../../common/components/ErrorMessage";
import CategoryCard from "../../../common/components/CategoryCard";
import Grid2 from "@mui/material/Unstable_Grid2";
import { display, styled } from "@mui/system";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
const StyledBox = styled(Grid)(({ theme }) => ({
  padding: 0,
  margin: 0,
  overflowY: "auto",
  maxHeight: "600px",
  "&::webkit-scrollbar": {
    display: "none",
  },
  scrollbarWidth: "none",
  "-ms-overflow-style": "none",
}));
const MusicCategories = () => {
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetMusicCategries();
  console.log("categories", data);
  const listRef = useRef<HTMLDivElement | null>(null);
  const { ref: sentinelRef, inView } = useInView({
    root: listRef.current,
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <StyledBox>
      <Typography variant="h1" padding="8px">
        Browse all
      </Typography>
      {data && data.pages && data.pages.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.pages.flatMap(
            (
              page // data.pages 배열을 순회하며 각 페이지에 접근
            ) =>
              page.categories.items.map(
                (
                  category // 각 페이지의 categories.items를 다시 map
                ) => (
                  <Grid2 xs={6} sm={4} md={2} key={category.id}>
                    {" "}
                    {/* key는 고유한 값이어야 합니다. Spotify API에서 카테고리 id를 사용하는 것이 더 안전합니다. category.href도 고유하다면 사용 가능합니다. */}
                    <CategoryCard
                      href={category.href}
                      icons={category.icons[0]?.url} // icons 배열이 비어있을 수 있으므로 옵셔널 체이닝 ? 추가
                      name={category.name}
                    ></CategoryCard>
                  </Grid2>
                )
              )
          )}
        </Grid2>
      ) : (
        // 데이터 로딩 중이거나 에러 상태에 따라 다른 메시지를 표시할 수 있습니다.
        // 예: isLoading ? <CircularProgress /> : <Typography variant="h2">NO DATA</Typography>
        <Typography variant="h2">NO DATA</Typography>
      )}
    </StyledBox>
  );
};

export default MusicCategories;
