//@flow
//Libraries
import React, { Component } from 'react';
import styled from 'styled-components';
import { createStore } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { devToolsEnhancer } from 'redux-devtools-extension/logOnlyInProduction';
import { BrowserRouter as Router, Route } from 'react-router-dom';

//components
import Editor from './components/Editor';
import Nav from './components/Nav';
import Login from './components/Login';

import './reset.js';
import rootReducer from './reducers';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  font-family: Helvetica;
`;

export const networkInterface = createNetworkInterface({
  uri: process.env.HEROKU
    ? 'https://code-cave.herokuapp.com'
    : 'http://localhost:4001/graphql'
});
export const client = new ApolloClient({ networkInterface });

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <ApolloProvider store={store} client={client}>
        <Router>
          <AppContainer>
            <Nav />
            <Route path="/edit" component={Editor} />
            <Route path="/" component={Login} />
          </AppContainer>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
