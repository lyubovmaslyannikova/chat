import { connect } from 'react-redux';
import { createRoom, handleRoomInput } from '../actions'
import AddRoomForm from '../components/AddRoomForm';

const mapStateToProps = state => {
	return state.rooms;
}

const mapDispatchToProps = {
	createRoom,
	handleRoomInput
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomForm);
