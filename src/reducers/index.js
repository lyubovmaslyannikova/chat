import { combineReducers } from 'redux';
import users from './users';
import rooms from './rooms';
import comments from './comments';

export default combineReducers({
	users,
	rooms,
	comments
});
