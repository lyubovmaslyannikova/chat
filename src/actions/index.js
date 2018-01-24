import axios from 'axios';

let axiosInst = axios.create({
	baseURL: 'http://localhost:3000',
});

export const REQUEST_ROOMS = 'chat/REQUEST_ROOMS';
function requestRooms() {
	return {
		type: REQUEST_ROOMS
	};
}

export const RECEIVE_ROOMS = 'chat/RECEIVE_ROOMS';
function receiveRooms(rooms) {
	return {
		type: RECEIVE_ROOMS,
		payload: {
			rooms: rooms
		}
	};
}

export function fetchRooms() {
	return dispatch => {
		dispatch(requestRooms());

		return axiosInst.get('/rooms')
			.then((response) => {
				dispatch(receiveRooms(response.data));
			});
	}
}

export const UPDATE_ACTIVE_ROOM_ID = 'chat/UPDATE_ACTIVE_ROOM_ID';
function updateActiveRoomId(id) {
	return {
		type: UPDATE_ACTIVE_ROOM_ID,
		payload: {
			id: id
		}
	};
}

export const SET_ROOM_INPUT = 'chat/SET_ROOM_INPUT';
export function handleRoomInput(name) {
	return {
		type: SET_ROOM_INPUT,
		payload: {
			name: name
		}
	}
}

export const RESET_ROOM_INPUT = 'chat/RESET_ROOM_INPUT';
function resetRoomInput() {
	return {
		type: RESET_ROOM_INPUT
	};
}

export function createRoom(name) {
	return dispatch => {
		return axiosInst.post('/rooms', {
			name: name
		})
		.then(() => {
			dispatch(resetRoomInput());
		})
		.then(() => {
			dispatch(fetchRooms());
		});
	}
}

export function removeRoom(id) {
	return dispatch => {
		return axiosInst.delete('/rooms/' + id)
			.then(() => {
				dispatch(updateActiveRoomId());
			})
			.then(() => {
				dispatch(fetchRooms());
			});
	}
}

//-----------------------------------------

export const REQUEST_MESSAGES = 'chat/REQUEST_MESSAGES';
function requestMessages() {
	return {
		type: REQUEST_MESSAGES
	};
}

export const RECEIVE_MESSAGES = 'chat/RECEIVE_MESSAGES';
function receiveMessages(messages) {
	return {
		type: RECEIVE_MESSAGES,
		payload: {
			messages: messages
		}
	};
}

export function fetchMessages(id) {
	return dispatch => {
		dispatch(requestMessages());

		return axiosInst.get('/rooms/' + id)
			.then((response) => {
				dispatch(receiveMessages(response.data));
			});
	}
}

