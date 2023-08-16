import { UserStatusType } from '../mocks/users.mock';

export interface UsersInterface {
  icon?: string;
  status: UserStatusType;
  name: string;
  activity?: string;
  bg: string;
}
