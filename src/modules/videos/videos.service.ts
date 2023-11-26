import { config } from '@/config';

import { VideosApiAdapter } from './videos-api.adapter';
import { Videos } from './videos.namespace';

interface VideoResponse {
  video_external_id: string;
  thumbnail: string;
}

export class VideosService {
  private readonly pandaApiAdapter = new VideosApiAdapter();
  async list(params: Videos.ListParams) {
    const response = await this.pandaApiAdapter.list(params);

    const newVideos = response.videos.map((video: VideoResponse) => ({
      ...video,
      thumbnail: new URL(
        `${video.video_external_id}/thumbnail`,
        config.app.baseUrl,
      ),
    }));

    response.videos = newVideos;

    return response;
  }
}
