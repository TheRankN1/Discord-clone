import { UserStatusType } from '../types/user.type';

export interface UserDataBaseInterface {
  id: string;
  username: string;
  password: string;
  bgColor: string;
  joinedOn: Date;
  servers: Array<string>;
  audioChannelId: string;
  textChannelId: string;
  status: UserStatusType;
  lastLogin: Date;
  fullName?: string;
}
