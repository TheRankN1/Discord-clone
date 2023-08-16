import { UsersInterface } from './user.interface';

export interface UserCategoryInterface {
  categoryName: string;
  users: Array<UsersInterface>;
}
