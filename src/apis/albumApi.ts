import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { Albums, getNewReleaseResponse } from '../models/album';

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

export const getAlbums = async (clientCredentialToken: string): Promise<Albums> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/albums/`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
      params: {
        ids: '6EgR5UlxMx9JksQUqR9Yep,5ITErfEiF1nEo8KTRgLv43,3DmDoHxAeEiDFNWrHSKAdQ,15XcLhiVMlSOipUddTNDnr,5pSk3c3wVwnb2arb6ohCPU,0aYRlVT4Mt63KpofZcaBoc',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tracks');
  }
};
