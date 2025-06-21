import React from 'react';
import useClientCredentialToken from './useClientCredentialToken';
import { useQuery } from '@tanstack/react-query';
import { getAlbums } from '../apis/albumApi';

const useGetAlbums = () => {
  const clientCredentialToken = useClientCredentialToken();
  return useQuery({
    queryKey: ['albums'],
    queryFn: async () => {
      if (!clientCredentialToken) {
        throw new Error('No token available');
      }
      return getAlbums(clientCredentialToken);
    },
  });
};

export default useGetAlbums;
