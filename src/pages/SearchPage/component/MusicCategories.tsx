import React from "react";
import useGetMusicCategries from "../../../hooks/useGetMusicCategries";
import LoadingScreen from "../../../common/components/LoadingScreen";
import { Typography } from "@mui/material";
import ErrorMessage from "../../../common/components/ErrorMessage";

const MusicCategories = () => {
  const { data, error, isLoading } = useGetMusicCategries();
  console.log("categories", data);
  if (isLoading) {
    return <LoadingScreen />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
  return (
    <Typography variant="h1" padding="8px">
      Music Categories
    </Typography>
    // {data&& data.albums.items.length > 0}
  );
};

export default MusicCategories;
