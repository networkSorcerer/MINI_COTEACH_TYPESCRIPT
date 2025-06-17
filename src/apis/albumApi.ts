import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { getNewReleaseResponse } from '../models/album';
import { Track } from '../models/playlist';

export const getNewRelease = async (clientCredentialToken: string): Promise<getNewReleaseResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/new-releases?limit=6`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch new releases');
  }
};

export default getNewRelease;
