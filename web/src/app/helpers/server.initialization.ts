import { ServerInterface } from '../interfaces/server.interface';
import { CategoryInterface } from '../interfaces/category.interface';
import { ChannelInterface } from '../interfaces/channel.interface';

export class ServerInitialization {
  public static defaultServer(): ServerInterface {
    return {
      id: '',
      title: '',
      categories: []
    };
  }

  public static defaultCategory(): CategoryInterface {
    return {
      id: '',
      title: '',
      channels: []
    };
  }

  public static defaultChannel(): ChannelInterface {
    return {
      id: '',
      title: ''
    };
  }
}
