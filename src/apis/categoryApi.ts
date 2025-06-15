import axios from "axios";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";
import { GetMusicCategoryResponse } from "../models/category"; // 이 모델을 확인해야 합니다.

// Spotify Categories API 응답 구조를 기반으로 GetMusicCategoryResponse 모델을 정의해야 합니다.
// 예시:
// interface CategoryItem {
//   id: string;
//   name: string;
//   icons: { url: string }[];
// }

// interface GetMusicCategoryResponse {
//   categories: {
//     href: string; // 다음/이전 페이지 링크 (full URL)
//     items: CategoryItem[];
//     limit: number;
//     next: string | null; // 다음 페이지 URL
//     offset: number;
//     previous: string | null;
//     total: number;
//   };
// }

export const getMusicCategory = async (
  clientCredentialToken: string,
  offset: number // 이제 'offset'이라는 의미가 명확하도록 파라미터 이름을 변경합니다.
): Promise<GetMusicCategoryResponse> => {
  try {
    const limit = 20; // 한 페이지당 가져올 카테고리 수 (원하는 값으로 설정)

    const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${clientCredentialToken}`,
      },
      params: {
        // 여기에 offset과 limit 파라미터를 추가합니다.
        offset: offset,
        limit: limit,
      },
    });
    return response.data;
  } catch (error) {
    // 에러 발생 시 더 구체적인 메시지를 제공하는 것이 좋습니다.
    if (axios.isAxiosError(error)) {
      console.error("Failed to fetch music categories:", error.response?.data);
      throw new Error(
        `Failed to fetch music categories: ${
          error.response?.statusText || error.message
        }`
      );
    }
    throw new Error(
      "An unexpected error occurred while fetching music categories."
    );
  }
};
