import { UserInterface } from './user.interface';

export interface UserCategoryInterface {
  categoryName: string;
  users: Array<UserInterface>;
}
