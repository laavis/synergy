export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccessToken = {
  __typename?: 'AccessToken';
  accessToken?: Maybe<Scalars['String']>;
};

export type CreateProjectInput = {
  description: Scalars['String'];
  developerRoles: Array<DeveloperRoleInput>;
  kickoffDate?: Maybe<Scalars['String']>;
  otherRoles?: Maybe<Array<OtherRoleInput>>;
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type DeveloperRole = {
  __typename?: 'DeveloperRole';
  description?: Maybe<Scalars['String']>;
  language: Scalars['String'];
  maxAssignees?: Maybe<Scalars['Int']>;
  skillLevel: Scalars['Int'];
  technologies?: Maybe<Array<Scalars['String']>>;
  type: ERole;
};

export type DeveloperRoleInput = {
  description?: Maybe<Scalars['String']>;
  language: Scalars['String'];
  maxAssignees?: Maybe<Scalars['Int']>;
  skillLevel: Scalars['Int'];
  technologies?: Maybe<Array<Scalars['String']>>;
  type: ERole;
};

export enum ERole {
  BackendDeveloper = 'backend_developer',
  Designer = 'designer',
  FrontendDeveloper = 'frontend_developer',
  FullstackDeveloper = 'fullstack_developer',
  Other = 'other',
}

export enum ESkillType {
  Design = 'design',
  Framework = 'framework',
  Other = 'other',
  Programming = 'programming',
}

export type Location = {
  __typename?: 'Location';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type LocationInput = {
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
};

export type Me = {
  __typename?: 'Me';
  _id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProject?: Maybe<Project>;
  createUser?: Maybe<User>;
  joinProject: Scalars['Boolean'];
  login?: Maybe<Tokens>;
  updateUser?: Maybe<User>;
};

export type MutationCreateProjectArgs = {
  input: CreateProjectInput;
};

export type MutationCreateUserArgs = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  rePassword: Scalars['String'];
};

export type MutationJoinProjectArgs = {
  projectId: Scalars['ID'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationUpdateUserArgs = {
  input?: Maybe<UpdateUserInput>;
};

export type OtherRole = {
  __typename?: 'OtherRole';
  description?: Maybe<Scalars['String']>;
  maxAssignees?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  skillLevel: Scalars['Int'];
  technologies?: Maybe<Array<Scalars['String']>>;
  type: ERole;
};

export type OtherRoleInput = {
  description?: Maybe<Scalars['String']>;
  maxAssignees?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  skillLevel: Scalars['Int'];
  technologies?: Maybe<Array<Scalars['String']>>;
  type: ERole;
};

export type Project = {
  __typename?: 'Project';
  _id: Scalars['ID'];
  createdBy: Scalars['ID'];
  description: Scalars['String'];
  developerRoles: Array<DeveloperRole>;
  kickoffDate?: Maybe<Scalars['String']>;
  otherRoles?: Maybe<Array<OtherRole>>;
  members?: Maybe<Array<Scalars['ID']>>;
  tags?: Maybe<Array<Scalars['String']>>;
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  helloWorld: Scalars['String'];
  me?: Maybe<Me>;
  projects?: Maybe<Array<Maybe<Project>>>;
  renewAccessToken?: Maybe<AccessToken>;
  user?: Maybe<User>;
  users?: Maybe<Array<Maybe<User>>>;
};

export type QueryRenewAccessTokenArgs = {
  refreshToken: Scalars['String'];
};

export type QueryUserArgs = {
  userId: Scalars['ID'];
};

export type Skill = {
  __typename?: 'Skill';
  description?: Maybe<Scalars['String']>;
  level: Scalars['Int'];
  name: Scalars['String'];
  type: ESkillType;
};

export type SkillInput = {
  description?: Maybe<Scalars['String']>;
  level: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  type?: Maybe<ESkillType>;
};

export type Tokens = {
  __typename?: 'Tokens';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken: Scalars['String'];
};

export type UpdateUserInput = {
  bio?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  location?: Maybe<LocationInput>;
  skills?: Maybe<Array<Maybe<SkillInput>>>;
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID'];
  bio?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  location?: Maybe<Location>;
  password: Scalars['String'];
  skills?: Maybe<Array<Skill>>;
};
