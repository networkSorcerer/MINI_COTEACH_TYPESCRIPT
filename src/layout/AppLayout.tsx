import { Box, styled, Typography, Button } from '@mui/material';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import theme from '../theme';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryHead from './componenets/LibraryHead';
import { useNavigate } from 'react-router-dom';
import Navbar from './componenets/Navbar';
import Library from './componenets/Library';

const Layout = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '8px',
});
const Sidebar = styled('div')(({ theme }) => ({
  width: '320px',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
  },
}));

const ContentBox = styled(Box)(({ theme }) => ({
  borderRadius: '8px',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  width: '100%',
  padding: '8px',
  marginBottom: '8px',
  marginRight: '8px',
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
  height: '100%', // 기존 유지
  padding: '8px',
  marginBottom: '8px',
  marginRight: '8px',
  display: 'flex',
  flexDirection: 'column', // 세로로
  overflow: 'hidden', // 자식 스크롤 제한
}));

const AppLayout = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Sidebar>
        <ContentBox>
          <NavList>
            <StyledNavLink to="/">
              <HomeIcon />
              <Typography onClick={() => navigate('/')} variant="h2" fontWeight={700}>
                Home
              </Typography>
            </StyledNavLink>
            <StyledNavLink to="/search">
              <SearchIcon />
              <Typography onClick={() => navigate('/search')} variant="h2" fontWeight={700}>
                Search
              </Typography>
            </StyledNavLink>
          </NavList>
        </ContentBox>
        <LibraryBox>
          <LibraryHead />
          <Library />
        </LibraryBox>
      </Sidebar>
      <ContentBox>
        <Navbar />
        <Outlet />
      </ContentBox>
    </Layout>
  );
};

export default AppLayout;
