import { connect } from 'react-redux';
import { fetchRooms, removeRoom, selectRoomAndFetchMessages } from '../actions';
import RoomsList from '../components/RoomsList';

const mapStateToProps = state => {
	return state.rooms;
}

const mapDispatchToProps = {
	fetchRooms,
	removeRoom,
	selectRoomAndFetchMessages
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);
