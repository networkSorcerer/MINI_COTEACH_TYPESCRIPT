import React, { Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchWithKeywordPage from './pages/SearchPage/SearchWithKeywordPage';
import PlaylistDetailPage from './pages/PlaylistPage/PlaylistDetailPage';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage';
import LoadingScreen from './common/components/LoadingScreen';
import './App.css';
import CallbackPage from './common/components/CallbackPage';
import useExchangeToken from './hooks/useExchangeToken';
import SearchResultPage from './pages/SearchPage/SearchResultPage';
import Counter from './redux/counter';
import Library from './layout/componenets/Library';
import LibraryHead from './layout/componenets/LibraryHead';
const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HopePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
// 0. 사이드바 있어야 함 (플레이리스트, 메뉴뉴)
// 1. 홈페이지 /
// 2. 서치페이지 /search
// 3. 서치 결과 페이지 /search/:keyword
// 4. 플레이리스트 디테일 페이지 /playlist/:id
// 5. 모바일 버전 플레이리스트 보여주는 페이지 /playlist

function App() {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  let codeVerifier = localStorage.getItem('code_verifier');
  const { mutate: exchangeToken } = useExchangeToken();
  useEffect(() => {
    if (code && codeVerifier) {
      exchangeToken({ code, codeVerifier });
    }
  }, [code, codeVerifier, exchangeToken]);
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<HomePage />}></Route>
          <Route path="search" element={<SearchPage />}>
            <Route index element={<SearchResultPage />} />
            <Route path=":keyword" element={<SearchResultPage />} />
          </Route>
          <Route path="library" element={<LibraryHead />}>
            <Route index element={<Library />} />
            <Route path="" element={<Library />} />
          </Route>
          <Route path="playlist/:id" element={<PlaylistDetailPage />}></Route>
          <Route path="playlist" element={<PlaylistPage />}></Route>
          <Route path="count" element={<Counter />}></Route>
        </Route>
        {/* <Route path="/callback" element={<CallbackPage />} /> */}
      </Routes>
    </Suspense>
  );
}

export default App;
