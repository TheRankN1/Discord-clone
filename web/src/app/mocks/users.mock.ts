import { GeneratorHelpers } from '../helpers/generator.helpers';
import { UserCategoryInterface } from '../interfaces/user-category.interface';

export type UserStatusType = 'online' | 'offline' | 'idle' | 'doNotDisturb';
export const USERS_MOCK: Array<UserCategoryInterface> = [
  {
    categoryName: 'Programmer',
    users: [
      {
        name: 'Costel',
        status: 'online',
        bg: GeneratorHelpers.color()
      },
      {
        name: 'Costel',
        status: 'offline',
        bg: GeneratorHelpers.color()
      }
    ]
  },
  {
    categoryName: 'Rapan',
    users: [
      {
        name: 'Petrut',
        status: 'idle',
        bg: GeneratorHelpers.color()
      }
    ]
  },
  {
    categoryName: 'Rapan',
    users: [
      {
        name: 'Costel',
        status: 'online',
        bg: GeneratorHelpers.color()
      }
    ]
  },
  {
    categoryName: 'Chelbos',
    users: [
      {
        name: 'Gigel',
        status: 'doNotDisturb',
        bg: GeneratorHelpers.color()
      },
      {
        name: 'Matei',
        status: 'doNotDisturb',
        bg: GeneratorHelpers.color()
      }
    ]
  }
];
