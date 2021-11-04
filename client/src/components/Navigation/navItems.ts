export interface INavItem {
  to: string;
  name: string;
}

export const navItems: INavItem[] = [
  {
    to: 'project-board',
    name: 'Project Board',
  },
  {
    to: 'profile',
    name: 'Profile',
  },
];
