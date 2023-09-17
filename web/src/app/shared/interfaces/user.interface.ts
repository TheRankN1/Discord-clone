import { UserStatusType } from '../types/user.type';

export interface UserInterface {
  id: string;
  name: string;
  status: UserStatusType;
  activity: string;
  userBgColor: string;
  avatar: string;
}
