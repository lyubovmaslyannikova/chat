import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchMessages } from '../actions';

import { Segment, Comment } from 'semantic-ui-react';

class CommentsList extends Component {
	componentDidMount() {
		this.props.fetchMessages(this.props.activeRoomID);
	}

	render() {
		const { messages } = this.props;

		return (
			<Segment basic>
				<Comment.Group>
					{messages.map(message => (
						<Comment key={message.id}>
							<Comment.Content>
								<Comment.Author as='a'>{message.username}</Comment.Author>
								<Comment.Metadata>{formatDate(message.date)}</Comment.Metadata>
								<Comment.Text>
									{message.content}
								</Comment.Text>
								<Comment.Actions>
									<Comment.Action>delete</Comment.Action>
								</Comment.Actions>
							</Comment.Content>
						</Comment>
					))}
				</Comment.Group>
			</Segment>
		);
	}
}

function formatDate(value) {
	let obj   = new Date(value),
    date    = obj.getDate(),
    month   = obj.getMonth(),
    year    = obj.getFullYear(),
    minutes = obj.getMinutes(),
    hours   = obj.getHours(),
    seconds = obj.getSeconds();

	return `${date}:${month}:${year} ${hours}:${minutes}:${seconds}`;
}

function mapStateToProps(state) {
	return {
		activeRoomID: state.rooms.activeRoomID,
		comments: state.comments
	};
}

const mapDispatchToProps = {
	fetchMessages
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentsList);
