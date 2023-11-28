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
      preview: new URL(
        `${video.video_external_id}/preview`,
        config.app.baseUrl,
      ),
      video_hls: new URL(
        `${video.video_external_id}/video-hls`,
        config.app.baseUrl,
      ),
    }));

    response.videos = newVideos;

    return response;
  }

  async get(params: Videos.GetParams) {
    const response = await this.pandaApiAdapter.get(params);

    response.thumbnail = new URL(
      `${response.video_external_id}/thumbnail`,
      config.app.baseUrl,
    );
    response.preview = new URL(
      `${response.video_external_id}/preview`,
      config.app.baseUrl,
    );
    response.video_hls = new URL(
      `${response.video_external_id}/video-hls`,
      config.app.baseUrl,
    );

    return response;
  }
}
