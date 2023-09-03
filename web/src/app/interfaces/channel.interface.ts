import { ChannelTypeEnum } from '../enums/channel-type.enum';

export interface ChannelInterface {
  id: string;
  joinedChannelId: string;
  title: string;
  type: ChannelTypeEnum;
}
