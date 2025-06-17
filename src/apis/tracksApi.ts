import axios from 'axios';
import { SPOTIFY_BASE_URL } from '../configs/commonConfig';
import { Tracks } from '../models/playlist';

export const getTracks = async (clientCredentialToken: string): Promise<Tracks> => {
  try {
    const response = await axios.get(`${SPOTIFY_BASE_URL}/tracks/`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
      params: {
        ids: '20QI1DhCFz7pN8rATkNguv,4xeugB5MqWh0jwvXZPxahq,2GMKQPMXdOGXsQkDYBN6wF,3iJxBDym1SeqNqJqnvreHK,5jviSlh6YAznFM8JtMBEqV,0DC62SYIRKMFgx2f7OyvwD,4PBtSN6dNFXA9RUkx5e3W9,6uPnrBgweGOcwjFL4ItAvV,27QLNrvWbFcwOYr8RpOpxg,0qkYuCno3SoU8vxkCdx0iJ,0Kk5TRkYuWXY89KamtFEFw,04jt3FIji2EJUhun0UrNqR',
      },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch tracks');
  }
};
