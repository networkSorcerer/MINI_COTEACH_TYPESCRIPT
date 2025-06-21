import { useTheme, useMediaQuery, BottomNavigation, BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic'; // 라이브러리 아이콘 예시
import { useNavigate } from 'react-router-dom';
import React from 'react';

const MobileBottomNav = () => {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue === 0) navigate('/');
        else if (newValue === 1) navigate('/search');
        else if (newValue === 2) navigate('/library');
      }}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1300,
      }}
    >
      <BottomNavigationAction label="Home" icon={<HomeIcon />} />
      <BottomNavigationAction label="Search" icon={<SearchIcon />} />
      <BottomNavigationAction label="Library" icon={<LibraryMusicIcon />} />
    </BottomNavigation>
  );
};

export default MobileBottomNav;
