import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Grid, Form, Button } from 'semantic-ui-react';
import { ChatMenu } from './components/ChatMenu'; 
import { CommentsList } from './components/CommentsList'; 

import 'semantic-ui-css/semantic.min.css'; 
import './style.css'; 

let axiosInst = axios.create({
	baseURL: 'http://localhost:3000', 
}); 

class Chat extends Component {
	constructor(props) {
		super(props);

		this.handleMessageInput = this.handleMessageInput.bind(this); 
		this.addReply = this.addReply.bind(this);

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
 
	handleMessageInput(e) {
		this.setState({
			newMessage: e.target.value
		});
	}

	addReply(e) {
		e.preventDefault();

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
					<ChatMenu activeItem={this.state.roomId} onClick={this.handleItemClick} />
				</Grid.Column>
				{this.state.roomId > 0 && (
					<Grid.Column>
						<Grid.Row className='chatWindow'>
							<CommentsList messages={this.state.messages} />
						</Grid.Row>
						<Grid.Row>
							<Form reply onSubmit={this.addReply}>
								<Form.TextArea value={this.state.newMessage} onChange={this.handleMessageInput} />
								<Button content='Add Reply' labelPosition='left' icon='edit' color='teal' />
							</Form>
						</Grid.Row>
					</Grid.Column>				
				)}
			</Grid>
		);
	}
}

ReactDOM.render(
	<Chat />, 
	document.getElementById('root')
); 
