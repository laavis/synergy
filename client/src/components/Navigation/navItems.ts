import {
  CREATE_PROJECT_PATH,
  PROFILE_PATH,
  PROJECTS_PATH,
} from '../../constants/paths';

export interface INavItem {
  to: string;
  name: string;
}

export const navItems: INavItem[] = [
  {
    to: PROJECTS_PATH,
    name: 'Projects',
  },
  {
    to: PROFILE_PATH,
    name: 'Profile',
  },
  {
    to: CREATE_PROJECT_PATH,
    name: 'Create project',
  },
];
