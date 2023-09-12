import { UserDataBaseInterface } from './user-data-base.interface';

export interface UserCategoryInterface {
  categoryName: string;
  users: Array<UserDataBaseInterface>;
}
