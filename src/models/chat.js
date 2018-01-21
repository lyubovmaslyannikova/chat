import axios from "axios/index";

let axiosInst = axios.create({
  baseURL: 'http://localhost:3000',
});

const INCREMENT_ROOM_ID = 'chat/INCREMENT_ROOM_ID';
const SET_MESSAGES = 'chat/SET_MESSAGES';

const initialState = {
  messages: [],
  roomId: 1,
  newMessage: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_ROOM_ID:
      return {
        ...state,
        roomId: state.roomId + 1
      };

    case SET_MESSAGES:
      return {
        ...state,
        messages: action.payload.messages
      };

    default:
      return state;
  }
};

export function incrementRoomId() {
  return {
    type: INCREMENT_ROOM_ID
  };
}

export function updateMessages(roomId) {
  return dispatch => {
    axiosInst.get('/rooms/' + roomId)
      .then(response => {
        dispatch({
          type: SET_MESSAGES,
          payload: {
            messages: response.data
          }
        });
      });
  };
}
