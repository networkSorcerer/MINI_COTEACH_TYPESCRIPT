import { Box, styled, Typography, Button } from '@mui/material';
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import theme from '../theme';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Navbar from './componenets/Navbar';

const Layout = styled('div')({
  display: 'flex',
  height: '100vh',
  padding: '8px',
});
const Sidebar = styled('div')(({ theme }) => ({
  width: '260px',
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
  height: '100%',
  padding: '8px',
  marginBottom: '8px',
  marginRight: '8px',
}));

const LibraryHead = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '10px',
}));

const LibraryHelp = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  width: '90%',
  height: '130px',
  borderRadius: '8px',
  backgroundColor: '#1e1e1e',
  marginTop: '20px',
  padding: '10px',
}));

const CreatePlaylistButton = styled(Button)({
  marginTop: '20px',
  fontWeight: '700',
});
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
          <LibraryHead>
            <BookmarkIcon />
            <Typography varient="h1" fontWeight={700}>
              Your Library
            </Typography>
            <Button>
              <AddIcon />
            </Button>
          </LibraryHead>
          <LibraryHelp>
            {' '}
            <Typography variant="h2" fontWeight={700}>
              Create your first playlist
            </Typography>
            <Typography variant="body2">It's easy, we'll help you</Typography>
            <CreatePlaylistButton variant="contained" color="secondary">
              Create playlist
            </CreatePlaylistButton>
          </LibraryHelp>
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
