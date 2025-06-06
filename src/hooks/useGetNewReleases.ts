import { useQuery } from "@tanstack/react-query";
import { getNewRelease } from "../apis/albumApi";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetNewReleases = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ["new-releases"],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error("No token available");
      }
      return getNewRelease(clientCredentialToken);
    },
  });
};

export default useGetNewReleases;
