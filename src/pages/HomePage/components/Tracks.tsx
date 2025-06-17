import React from 'react';
import LoadingScreen from '../../../common/components/LoadingScreen';
import ErrorMessage from '../../../common/components/ErrorMessage';
import { Typography } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import Card from '../../../common/components/Card';
import useGetTracks from '../../../hooks/useGetTracks';

const Tracks = () => {
  const { data, error, isLoading } = useGetTracks();
  console.log('tracks', data);
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
        Tracks
      </Typography>
      {data && data.tracks.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.tracks.map((track) => (
            <Grid2 xs={6} sm={4} md={2} key={track.album.id}>
              <Card
                image={track.album.images[0].url}
                name={track.album.name}
                artistName={track.album.artists[0].name}
              ></Card>
            </Grid2>
          ))}
        </Grid2>
      ) : (
        <Typography variant="h2">NO DATA</Typography>
      )}
    </div>
  );
};

export default Tracks;
