import { gql, useMutation } from '@apollo/client';
import React, { FC, SyntheticEvent, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { Input } from '../components/Input';
import { Layout } from '../components/Layout';
import { Heading2 } from '../components/Text';
import { ERole, MutationCreateProjectArgs } from '../generated/types';
import { useUser } from '../util/AuthProvider';
import { Dropdown } from '../components/Dropdown';
import { DeveloperRoleForm } from '../components/DeveloperRoleForm';
import { ProjectPreview } from '../components/ProjectPreview';
import { useCreateProjectState } from '../state';
import { Textarea } from '../components/Textarea';

const StyledCreateProject = styled.section`
  width: 100%;
  max-width: 60rem;
  padding-top: 4rem;
  margin-left: 14rem;
  box-sizing: border-box;
  align-self: flex-start;

  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-areas: 'header header' 'form preview';

  > :first-child {
    grid-area: header;
    margin-bottom: 2rem;
  }

  > :nth-child(2) {
    grid-area: form;
  }

  > :last-child {
    align-self: flex-start;
    min-height: 19.5rem;
    grid-area: preview;
  }
`;

const FormWrapper = styled(Layout.FormWrapper)`
  padding: 0;
  width: 100%;
`;

const getRoleDropdownItems = () => Object.values(ERole).map(role => role);

export interface ICreateProjectProps {}

const isDevRole = (role: string) =>
  Object.values(ERole).includes(role as ERole);

export const CreateProject: FC<ICreateProjectProps> = ({}) => {
  const state = useCreateProjectState(state => state);
  const { setName, setDescription } = state;

  const [role, setRole] = useState<string>('');

  const developer = isDevRole(role) || false;

  return (
    <StyledCreateProject>
      <Heading2>Create project</Heading2>
      <FormWrapper>
        <Form>
          <Input
            type='text'
            label='Project name'
            onChange={(e: SyntheticEvent) =>
              setName((e.target as HTMLInputElement).value)
            }
          />
          <Textarea
            label='Description'
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
      <ProjectPreview />
    </StyledCreateProject>
  );
};
