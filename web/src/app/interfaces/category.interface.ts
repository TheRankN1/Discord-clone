import { ChannelInterface } from './channel.interface';

export interface CategoryInterface {
  id: string;
  title: string;
  channels: Array<ChannelInterface>;
}
