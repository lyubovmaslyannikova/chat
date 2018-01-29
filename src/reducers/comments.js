import {
	RECEIVE_MESSAGES,
	SET_MESSAGE_INPUT,
} from '../actions/actionTypes';

const initialState = {
	inputValue: '',
	messages: []
};

function comments(state = initialState, action) {

	switch(action.type) {
		case RECEIVE_MESSAGES:
			return {
				...state,
				messages: action.payload.messages
			};

		case SET_MESSAGE_INPUT:
			return {
				...state,
				inputValue: action.payload.message || ''
			};

		default:
			return state;
	}
}

export default comments;
