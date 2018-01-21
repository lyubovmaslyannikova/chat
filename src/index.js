import React from 'react';
import ReactDOM from 'react-dom';
import Chat from './components/Chat';
import { Provider } from 'react-redux';
import store from './store';

import 'semantic-ui-css/semantic.min.css'; 
import './style.css';

ReactDOM.render(
	<Provider store={store}>
		<Chat />
	</Provider>,
	document.getElementById('root')
); 
