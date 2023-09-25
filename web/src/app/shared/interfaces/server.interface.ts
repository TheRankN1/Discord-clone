import { CategoryInterface } from './category.interface';
import { RoleInterface } from './role.interface';

export interface ServerInterface {
  id: string;
  title: string;
  categories: Array<CategoryInterface>;
  serverBgColor: string;
  isActive: boolean;
  createdBy: string;
  createdOn: Date;
  roles: Array<RoleInterface>;
}
