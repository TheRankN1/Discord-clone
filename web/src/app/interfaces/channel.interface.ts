import { ChannelTypeEnum } from '../enums/channel-type.enum';

export interface ChannelInterface {
  id: string;
  title: string;
  type: ChannelTypeEnum;
}
