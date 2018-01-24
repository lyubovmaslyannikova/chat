import {
	REQUEST_ROOMS,
	RECEIVE_ROOMS,
	SET_ROOM_INPUT,
	RESET_ROOM_INPUT,
	UPDATE_ACTIVE_ROOM_ID
} from '../actions';

const initialState = {
	isFetching: false,
	newRoomName: '',
	activeRoomID: null,
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
				newRoomName: action.payload.name
			};

		case RESET_ROOM_INPUT:
			return {
				...state,
				newRoomName: ''
			};

		case UPDATE_ACTIVE_ROOM_ID:
			return {
				...state,
				activeRoomID: action.payload.id || null
			};

		default:
			return state;
	}
}

export default rooms;
