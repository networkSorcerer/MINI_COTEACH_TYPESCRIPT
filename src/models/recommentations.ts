import { Track } from './playlist';

export interface RecommendationsResponse {
  seeds: {
    afterFilteringSize: number;
    afterRelinkingSize: number;
    href: string;
    id: string;
    initialPoolSize: number;
    type: string;
  }[];

  tracks: Track[];
}
