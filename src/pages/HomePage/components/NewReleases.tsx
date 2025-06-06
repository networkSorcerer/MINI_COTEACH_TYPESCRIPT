import { Typography } from "@mui/material";
import React from "react";
import useGetNewReleases from "../../../hooks/useGetNewReleases";
import LoadingScreen from "../../../common/components/LoadingScreen";
import ErrorMessage from "../../../common/components/ErrorMessage";
import Grid2 from "@mui/material/Unstable_Grid2";
import Card from "../../../common/components/Card";

const NewReleases = () => {
  const { data, error, isLoading } = useGetNewReleases();
  console.log("ddd", data);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <div>
      <Typography variant="h1" paddingTop="8px">
        New Released Albums
      </Typography>
      {data && data.albums.items.length > 0 ? (
        <Grid2 container spacing={2}>
          {data.albums.items.map((album) => (
            <Grid2 xs={6} sm={4} md={2} key={album.id}>
              <Card
                image={album.images[0].url}
                name={album.name}
                artistName={album.artists[0].name}
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

export default NewReleases;
