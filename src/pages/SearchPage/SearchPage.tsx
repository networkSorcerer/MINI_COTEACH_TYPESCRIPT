import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useSearchItemsByKeyword from '../../hooks/useSearchItemsByKeyword';
import { SEARCH_TYPE } from '../../models/search';
import { Box, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import LoadingScreen from '../../common/components/LoadingScreen';
import SearchIcon from '@mui/icons-material/Search';
import SearchResultPage from './SearchResultPage';
import { styled } from '@mui/material/styles';
import MusicCategories from './component/MusicCategories';
import TopResult from './component/TopResult';
import Artists from './component/Artists';
import Albums from './component/Albums';

const StyledTextField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiInputBase-root': {
    borderRadius: '4px',
    backgroundColor: theme.palette.action.active,
    color: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'transparent',
    },
    '&:hover fieldset': {
      borderColor: 'gray',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'grey',
    },
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  padding: '16px',
  width: '100%',
  flex: 1,
  minHeight: 0,
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
}));

const ResultContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  padding: '16px',
  width: '100%',
  height: 'auto',
  overflow: 'auto',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  msOverflowStyle: 'none',
  scrollbarWidth: 'none',
  marginBottom: theme.spacing(4),
}));

const SearchPage = () => {
  const { keyword: paramKeyword } = useParams<{ keyword?: string }>();
  const [keyword, setKeyword] = useState<string>(paramKeyword || '');
  const navigate = useNavigate();

  // URL 파라미터가 바뀌면 keyword 상태도 동기화
  useEffect(() => {
    if (paramKeyword !== undefined && paramKeyword !== keyword) {
      setKeyword(paramKeyword);
    }
  }, [paramKeyword, keyword]);

  const { data, error, isLoading } = useSearchItemsByKeyword({
    q: keyword,
    type: [SEARCH_TYPE.Track, SEARCH_TYPE.Album, SEARCH_TYPE.Artist],
  });

  const tracks = data?.pages.flatMap((page) => page.tracks?.items) ?? [];
  const artists = data?.pages.flatMap((page) => page.artists?.items) ?? [];
  const albums = data?.pages.flatMap((page) => page.albums?.items) ?? [];
  const hasResults = tracks.length > 0;

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newKeyword = event.target.value;
    setKeyword(newKeyword);

    if (newKeyword.trim() !== '') {
      navigate(`/search/${newKeyword}`);
    } else {
      navigate(`/search`);
    }
  };

  return (
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
                  <SearchIcon style={{ color: 'white' }} />
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
          <>
            <ResultContainer container spacing={3}>
              <Grid item xs={12} md={5}>
                <TopResult list={tracks} />
              </Grid>
              <Grid item xs={12} md={7}>
                <SearchResultPage list={tracks} />
              </Grid>
            </ResultContainer>
            <Artists list={artists} />
            <Albums list={albums} />
          </>
        ) : keyword === '' ? (
          <MusicCategories />
        ) : (
          <div>{`No Result for "${keyword}"`}</div>
        )}
      </div>
    </SearchContainer>
  );
};

export default SearchPage;
