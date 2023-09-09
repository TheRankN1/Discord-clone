export interface UserDataBaseInterface {
  id: string;
  username: string;
  password: string;
  bgColor: string;
  fullName?: string;
  joinedOn: Date;
  servers: Array<string>;
  connectedToServer: {
    serverId: string;
    categoryId: string;
    audioChannelId: string;
    textChannelId: string;
  };
}
