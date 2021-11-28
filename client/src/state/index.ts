import create from 'zustand';
import { DeveloperRole } from '../generated/types';
import { TSkillLevel } from '../types';

interface ICreateProjectState {
  name?: string;
  setName: (name: string) => void;
  description?: string;
  setDescription: (name: string) => void;
  skillLevel?: TSkillLevel;
  setSkillLevel: (skillLevel: TSkillLevel) => void;
  developerRoles: DeveloperRole[];
  addDeveloperRole: (developerRole: DeveloperRole) => void;
}

export const useCreateProjectState = create<ICreateProjectState>(set => ({
  name: undefined,
  description: undefined,
  skillLevel: undefined,
  developerRoles: [],
  setName: (name: string) => set(state => ({ ...state, name })),
  setSkillLevel: (skillLevel: TSkillLevel) =>
    set(state => ({ ...state, skillLevel })),
  setDescription: (description: string) =>
    set(state => ({ ...state, description })),
  addDeveloperRole: (developerRole: DeveloperRole) =>
    set(state => ({
      developerRoles: [...state.developerRoles, developerRole],
    })),
}));
