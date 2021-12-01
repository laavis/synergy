import { FC, SyntheticEvent, useCallback, useState } from 'react';
import styled from 'styled-components';
import { AutoFillInput } from './AutoFillInput';

import languages from '../data/languages.json';
import { DeveloperRole, ERole } from '../generated/types';
import { Input } from './Input';
import { Button } from './Button';
import { Range } from './Range';
import { Textarea } from './Textarea';
import { useCreateProjectState } from '../state';

const StyledDeveloperRoleForm = styled.div`
  > :last-child {
    margin-left: auto;
    margin-top: 1rem;
  }
`;

export interface IDeveloperRoleFormProps {
  devType: ERole;
}

export const DeveloperRoleForm: FC<IDeveloperRoleFormProps> = ({ devType }) => {
  const addDeveloperRole = useCreateProjectState(
    state => state.addDeveloperRole
  );
  const [language, setLanguage] = useState<string>('');
  const [technologies, setTechnologies] = useState<string>('');
  const [skillLevel, setSkillLevel] = useState(1);
  const [description, setDescription] = useState<string>();

  const handleAddDeveloperRole = useCallback(() => {
    const technologiesArray = technologies.split(',');

    const devRole: DeveloperRole = {
      type: devType,
      language,
      skillLevel,
      description,
      technologies: technologiesArray,
    };

    addDeveloperRole(devRole);
  }, [
    addDeveloperRole,
    description,
    devType,
    language,
    skillLevel,
    technologies,
  ]);

  return (
    <StyledDeveloperRoleForm>
      <AutoFillInput
        value={language}
        setValue={setLanguage}
        possibleValues={languages}
      />
      <Input
        label='Technologies (comma separated)*'
        onChange={(e: SyntheticEvent) =>
          setTechnologies((e.target as HTMLInputElement).value)
        }
      />
      <Range
        value={skillLevel}
        setValue={setSkillLevel}
        range={{ min: 1, max: 5 }}
      />
      <Textarea
        label='Description*'
        onChange={(e: SyntheticEvent) =>
          setDescription((e.target as HTMLTextAreaElement).value)
        }
      />
      <Button onClick={() => handleAddDeveloperRole()}>+ Add</Button>
    </StyledDeveloperRoleForm>
  );
};
