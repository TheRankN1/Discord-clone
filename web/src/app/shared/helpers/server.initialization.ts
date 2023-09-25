import { ServerInterface } from '../interfaces/server.interface';
import { CategoryInterface } from '../interfaces/category.interface';
import { ChannelInterface } from '../interfaces/channel.interface';
import { GeneratorHelpers } from './generator.helpers';
import { ChannelTypeEnum } from '../enums/channel-type.enum';

export class ServerInitialization {
  public static defaultServer(): ServerInterface {
    return {
      id: '',
      title: '',
      categories: [],
      isActive: false,
      serverBgColor: GeneratorHelpers.color(),
      createdBy: '',
      createdOn: new Date(),
      roles: []
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
      title: '',
      type: ChannelTypeEnum.text,
      messages: []
    };
  }
}
