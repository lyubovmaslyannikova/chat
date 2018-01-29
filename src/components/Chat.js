import React, { Component } from 'react';
import RoomsList from '../containers/RoomsList';
import CommentsList from '../containers/CommentsList';
import ReplyForm from '../containers/ReplyForm';

import { Grid } from 'semantic-ui-react';

export default class Chat extends Component {
	render() {
		return (
			<Grid columns={2} container>
				<Grid.Column width={4}>
					<RoomsList />
				</Grid.Column>
				<Grid.Column>
					<Grid.Row>
						<CommentsList />
					</Grid.Row>
					<Grid.Row>
						<ReplyForm />
					</Grid.Row>
				</Grid.Column>
			</Grid>
		);
	}
}
