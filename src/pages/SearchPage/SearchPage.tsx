import React, { useState } from "react";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import LoadingScreen from "../../common/components/LoadingScreen";
import SearchIcon from "@mui/icons-material/Search";
import SearchResultPage from "./SearchResultPage";
import { styled } from "@mui/material/styles"; // ★ 꼭 필요
import MusicCategories from "./component/MusicCategories";
import TopResult from "./component/TopResult";
import Songs from "./component/Songs";
import Artists from "./component/Artists";
import Albums from "./component/Albums";
import { useNavigate } from "react-router-dom";

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: "100%",
  "& .MuiInputBase-root": {
    borderRadius: "4px",
    backgroundColor: theme.palette.action.active,
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "gray", // CSS 속성 camelCase
    },
    "&.Mui-focused fieldset": {
      borderColor: "grey", // CSS 속성 camelCase
    },
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: "16px",
  width: "100%",

  flex: 1, // flex 컨테이너의 아이템일 경우 남은 공간을 채움
  minHeight: 0, // flex item일 때 스크롤이 제대로 동작하도록
  overflowY: "auto", // Y축으로 스크롤바 표시
  overflowX: "hidden", // X축 스크롤바는 숨김 (대부분의 경우 필요 없음)

  // 웹킷 기반 브라우저(Chrome, Safari 등)의 스크롤바 숨김
  "&::-webkit-scrollbar": {
    display: "none",
  },
  // IE, Edge의 스크롤바 숨김
  msOverflowStyle: "none",
  // Firefox의 스크롤바 숨김 (scrollbar-width는 auto, thin, none 가능)
  scrollbarWidth: "none",
}));

const ResultContainer = styled("div")({
  display: "flex",
  padding: "16px",
  width: "100%",
  height: "auto",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");
  const navigate = useNavigate();
  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });
  console.log("search", data);
  const tracks = data?.pages.flatMap((page) => page.tracks?.items) ?? [];
  const artists = data?.pages.flatMap((page) => page.artists?.items) ?? [];
  const albums = data?.pages.flatMap((page) => page.albums?.items) ?? [];
  console.log("tracks", tracks);
  console.log("artists", artists);
  console.log("albums", albums);
  const hasResults = tracks.length > 0;

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value; // ★ 이벤트에서 최신 값 가져옴
    setKeyword(newKeyword); // 상태 업데이트 (이건 그냥 두어도 됨)

    if (newKeyword.trim() !== "") {
      // ★ 최신 값 사용
      navigate(`/search/${newKeyword}`); // ★ 최신 값 사용
    } else {
      navigate(`/search`);
    }
  };

  return (
    <>
      <SearchContainer>
        <Box display="inline-block">
          <Typography variant="h1" my="10px">
            Let's find something for your playlist
          </Typography>
          <StyledTextField
            value={keyword}
            autoComplete="off"
            variant="outlined"
            placeholder="Search for songs or episodes"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: "white" }} />
                  </InputAdornment>
                ),
              },
            }}
            onChange={handleSearchKeyword}
          />
        </Box>
        <div>
          {isLoading ? (
            <LoadingScreen />
          ) : hasResults ? (
            <ResultContainer>
              <TopResult list={tracks} />
              <SearchResultPage
                list={tracks}
                hasNextPage={hasNextPage}
                isFetchingNextPage={isFetchingNextPage}
                fetchNextPage={fetchNextPage}
              />
              {/* <Artists list={artists} />
              <Albums list={albums} /> */}
            </ResultContainer>
          ) : keyword === "" ? (
            <>
              <MusicCategories />
            </>
          ) : (
            <div>{`No Result for "${keyword}"`}</div>
          )}
        </div>
      </SearchContainer>
    </>
  );
};

export default SearchPage;
