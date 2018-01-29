import {
	REQUEST_ROOMS,
	RECEIVE_ROOMS,
	SET_ROOM_INPUT,
	SELECT_ROOM
} from '../actions/actionTypes';

const initialState = {
	isFetching: false,
	inputValue: '',
	activeRoomId: null,
	rooms: []
};

function rooms(state = initialState, action) {

	switch(action.type) {
		case REQUEST_ROOMS:
			return {
				...state,
				isFetching: true
			};

		case RECEIVE_ROOMS:
			return {
				...state,
				isFetching: false,
				rooms: action.payload.rooms
			};

		case SET_ROOM_INPUT:
			return {
				...state,
				inputValue: action.payload.name || ''
			};

		case SELECT_ROOM:
			return {
				...state,
				activeRoomId: action.payload.id || null
			};

		default:
			return state;
	}
}

export default rooms;
