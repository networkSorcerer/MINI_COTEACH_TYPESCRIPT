import { useQueries, useQuery } from '@tanstack/react-query';
import useClientCredentialToken from './useClientCredentialToken';

const useGetMusicCategries = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ['music-category'],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      return getMusicCategory(clientCredentialToken);
    },
  });
};

export default useGetMusicCategries;
