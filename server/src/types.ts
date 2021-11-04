import { IUser } from './models/User';

export interface IContext {
  user: IUser;
}

export enum ERole {
  DEVELOPER = 'developer',
  FRONT_END_DEVELOPER = 'front_end_developer',
  BACK_END_DEVELOPER = 'back_end_developer',
  FULLSTACK_DEVELOPER = 'fullstack_developer',
  UI_DESIGNER = 'ui_designer',
  UX_DESIGNER = 'ux_designer',
  OTHER = 'other',
}

export enum ESkillType {
  PROGRAMMING = 'programming',
  FRAMEWORK = 'framework',
  DATABASE = 'database',
  DESIGN = 'design',
  DEVOPS = 'devops',
  OTHER = 'other',
}

export interface IRole {
  type: ERole;
  name?: string;
  skillLevel: TSkillLevel;
  ddescription?: string;
  assignees?: string[];
}

export type TSkillLevel = 1 | 2 | 3 | 4 | 5;
