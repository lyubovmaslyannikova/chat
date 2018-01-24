import { combineReducers } from 'redux';
import rooms from './rooms';
import comments from './comments';

export default combineReducers({
	rooms,
	comments
});
