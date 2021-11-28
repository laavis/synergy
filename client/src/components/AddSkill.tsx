import { FC, SyntheticEvent, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ESkillType } from '../generated/types';
import { Input } from './Input';
import { Body } from './Text';

import languages from '../data/languages.json';
import { useUpdateUser } from '../hooks/useUpdateUser';
import { Button } from './Button';

const StyledAddSkill = styled.div`
  display: flex;
  flex-direction: column;

  > :not(:last-child) {
    margin-bottom: 1.5rem;
  }

  > :last-child {
    align-self: flex-end;
  }
`;

const Asd = styled.div`
  position: relative;
`;

const Suggestion = styled(Body)`
  position: absolute;
  right: 0.5rem;
  top: 1.85rem;
  opacity: 0.7;
`;

const Textarea = styled.textarea`
  width: 100%;
  flex-grow: 1;
`;

const SliderWrapper = styled.div`
  display: flex;
  position: relative;
  height: 2.75rem;
  align-items: flex-start;

  > input {
    flex-grow: 1;
  }

  :before,
  :after {
    position: absolute;
    bottom: 0rem;
    font-size: 12px;
    opacity: 0.7;
    color: #252528;
  }

  :before {
    content: '1 - Beginner';
  }

  :after {
    right: 0;
    content: '5 - Expert';
  }
`;

export interface IAddSkillProps {}

export const AddSkill: FC<IAddSkillProps> = ({ ...restProps }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [skillLevel, setSkillLevel] = useState(1);
  const [bestMatch, setBestMatch] = useState<string>();
  const [skillType, setSkillType] = useState<string>();
  const [value, setValue] = useState<string>();

  const { updateUser } = useUpdateUser();

  const skillTypes = Object.keys(ESkillType) as ESkillType[];

  const handleChange = (e: SyntheticEvent) => {
    const value = (e.currentTarget as HTMLInputElement).value;
    setValue(value);

    const filteredSuggestions = languages.filter(
      language => language.toLowerCase().indexOf(value.toLowerCase()) > -1
    );
    value && setBestMatch(filteredSuggestions[0]);
  };

  const addSkill = async () => {
    if (!value || !skillLevel || !skillType) {
      console.log('fill all pls');
      return;
    }

    try {
      const result = await updateUser({
        variables: {
          input: {
            skills: [
              {
                type: skillType.toLowerCase() as ESkillType,
                level: skillLevel,
                name: value,
              },
            ],
          },
        },
      });

      console.log({ result });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!inputRef.current) {
      return;
    }

    inputRef.current.addEventListener('keyup', ({ key }) => {
      if (key === 'Enter' && bestMatch) {
        setValue(bestMatch);
      }
    });
  }, [inputRef, value, bestMatch]);

  return (
    <StyledAddSkill {...restProps}>
      <select name='Skill Type' onChange={e => setSkillType(e.target.value)}>
        <option selected disabled hidden>
          Choose skill type
        </option>
        {skillTypes.map(skillType => (
          <option value={skillType}>{skillType}</option>
        ))}
      </select>
      {skillType === 'Programming' && (
        <Asd>
          <Input
            value={value}
            label='Language'
            onChange={e => handleChange(e)}
            ref={inputRef}
          />
          {value !== bestMatch && <Suggestion>{bestMatch}</Suggestion>}
        </Asd>
      )}
      {skillType && (
        <>
          <SliderWrapper>
            <input
              value={skillLevel}
              type='range'
              min={1}
              max={5}
              id='myRange'
              onChange={e => setSkillLevel(parseInt(e.target.value))}
            />
          </SliderWrapper>
          <Textarea placeholder='Description' />
        </>
      )}
      <Button onClick={addSkill}>Add</Button>
    </StyledAddSkill>
  );
};
