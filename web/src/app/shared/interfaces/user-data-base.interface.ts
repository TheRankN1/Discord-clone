export interface UserDataBaseInterface {
  id: string;
  username: string;
  password: string;
  bgColor: string;
  fullName?: string;
  joinedOn: Date;
  lastLogin?: Date;
  servers: Array<string>;
  audioChannelId: string;
  textChannelId: string;
}
