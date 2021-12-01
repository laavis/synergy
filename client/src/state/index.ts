import create from 'zustand';
import { DeveloperRole } from '../generated/types';
import { TSkillLevel } from '../types';

export interface ICreateProjectState {
  name?: string;
  setName: (name: string) => void;
  description?: string;
  setDescription: (name: string) => void;
  developerRoles: DeveloperRole[];
  addDeveloperRole: (developerRole: DeveloperRole) => void;
  removeDeveloperRole: (developerRole: DeveloperRole) => void;
  tags: string[];
  // setTags: (tags: string[]) => void;
}

export const useCreateProjectState = create<ICreateProjectState>(set => ({
  name: undefined,
  description: undefined,
  skillLevel: undefined,
  developerRoles: [],
  tags: [],
  setName: (name: string) => set(state => ({ ...state, name })),
  setSkillLevel: (skillLevel: TSkillLevel) =>
    set(state => ({ ...state, skillLevel })),
  setDescription: (description: string) =>
    set(state => ({ ...state, description })),
  addDeveloperRole: (developerRole: DeveloperRole) => {
    set(state => ({
      tags: [...state.tags, ...developerRole.technologies],
      developerRoles: [...state.developerRoles, developerRole],
    }));
  },
  removeDeveloperRole: (developerRole: DeveloperRole) => {
    set(state => ({
      tags: [
        ...state.tags.filter(tag =>
          developerRole.technologies.map(tech => tag === tech)
        ),
      ],
      developerRoles: [
        ...state.developerRoles.filter(devRole => devRole !== developerRole),
      ],
    }));
  },
}));
