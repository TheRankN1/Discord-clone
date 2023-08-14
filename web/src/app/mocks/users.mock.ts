import {UsersInterface} from "../interfaces/users.interface";
import {GeneratorHelpers} from "../helpers/generator.helpers";

export type UserStatusType = 'online' | 'offline' | 'idle' | 'doNotDisturb'
export const USERS_MOCK: UsersInterface[] = [
  {
    categoryName: 'Rapan',
    name: 'Costel',
    status: 'online',
    bg: GeneratorHelpers.color()
  },
  {
    categoryName: 'Ladoi',
    name: 'Gigel',
    status: 'offline',
    bg: GeneratorHelpers.color()
  },
  {
    categoryName: 'Programator',
    name: 'Titel',
    status: 'idle',
    bg: GeneratorHelpers.color()
  },
  {
    categoryName: 'Chelbos',
    name: 'Ninel',
    status: 'doNotDisturb',
    bg: GeneratorHelpers.color()
  }
]
