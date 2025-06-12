import { ExternalUrls, Image } from './commonType';

export interface Show {
  available_markets: string[];
  copyrights: {
    text?: string;
    type?: string;
  };
  description: string;
  explicit: boolean;
  html_description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
}

export interface SimplifiedAudioBook {
  author: { name: string }[];
  available_markets: string[];
  copyrights: Copyrights;
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name: string;
  }[];
  publisher: string;
  type: 'audiobook';
  uri: string;
  total_chapters: number;
}

export interface Copyrights {
  test: string;
  type: string;
}
