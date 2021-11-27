import { IUser } from './models/User';

export interface IContext {
  user: IUser;
}

export enum ERole {
  FRONTEND_DEVELOPER = 'frontend_developer',
  BACKEND_DEVELOPER = 'backend_developer',
  FULLSTACK_DEVELOPER = 'fullstack_developer',
  DESIGNER = 'designer',
  OTHER = 'other',
}

export enum ESkillType {
  PROGRAMMING = 'programming',
  FRAMEWORK = 'framework',
  DESIGN = 'design',
  OTHER = 'other',
}

export interface IDeveloperRole {
  type: ERole;
  skillLevel: TSkillLevel;
  language: string;
  technologies?: string[];
  description?: string;
  assignees: string[]; // user ids
  maxAssignees?: number;
}

export interface IOtherRole {
  type: ERole;
  name: string;
  skillLevel: TSkillLevel;
  technologies?: string[];
  description?: string;
  assignees?: string[];
  maxAssignees?: number;
}

export type TSkillLevel = 1 | 2 | 3 | 4 | 5;
