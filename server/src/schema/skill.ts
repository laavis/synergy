import { gql } from 'apollo-server-core';
import { ESkillType } from '../types';

export const skillTypeDefs = gql`
  enum ESkillType {
    ${Object.values(ESkillType).join('\n')}
  }

  type Skill {
    # E.g. programming, UI design, UX design
    type: ESkillType!
    # This can be a programming language, framework name etc. like a label
    name: String!
    # Self-rated skill level ranging from 1-5
    level: Int!
    # Description of the skill
    description: String
  }

  input SkillInput {
    # E.g. programming, UI design, UX design
    type: String
    # When type is programming, language must be given
    name: String
    # Self-rated skill level ranging from 1-5
    level: Int!
    # Description of the skill
    description: String
  }
`;
