import { IUser } from './models/User';

export interface IContext {
  user: IUser;
}

export enum ERole {
  DEVELOPER = 'developer',
  UI_DESIGNER = 'ui_designer',
  UX_DESIGNER = 'ux_designer',
  OTHER = 'other',
}

export enum ESkillType {
  PROGRAMMING = 'programming',
  FRAMEWORK = 'framework',
  DATABASE = 'database',
  DESIGN = 'ui_design',
  DEVOPS = 'devops',
  OTHER = 'other',
}
