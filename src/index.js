import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import chatApp from './reducers';
import Chat from './components/Chat';

import 'semantic-ui-css/semantic.min.css';
import './style.css';

const store = createStore(
	chatApp,
	applyMiddleware(thunk)
);

ReactDOM.render(
	<Provider store={store}>
		<Chat />
	</Provider>,
	document.getElementById('root')
);
