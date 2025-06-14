export interface GetMusicCategoryResponse {
  categories: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: {
      href: string;
      icons: {
        url: string;
        height: number | null;
        width: number | null;
      }[];
      id: string;
      name: string;
    }[];
  };
}
