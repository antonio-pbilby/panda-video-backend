import axios from 'axios';

import { config } from '@/config';

import { Videos } from './videos.namespace';

export class VideosApiAdapter {
  private readonly client = axios.create({
    baseURL: config.pandaVideo.apiUrl,
    headers: {
      Authorization: config.pandaVideo.apiKey,
    },
  });

  async list(params: Videos.ListParams) {
    const response = await this.client.get('/videos', {
      params,
    });

    return response.data;
  }
}
