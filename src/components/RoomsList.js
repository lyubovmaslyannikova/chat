import React, { Component } from 'react';
import AddRoomForm from '../containers/AddRoomForm';
import InvertedLoader from './Loader';
import { Button, Menu } from 'semantic-ui-react';

class RoomsList extends Component {
	componentDidMount() {
		this.props.fetchRooms();
	}

	removeRoom = (e, id) => {
		this.props.removeRoom(id);
		e.stopPropagation();
	}

	render() {
		const {
			rooms,
			isFetching,
			activeRoomId
		} = this.props;

		const menuItems = rooms.map(room => {
			return (
				<Menu.Item
					key={room.id}
					id={room.id}
					active={activeRoomId === room.id}
					onClick={() => this.props.selectRoomAndFetchMessages(room.id)}
				>
					{room.name}
					<Button
						floated='right'
						icon='remove'
						size='mini'
						compact
						onClick={e => this.removeRoom(e, room.id)}
					/>
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

export default RoomsList;
