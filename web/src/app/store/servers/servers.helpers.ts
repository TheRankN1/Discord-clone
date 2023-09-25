import { ServerInterface } from '../../shared/interfaces/server.interface';
import { ServerInitialization } from '../../shared/helpers/server.initialization';
import { ChannelInterface } from '../../shared/interfaces/channel.interface';
import { GeneratorHelpers } from '../../shared/helpers/generator.helpers';

export const setActiveServerFn = (servers: Array<ServerInterface>, serverId: string): Array<ServerInterface> => {
  const foundServer: ServerInterface | undefined = servers.find((server: ServerInterface) => server.id === serverId);

  if (!foundServer) {
    return [...servers];
  }

  servers.forEach((server: ServerInterface) => {
    server.isActive = server.id === serverId;
  });

  return [...servers];
};

export const setCurrentServerFn = (servers: Array<ServerInterface>, serverId: string): ServerInterface | null => {
  const foundServer: ServerInterface | undefined = servers.find((server: ServerInterface) => server.id === serverId);
  return foundServer || null;
};

export const setDefaultCurrentChannelFn = (): ChannelInterface => {
  return ServerInitialization.defaultChannel();
};

export const createServerFn = (servers: Array<ServerInterface>, serverTitle: string, createdBy: string = ''): Array<ServerInterface> => {
  const newServer: ServerInterface = {
    id: GeneratorHelpers.uuid(),
    title: serverTitle,
    isActive: false,
    serverBgColor: GeneratorHelpers.color(),
    categories: [],
    createdBy: createdBy,
    createdOn: new Date(),
    roles: []
  };
  return [...servers, newServer];
};
