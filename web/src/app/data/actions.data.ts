import { SidebarActionInterface } from '../interfaces/sidebar-action.interface';

export const sidebarActions: { [key: string]: SidebarActionInterface } = {
  search: {
    hoverClass: 'fillBackground',
    fillHoverClass: 'fill-green',
    icon: 'search',
    bgColor: '#36373c'
  },
  addServer: {
    hoverClass: 'fillBackground',
    fillHoverClass: 'fill-green',
    icon: 'plus',
    bgColor: '#36373c'
  },
  logout: {
    hoverClass: 'fillBackground',
    fillHoverClass: 'fill-red',
    icon: 'exit',
    bgColor: '#36373c'
  }
};
