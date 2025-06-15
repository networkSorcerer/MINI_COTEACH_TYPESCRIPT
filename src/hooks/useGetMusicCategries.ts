import React from "react";
import useClientCredentialToken from "./useClientCredentialToken";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getMusicCategory } from "../apis/categoryApi";

const useGetMusicCategries = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useInfiniteQuery({
    queryKey: ["music-category"],
    queryFn: async ({ pageParam = 0 }) => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getMusicCategory(clientCredentialToken, pageParam);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPage) => {
      if (lastPage.next) {
        const url = new URL(lastPage.next);
        const nextOffset = url.searchParams.get("offset");
        return nextOffset ? parseInt(nextOffset) : undefined;
      }
      return undefined;
    },
    enabled: !!clientCredentialToken,
  });
};

export default useGetMusicCategries;
