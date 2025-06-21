import React from 'react';
import LoadingScreen from '../../../common/components/LoadingScreen';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import useGetAlbums from '../../../hooks/useGetAlbums';
import Card from '../../../common/components/Card';

const Albums = () => {
  const { data, error, isLoading } = useGetAlbums();
  console.log('useGetAlbums', data);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      {' '}
      <Typography variant="h1" paddingTop="8px">
        Albums
      </Typography>
      {data && data.albums.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.albums.map((albums) => (
            <Grid2 xs={6} sm={4} md={2} key={albums.id}>
              <Card image={albums.images[0].url} name={albums.name} artistName={albums.artists[0].name}></Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h2">NO DATA</Typography>
      )}
    </div>
  );
};

export default Albums;
