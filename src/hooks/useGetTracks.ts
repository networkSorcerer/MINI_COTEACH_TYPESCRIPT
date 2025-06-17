import { useQuery } from '@tanstack/react-query';
import useClientCredentialToken from './useClientCredentialToken';
import { getTracks } from '../apis/tracksApi';

const useGetTracks = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ['tracks'],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      return getTracks(clientCredentialToken);
    },
  });
};

export default useGetTracks;
