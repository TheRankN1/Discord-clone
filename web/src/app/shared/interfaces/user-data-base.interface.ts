import { UserStatusType } from '../types/user.type';
import { RoleInterface } from './role.interface';

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
  email: string;
  roles: Array<RoleInterface>;
  birthDate: {
    day: number | string;
    month: string;
    year: number | string;
  };
  fullName?: string;
}
