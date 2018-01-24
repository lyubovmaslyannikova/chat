import React from 'react';
import { connect } from 'react-redux';
import { createRoom, handleRoomInput } from '../actions'

import { Form, Button } from 'semantic-ui-react';

class AddRoomForm extends React.Component {
	createRoom = (e) => {
		const name = this.props.newRoomName.trim();

		if (name.length) {
			this.props.createRoom(name);
		}

		e.preventDefault();
	}

	handleChange = (e) => {
		this.props.handleRoomInput(e.target.value);
	}

	render() {
		return (
			<Form onSubmit={this.createRoom}>
				<Form.Field>
					<Form.Input icon='write' value={this.props.newRoomName} placeholder='Room...' onChange={this.handleChange} />
				</Form.Field>
				<Form.Field>
					<Button content='Create' type='submit' color='teal' fluid />
				</Form.Field>
			</Form>
		);
	}
}

function mapStateToProps(state) {
	return state.rooms;
}

const mapDispatchToProps = {
	createRoom,
	handleRoomInput
};

export default connect(mapStateToProps, mapDispatchToProps)(AddRoomForm);
