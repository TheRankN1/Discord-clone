import { GeneratorHelpers } from '../helpers/generator.helpers';
import { UserCategoryInterface } from '../interfaces/user-category.interface';

export const USERS_MOCK: Array<UserCategoryInterface> = [
  {
    categoryName: 'Programmer',
    users: [
      {
        id: '1',
        name: 'Costel',
        status: 'online',
        activity: 'Se joaca acum : Roblox',
        userBgColor: GeneratorHelpers.color()
      },
      {
        id: '1',
        name: 'Gigel',
        status: 'offline',
        activity: '',
        userBgColor: GeneratorHelpers.color()
      }
    ]
  },
  {
    categoryName: 'Matei',
    users: [
      {
        id: '1',
        name: 'Costel',
        status: 'doNotDisturb',
        activity: '',
        userBgColor: GeneratorHelpers.color()
      }
    ]
  },
  {
    categoryName: 'Rapan',
    users: [
      {
        id: '1',
        name: 'Costel',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color()
      }
    ]
  },
  {
    categoryName: 'Chelbos',
    users: [
      {
        id: '1',
        name: 'Costel',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color()
      },
      {
        id: '1',
        name: 'Costel',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color()
      },
      {
        id: '1',
        name: '',
        status: 'online',
        activity: '',
        userBgColor: GeneratorHelpers.color()
      }
    ]
  }
];
