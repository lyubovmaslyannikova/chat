import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Grid, Form, Button } from 'semantic-ui-react';
import { ChatMenu } from './ChatMenu';
import { CommentsList } from './CommentsList';
import { incrementRoomId, updateMessages } from '../models/chat';

let axiosInst = axios.create({
  baseURL: 'http://localhost:3000',
});

class Chat extends Component {
  constructor(props) {
    super(props);

    this.handleMessageInput = this.handleMessageInput.bind(this);
    this.addReply = this.addReply.bind(this);

    this.timerID = null;
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
    if (!this.props.roomId) {
      return;
    }

    this.props.updateMessages(this.props.roomId);
  }

  handleMessageInput(e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  addReply(e) {
    e.preventDefault();

    if (!this.props.newMessage) {
      return;
    }

    if (!this.props.roomId) {
      return;
    }

    axiosInst.post('/messages', {
      content: this.props.newMessage,
      room: this.props.roomId,
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
          <ChatMenu activeItem={this.props.roomId} onClick={this.handleItemClick} />
        </Grid.Column>
        {this.props.roomId > 0 && (
          <Grid.Column>
            <Grid.Row className='chatWindow'>
              <CommentsList messages={this.props.messages} />
            </Grid.Row>
            <Grid.Row>
              <Form reply onSubmit={this.addReply}>
                <Form.TextArea value={this.props.newMessage} onChange={this.handleMessageInput} />
                <Button content='Add Reply' labelPosition='left' icon='edit' color='teal' />
              </Form>
            </Grid.Row>
          </Grid.Column>
        )}

        <button onClick={this.props.incrementRoomId}>
          inc room id
        </button>
      </Grid>
    );
  }
}

function mapState(state) {
  return state.chat;
}

const mapDispatch = {
  incrementRoomId,
  updateMessages
};

export default connect(mapState, mapDispatch)(Chat);