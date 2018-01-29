import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class ReplyForm extends Component {
	handleSubmit = e => {
		const message = this.props.inputValue.trim();

		if (message.length) {
			this.props.addReply(message);
		}

		e.preventDefault();
	}

	render() {
		if (!this.props.activeRoomId) {
			return null;
		}

		return (
			<Form reply onSubmit={this.handleSubmit}>
				<Form.TextArea
					value={this.props.inputValue}
					onChange={e => this.props.handleMessageInput(e.target.value) }
				/>
				<Button
					labelPosition='left'
					content='Add Reply'
					color='orange'
					icon='edit'
				/>
			</Form>
		);
	}
}
