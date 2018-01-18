import React from 'react';  
import axios from 'axios';
import { Form, Button, Label, Menu } from 'semantic-ui-react';

let axiosInst = axios.create({
	baseURL: 'http://localhost:3000', 
}); 

export class ChatMenu extends React.Component {
	constructor(props) {
		super(props);   

		this.handleChange = this.handleChange.bind(this); 
		this.createRoom = this.createRoom.bind(this); 

		this.state = { 
			newRoom: '',
			rooms: []
		};
	}

	componentDidMount() {
		this.updateRooms();
	}

	updateRooms() {
		axiosInst.get('/rooms')
			.then((response) => {
				this.setState({
					rooms: response.data,
					newRoom: ''
				});
			});
	}

	createRoom(e) { 
		e.preventDefault();

		if (!this.state.newRoom) {
			return;
		}

		axiosInst.post('/rooms', {
			name: this.state.newRoom
		})
		.then((response) => {		
			this.updateRooms();	  
		});
	}  

	handleChange(e) {
		this.setState({ 
			newRoom: e.target.value 
		});  
	}

	removeRoom(id) {
		axiosInst.delete('/rooms/' + id)
		.then((response) => {		
			this.updateRooms();	  
		}); 
	}

	render() {
		const { rooms, newRoom } = this.state; 

		const menuItems = rooms.map((room) => {
			return (
				<Menu.Item id={room.id} key={room.id} active={this.props.activeItem === room.id} onClick={this.props.onClick}>
					<Button icon='remove' size='mini' circular compact onClick={this.removeRoom.bind(this, room.id)} />
					<Label color='teal'>1</Label>
					{room.name}
				</Menu.Item>
			);
		}); 

		return (
			<Menu vertical secondary pointing>
				{menuItems}   
				<Menu.Item>
					<Form onSubmit={this.createRoom}>
						<Form.Field>
							<Form.Input icon='write' value={newRoom} placeholder='Room...' onChange={this.handleChange} /> 
						</Form.Field> 
						<Button content='Create' type='submit' color='teal' fluid /> 
					</Form> 
				</Menu.Item> 
			</Menu>
		)
	}
} 
