import { SidebarActionInterface } from '../interfaces/sidebar-action.interface';

export const sidebarActions: { [key: string]: SidebarActionInterface } = {
  search: {
    hoverClass: 'fillBackground',
    fillHoverClass: 'color-green',
    icon: 'search',
    bgColor: '#36373c'
  },
  addServer: {
    hoverClass: 'fillBackground',
    fillHoverClass: 'color-green',
    icon: 'plus',
    bgColor: '#36373c'
  },
  logout: {
    hoverClass: 'fillBackground',
    fillHoverClass: 'color-error',
    icon: 'exit',
    bgColor: '#36373c'
  }
};
