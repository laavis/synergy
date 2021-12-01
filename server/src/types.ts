import { IUser } from './models/User';

export interface IContext {
  user: IUser;
}

export enum ERole {
  FRONTEND_DEVELOPER = 'frontend_developer',
  BACKEND_DEVELOPER = 'backend_developer',
  FULLSTACK_DEVELOPER = 'fullstack_developer',
}

export enum ESkillType {
  PROGRAMMING = 'programming',
  FRAMEWORK = 'framework',
}

export interface IDeveloperRole {
  type: ERole;
  skillLevel: TSkillLevel;
  language: string;
  technologies?: string[];
  description?: string;
  maxAssignees?: number;
}

export interface IProjectMember {
  userId: string;
  firstName: string;
  lastName: string;
}

export type TSkillLevel = 1 | 2 | 3 | 4 | 5;
