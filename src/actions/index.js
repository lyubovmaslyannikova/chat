import axios from '../utils/axios';
import * as types from './actionTypes';

function requestRooms() {
	return {
		type: types.REQUEST_ROOMS
	};
}

function receiveRooms(rooms) {
	return {
		type: types.RECEIVE_ROOMS,
		payload: {
			rooms
		}
	};
}

export function fetchRooms() {
	return dispatch => {
		dispatch(requestRooms());

		return axios.get('/rooms')
			.then(response => {
				dispatch(receiveRooms(response.data));
			});
	}
}

function selectRoom(id) {
	return {
		type: types.SELECT_ROOM,
		payload: {
			id
		}
	};
}

export function handleRoomInput(name) {
	return {
		type: types.SET_ROOM_INPUT,
		payload: {
			name
		}
	}
}

export function createRoom(name) {
	return dispatch => {
		return axios.post('/rooms', {
			name
		})
		.then(() => {
			dispatch(handleRoomInput());
			dispatch(fetchRooms());
		});
	}
}

export function removeRoom(id) {
	return (dispatch, getState) => {
		const state = getState();

		return axios.delete('/rooms/' + id)
			.then(() => {
				if (state.rooms.activeRoomId === id){
					dispatch(selectRoom());
				}

				dispatch(fetchRooms());
			});
	}
}

function receiveMessages(messages) {
	return {
		type: types.RECEIVE_MESSAGES,
		payload: {
			messages
		}
	};
}

export function fetchMessages() {
	return (dispatch, getState) => {
		const state = getState();

		return axios.get('/rooms/' + state.rooms.activeRoomId)
			.then(response => {
				dispatch(receiveMessages(response.data));
			});
	}
}

//TODO
export function selectRoomAndFetchMessages(id) {
	return dispatch => {
		dispatch(selectRoom(id));
		dispatch(fetchMessages(id));
	}
}

export function handleMessageInput(message) {
	return {
		type: types.SET_MESSAGE_INPUT,
		payload: {
			message
		}
	}
}

export function addReply(message) {
	return (dispatch, getState) => {
		const state = getState();

		return axios.post('/messages', {
				message,
				user: state.users.id,
				room: state.rooms.activeRoomId
			})
			.then(() => {
				dispatch(handleMessageInput());
				dispatch(fetchMessages());
			});
	}
}

export function deleteMessage(id) {
	return dispatch => {
		return axios.delete('/messages/' + id)
			.then(() => {
				dispatch(fetchMessages());
			});
	};
}
