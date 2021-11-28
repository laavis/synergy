import { ERole } from '../generated/types';

type TRoleMap = {
  [key in ERole]: string;
};

export const roleNameMap: TRoleMap = {
  [ERole.FrontendDeveloper]: 'Frontend developer',
  [ERole.BackendDeveloper]: 'Backend developer',
  [ERole.FullstackDeveloper]: 'Fullstack developer',
  [ERole.Other]: 'Other',
  [ERole.Designer]: 'Designer',
};

export const skillLevelNameMap = {
  1: 'Beginner',
  2: 'Junior',
  3: 'Intermediate',
  4: 'Advanced',
  5: 'Highly skilled',
};
