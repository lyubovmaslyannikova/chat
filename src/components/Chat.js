import React, { Component } from 'react';
import axios from 'axios';

import RoomsList from './RoomsList';
import ReplyForm from './ReplyForm';
import CommentsList from './CommentsList';

import { Grid } from 'semantic-ui-react';

let axiosInst = axios.create({
	baseURL: 'http://localhost:3000',
});

export class Chat extends Component {
	constructor(props) {
		super(props);

		this.timerID = null;

		this.state = {
			messages: [],
			roomId: 0,
			newMessage: ''
		}
	}

	componentDidMount() {
		this.timerID = setInterval(
			() => this.updateMessages(),
			3000
		);
	}

	componentWillUnmount() {
		clearInterval(this.timerID);
	}

	updateMessages() {
		if (!this.state.roomId) {
			return;
		}

		axiosInst.get('/rooms/' + this.state.roomId)
		.then((response) => {
			this.setState({
				messages: response.data
			});
		});;
	}

	handleMessageInput = (e) => {
		this.setState({
			newMessage: e.target.value
		});
	}

	addReply = (e) => {
		if (!this.state.newMessage) {
			return;
		}

		if (!this.state.roomId) {
			return;
		}

		axiosInst.post('/messages', {
			content: this.state.newMessage,
			room: this.state.roomId,
			user: 1
		})
		.then((response) => {
			this.updateMessages();
		})
		.then(() => {
			this.setState({
				newMessage: ''
			});
		});
	}

	handleItemClick = (e, { id }) => {
		this.setState({
			roomId: id
		}, this.updateMessages);
	}

	render() {
		return (
			<Grid columns={2} container>
				<Grid.Column width={4}>
					<RoomsList onClick={this.handleItemClick} />
				</Grid.Column>
				{this.state.roomId > 0 && (
					<Grid.Column>
						<Grid.Row>
							<CommentsList messages={this.state.messages} />
						</Grid.Row>
						<Grid.Row>
							<ReplyForm addReply={this.addReply} message={this.state.newMessage} onMessageInput={this.handleMessageInput} />
						</Grid.Row>
					</Grid.Column>
				)}
			</Grid>
		);
	}
}
