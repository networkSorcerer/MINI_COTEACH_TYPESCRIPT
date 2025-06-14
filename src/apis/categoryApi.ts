import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { GetMusicCategoryResponse } from '../models/category';

export const getMusicCategory = async (clientCredentialToken: string): Promise<GetMusicCategoryResponse> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch new release');
  }
};
