import { FC } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { AuthProvider, useAuthContext, useUser } from './util/AuthProvider';

import { baseBodyStyles } from './components/Text';

import { CreateAccount } from './pages/CreateAccount';
import { HelloWorld } from './pages/HelloWorld';
import { LogIn } from './pages/LogIn';
import { Navigation } from './components/Navigation/Navigation';
import { Projects } from './pages/projects/Projects';
import { Profile } from './pages/Profile';
import {
  CREATE_PROJECT_PATH,
  PROFILE_PATH,
  PROJECTS_PATH,
  PROJECT_DETAILS_PATH,
} from './constants/paths';
import { CreateProject } from './pages/CreateProject/CreateProject';
import { ProjectDetails } from './pages/ProjectDetails';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const GlobalStyle = createGlobalStyle`
  html, body {
    margin: 0;
    padding:0rem;
    min-height: 100vh;
    background-color: #F3F3F5;
    ${baseBodyStyles}
  }

  font-family: 'Karla', sans-serif;
`;

export const App: FC = () => {
  const authState = useAuthContext();
  const { isAuthenticated } = useUser();

  return (
    <AuthProvider value={authState}>
      <StyledApp>
        {isAuthenticated && <Navigation />}
        <GlobalStyle />
        <Switch>
          <Route exact path='/'>
            {!isAuthenticated && <Redirect to='/login' />}
          </Route>
          <Route
            exact
            path='/login'
            render={routeProps => <LogIn {...routeProps} />}
          />
          <Route exact path='/create-account' component={CreateAccount} />
          <Route exact path='/hello-world' component={HelloWorld} />
          <Route exact path={PROJECTS_PATH} component={Projects} />
          <Route exact path={PROFILE_PATH} component={Profile} />
          <Route exact path={CREATE_PROJECT_PATH} component={CreateProject} />
          <Route exact path={PROJECT_DETAILS_PATH} component={ProjectDetails} />
        </Switch>
      </StyledApp>
    </AuthProvider>
  );
};
