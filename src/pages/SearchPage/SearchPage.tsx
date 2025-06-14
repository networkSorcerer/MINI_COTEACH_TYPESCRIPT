import React, { useState } from "react";
import useSearchItemsByKeyword from "../../hooks/useSearchItemsByKeyword";
import { SEARCH_TYPE } from "../../models/search";
import { Box, InputAdornment, TextField, Typography } from "@mui/material";
import LoadingScreen from "../../common/components/LoadingScreen";
import SearchIcon from "@mui/icons-material/Search";
import SearchResultPage from "./SearchResultPage";
import { styled } from "@mui/material/styles"; // ★ 꼭 필요
import MusicCategories from "./component/MusicCategories";

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

const SearchContainer = styled(Box)({
  padding: "16px",
  width: "100%",
  height: "60%",
  overflow: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const SearchPage = () => {
  const [keyword, setKeyword] = useState<string>("");

  const {
    data,
    error,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items) ?? [];

  const hasResults = tracks.length > 0;

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
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
            <SearchResultPage
              list={tracks}
              hasNextPage={hasNextPage}
              isFetchingNextPage={isFetchingNextPage}
              fetchNextPage={fetchNextPage}
            />
          ) : keyword === "" ? (
            <></>
          ) : (
            <div>{`No Result for "${keyword}"`}</div>
          )}
        </div>
      </SearchContainer>
      야 왜 아무것도 안나와
      <MusicCategories />
    </>
  );
};

export default SearchPage;
