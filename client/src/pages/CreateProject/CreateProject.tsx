import React, {
  FC,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';

import { Form } from '../../components/Form';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { Heading2 } from '../../components/Text';
import { DeveloperRoleInput, ERole } from '../../generated/types';
import { Dropdown } from '../../components/Dropdown';
import { DeveloperRoleForm } from '../../components/DeveloperRoleForm';
import { ICreateProjectState, useCreateProjectState } from '../../state';
import { Textarea } from '../../components/Textarea';
import { Preview } from './components/Preview';
import { Button } from '../../components/Button';
import { useCreateProject } from '../../hooks/useCreateProject';
import { PROJECTS_PATH } from '../../constants/paths';

const StyledCreateProject = styled.section`
  width: 100%;
  max-width: 60rem;
  padding-top: 4rem;
  margin-left: 14rem;
  box-sizing: border-box;
  align-self: flex-start;
  margin: 0 auto;

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'header header' 'form preview' '. submit-button';

  > :first-child {
    grid-area: header;
    margin-bottom: 2rem;
  }

  > :nth-child(2) {
    grid-area: form;
  }

  > :nth-child(3) {
    align-self: flex-start;
    grid-area: preview;
  }
`;

const FormWrapper = styled(Layout.FormWrapper)`
  padding: 0;
  width: 100%;
`;

const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > :last-child {
    margin-top: 1rem;
    align-self: flex-end;
  }
`;

const getRoleDropdownItems = () => Object.values(ERole).map(role => role);

export interface ICreateProjectProps {}

const isDevRole = (role: string) =>
  Object.values(ERole).includes(role as ERole);

export const CreateProject: FC<ICreateProjectProps> = () => {
  const state = useCreateProjectState(state => state);
  const { setName, setDescription } = state;
  const { createProject } = useCreateProject();

  const [role, setRole] = useState<string>('');

  const developer = isDevRole(role) || false;

  const [submitDisabled, setSubmitDisabled] = useState(true);

  const isValidCreateProjectInput = (state: ICreateProjectState): boolean => {
    if (!state.name || !state.description) {
      return false;
    }

    if (state.developerRoles.length === 0 || state.tags.length === 0) {
      return false;
    }

    return true;
  };

  const history = useHistory();
  const handleCreateProject = useCallback(async () => {
    try {
      await createProject({
        variables: {
          input: {
            title: state.name ?? '',
            description: state.description ?? '',
            developerRoles: state.developerRoles as DeveloperRoleInput[],
            tags: state.tags,
          },
        },
      });
      history.push(PROJECTS_PATH);
    } catch (error) {}
  }, [createProject, state, history]);

  useEffect(() => {
    const submitDisabled = !isValidCreateProjectInput(state);
    setSubmitDisabled(submitDisabled);
  }, [state]);

  return (
    <StyledCreateProject>
      <Heading2>Create project</Heading2>
      <FormWrapper>
        <Form>
          <Input
            type='text'
            label='Project name*'
            onChange={(e: SyntheticEvent) =>
              setName((e.target as HTMLInputElement).value)
            }
          />
          <Textarea
            label='Description*'
            onChange={(e: SyntheticEvent) =>
              setDescription((e.target as HTMLTextAreaElement).value)
            }
          />
          <Dropdown
            title='Choose a role'
            setSelected={setRole}
            dropdownItems={getRoleDropdownItems()}
          />
          {developer && <DeveloperRoleForm devType={role as ERole} />}
        </Form>
      </FormWrapper>
      <PreviewWrapper>
        <Preview />
        <Button
          onClick={() => handleCreateProject()}
          $disabled={submitDisabled}
          $color='#8674fb'
        >
          Create
        </Button>
      </PreviewWrapper>
    </StyledCreateProject>
  );
};
