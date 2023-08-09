import { CategoryInterface } from './category.interface';

export interface ServerInterface {
  id: string;
  title: string;
  categories: Array<CategoryInterface>;
  serverBgColor: string;
  isActive: boolean;
}
