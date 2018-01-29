import { connect } from 'react-redux';
import { fetchMessages, deleteMessage } from '../actions';
import CommentsList from '../components/CommentsList';

const mapStateToProps = state => {
	return {
		...state.comments,
		activeRoomId: state.rooms.activeRoomId
	};
}

const mapDispatchToProps = {
	fetchMessages,
	deleteMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
