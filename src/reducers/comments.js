import {
	REQUEST_MESSAGES,
	RECEIVE_MESSAGES
} from '../actions';

const initialState = {
	isFetching: false,
	messages: []
};

function comments(state = initialState, action) {

	switch(action.type) {
		case REQUEST_MESSAGES:
			return {
				...state,
				isFetching: true
			};

		case RECEIVE_MESSAGES:
			return {
				...state,
				isFetching: false,
				messages: action.payload.messages
			}

		default:
			return state;
	}
}

export default comments;
