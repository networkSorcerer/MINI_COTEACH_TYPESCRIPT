import { Box, styled, Typography, Button } from '@mui/material';
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from './componenets/LibraryHead'; // 경로 확인
import Navbar from './componenets/Navbar'; // 경로 확인
import Library from './componenets/Library'; // 경로 확인

// theme 임포트는 AppLayout 밖에서 또는 App.js/tsx에서 <ThemeProvider>로 감싸주세요.
// styled 컴포넌트 내부에서 theme에 접근하려면 (theme) => ({ ... }) 형식으로 사용해야 합니다.

// --- 1. 최상위 레이아웃 컨테이너 ---
const AppRootLayout = styled(Box)({ // 이름을 Layout에서 AppRootLayout으로 변경
  display: 'flex', // 사이드바와 메인 콘텐츠를 가로로 배치
  height: '100vh', // 뷰포트 전체 높이 차지 (padding은 box-sizing 덕분에 포함됨)
  // padding은 이제 각 내부 컴포넌트 (SidebarContainer, MainContentArea)에서 관리하는 것이 더 좋음
  // padding: '8px', // 여기서는 제거
});

// --- 2. 사이드바 컨테이너 ---
const SidebarContainer = styled(Box)(({ theme }) => ({ // 이름을 Sidebar에서 SidebarContainer로 변경 (Box 기반)
  width: '320px',
  height: '100%', // 부모(AppRootLayout)의 높이 100% 차지
  display: 'flex',
  flexDirection: 'column', // 사이드바 내부 콘텐츠를 세로로 정렬
  padding: '8px', // 사이드바 자체의 내부 패딩
  backgroundColor: '#000', // Spotify 사이드바 배경색 (예시)
  gap: '8px', // Sidebar 내부의 ContentBox들 간의 간격
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

// --- 3. 메인 콘텐츠 영역 (사이드바 옆 나머지 공간) ---
const MainContentArea = styled(Box)(({ theme }) => ({
  flex: 1, // 남은 수평 공간을 모두 차지
  display: 'flex',
  flexDirection: 'column', // 메인 콘텐츠 내부를 세로로 정렬 (Navbar, Outlet)
  minWidth: 0, // flex item일 때 내부 콘텐츠가 넘치지 않도록 방지
  // 전체 AppRootLayout에 padding을 주지 않았다면, 이곳에서 오른쪽 패딩을 줄 수 있습니다.
  padding: '8px', // MainContentArea 자체의 내부 패딩
  backgroundColor: '#121212', // Spotify와 유사한 어두운 배경색 (이곳이 스크롤되면서 계속 이어져야 할 색상)
}));

// --- 4. 메인 콘텐츠 영역 내에서 스크롤 가능한 부분 ---
const ScrollableOutletWrapper = styled(Box)({
  flex: 1, // 남은 수직 공간을 모두 차지
  overflowY: 'auto', // 이 영역의 콘텐츠가 넘칠 때만 스크롤바 표시
  overflowX: 'hidden', // 수평 스크롤바 숨김

  // 스크롤바 숨김 스타일
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE, Edge
  scrollbarWidth: "none", // Firefox
});


// --- 기존 Sidebar 내부 컴포넌트 스타일은 그대로 유지 ---
const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
  // marginBottom: '8px', // SidebarContainer에서 gap으로 대체 가능
  // marginRight: '8px', // SidebarContainer의 flex-direction이 column이므로 불필요
}));

const StyledNavLink = styled(NavLink)(({ theme }) => ({
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  gap: '20px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.text.primary,
  },
  '&.active': {
    color: theme.palette.text.primary,
  },
}));

const NavList = styled('ul')({
  listStyle: 'none',
  padding: 0,
  margin: 0,
});

const LibraryBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  flex: 1, // 남은 수직 공간을 모두 차지하도록 설정 (LibraryHead 아래의 라이브러리 목록)
  // height: '100%', // 이 대신 flex: 1 사용
  padding: '8px',
  // marginBottom: '8px', // SidebarContainer에서 gap으로 대체 가능
  // marginRight: '8px', // SidebarContainer의 flex-direction이 column이므로 불필요
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden', // LibraryBox 내부에서 다시 스크롤이 필요하면 이 안에 또 다른 overflow:auto Box 필요
}));


const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <AppRootLayout> {/* 뷰포트 전체를 차지 */}
      <SidebarContainer> {/* 사이드바 영역 */}
        <ContentBox> {/* Home, Search 링크 컨테이너 */}
          <NavList>
            <li> {/* ul > li > a 구조가 일반적 */}
              <StyledNavLink to="/">
                <HomeIcon />
                <Typography onClick={() => navigate('/')} variant="h2" fontWeight={700}>
                  Home
                </Typography>
              </StyledNavLink>
            </li>
            <li>
              <StyledNavLink to="/search">
                <SearchIcon />
                <Typography onClick={() => navigate('/search')} variant="h2" fontWeight={700}>
                  Search
                </Typography>
              </StyledNavLink>
            </li>
          </NavList>
        </ContentBox>
        <LibraryBox> {/* 라이브러리 영역 */}
          <LibraryHead />
          {/* Library 컴포넌트 내부에 실제 스크롤되는 목록이 있다면, Library 내부에서 overflow: auto 처리 */}
          <Library />
        </LibraryBox>
      </SidebarContainer>

      <MainContentArea> {/* 메인 콘텐츠 영역 (사이드바 옆) */}
        <Navbar /> {/* 상단 내비게이션 바 (고정될 수 있음) */}
        <ScrollableOutletWrapper> {/* 실제 페이지 내용이 렌더링되고 스크롤될 영역 */}
          <Outlet />
        </ScrollableOutletWrapper>
      </MainContentArea>
    </AppRootLayout>
  );
};

export default AppLayout;