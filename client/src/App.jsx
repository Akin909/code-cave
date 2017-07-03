//@flow
//Libraries
import React, { Component } from 'react';
import styled from 'styled-components';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

//components
import Editor from './components/Editor.jsx';
import Nav from './components/Nav';

import './reset.js';
import rootReducer from './reducers';

const AppContainer = styled.div`
  width: 100%;
  height: 100vh;
  font-family: Helvetica;
`;

export const networkInterface = createNetworkInterface({
  uri: 'https://code-cave.herokuapp.com'
});
export const client = new ApolloClient({ networkInterface });

const store = createStore(rootReducer);

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Provider store={store}>
          <AppContainer>
            <Nav />
            <Editor />
          </AppContainer>
        </Provider>
      </ApolloProvider>
    );
  }
}

export default App;
