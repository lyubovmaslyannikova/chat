import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';

class ReplyForm extends Component {
	render() {
		return (
			<Form reply onSubmit={this.props.addReply}>
				<Form.TextArea value={this.props.message} onChange={this.props.onMessageInput} />
				<Button content='Add Reply' labelPosition='left' icon='edit' color='orange' />
			</Form>
		);
	}
}

export default ReplyForm;
