import axios from 'axios';

import { config } from '@/config';

export class VideosCdnAdapter {
  private readonly client = axios.create({
    baseURL: config.pandaVideo.cdnUrl,
    headers: {
      referer: config.pandaVideo.cdnReferer,
    },
    responseType: 'arraybuffer',
  });

  async thumbnail(externalId: string) {
    const response = await this.client.get(`${externalId}/thumbnail.jpg`);

    return response.data;
  }

  async preview(externalId: string) {
    const response = await this.client.get(`${externalId}/preview.webp`);

    return response.data;
  }

  async videoHls(externalId: string) {
    const response = await this.client.get(`${externalId}/playlist.m3u8`);

    return response.data;
  }
}
