import React, { Component } from 'react';
import { Segment, Label, Comment } from 'semantic-ui-react';

export default class CommentsList extends Component {
	constructor(props) {
		super(props);

		this.timerID = null;
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.props.fetchMessages(),
			5000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	render() {
		const { messages } = this.props;

		return (
			<Segment basic>
        <Label as='a' color='orange' ribbon='right'>Specs</Label>
				<Comment.Group>
					{messages && messages.map(message => (
						<Comment key={message.id}>
							<Comment.Content>
								<Comment.Author as='a'>
									{message.username}
								</Comment.Author>
								<Comment.Metadata>
									{formatDate(message.date)}
								</Comment.Metadata>
								<Comment.Text>
									{message.message}
								</Comment.Text>
								<Comment.Actions>
									<Comment.Action onClick={() => this.props.deleteMessage(message.id)}>
										delete
									</Comment.Action>
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
