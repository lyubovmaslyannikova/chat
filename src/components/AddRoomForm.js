import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

export default class AddRoomForm extends Component {
	handleRoomСreation = e => {
		const name = this.props.inputValue.trim();

		if (name.length) {
			this.props.createRoom(name);
		}

		e.preventDefault();
	}

	render() {
		return (
			<Form onSubmit={this.handleRoomСreation}>
				<Form.Field>
					<Form.Input
						icon='write'
						value={this.props.inputValue}
						placeholder='Room...'
						onChange={e => this.props.handleRoomInput(e.target.value)}
					/>
				</Form.Field>
				<Form.Field>
					<Button
						content='Create'
						type='submit'
						color='teal'
						fluid
					/>
				</Form.Field>
			</Form>
		);
	}
}
