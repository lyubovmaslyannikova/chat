import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRooms, removeRoom } from '../actions';

import AddRoomForm from './AddRoomForm';
import InvertedLoader from './Loader';
import { Button, Menu } from 'semantic-ui-react';

class RoomsList extends Component {
	componentDidMount() {
		this.props.fetchRooms();
	}

	render() {
		const { rooms, activeRoomID, isFetching } = this.props;

		const menuItems = rooms.map(room => {
			return (
				<Menu.Item key={room.id} id={room.id} active={activeRoomID === room.id} onClick={this.props.onClick}>
					{room.name}
					<Button icon='remove' size='mini' floated='right' compact onClick={() => this.props.removeRoom(room.id)} />
				</Menu.Item>
			);
		});

		return (
			<Menu vertical secondary pointing>
				{isFetching &&
					<InvertedLoader />
				}
				{menuItems}
				<Menu.Item>
					<AddRoomForm />
				</Menu.Item>
			</Menu>
		)
	}
}

function mapStateToProps(state) {
	return state.rooms;
}

const mapDispatchToProps = {
	fetchRooms,
	removeRoom
}

export default connect(mapStateToProps, mapDispatchToProps)(RoomsList);
