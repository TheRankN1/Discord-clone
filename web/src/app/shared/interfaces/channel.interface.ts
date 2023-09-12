import { ChannelTypeEnum } from '../enums/channel-type.enum';
import { ChatMessage } from './chat.interface';

export interface ChannelInterface {
  id: string;
  title: string;
  type: ChannelTypeEnum;
  messages?: Array<ChatMessage>;
}
