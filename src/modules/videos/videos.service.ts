import { VideosApiAdapter } from './videos-api.adapter';
import { Videos } from './videos.namespace';

export class VideosService {
  private readonly pandaApiAdapter = new VideosApiAdapter();
  list(params: Videos.ListParams) {
    return this.pandaApiAdapter.list(params);
  }
}
