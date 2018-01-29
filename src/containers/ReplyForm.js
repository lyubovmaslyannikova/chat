import { connect } from 'react-redux';
import { addReply, handleMessageInput } from '../actions';
import ReplyForm from '../components/ReplyForm';

const mapStateToProps = state => {
	return {
		...state.comments,
		activeRoomId: state.rooms.activeRoomId
	};
}

const mapDispatchToProps = {
	addReply,
	handleMessageInput
}

export default connect(mapStateToProps, mapDispatchToProps)(ReplyForm);
