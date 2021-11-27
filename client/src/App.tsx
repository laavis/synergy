import { FC } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

import { AuthProvider, useAuthContext, useUser } from './util/AuthProvider';

import { baseBodyStyles } from './components/Text';

import { CreateAccount } from './pages/CreateAccount';
import { HelloWorld } from './pages/HelloWorld';
import { LogIn } from './pages/LogIn';
import { Navigation } from './components/Navigation/Navigation';
import { Projects } from './pages/projects/Projects';
import { Profile } from './pages/Profile';

const StyledApp = styled.div`
  display: flex;
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
  const { user, isAuthenticated } = useUser();

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
          <Route exact path='/project-board' component={Projects} />
          <Route exact path='/profile' component={Profile} />
        </Switch>
      </StyledApp>
    </AuthProvider>
  );
};
