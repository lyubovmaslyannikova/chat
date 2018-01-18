import React from 'react'; 
import { Segment, Comment } from 'semantic-ui-react';  

export class CommentsList extends React.Component { 
	render() {
		const comments = this.props.messages.map((message) => {
			let date = (new Date(message.date)).toString().slice(0, -15);

			return (
				<Comment key={message.id}> 
					<Comment.Content>
						<Comment.Author as='a'>{message.username}</Comment.Author>
						<Comment.Metadata>
							<div>{date}</div>
						</Comment.Metadata>
						<Comment.Text>{message.content}</Comment.Text>
						<Comment.Actions>
							<Comment.Action>delete</Comment.Action>
						</Comment.Actions>
					</Comment.Content>
				</Comment>  
			);
		});

		return (  
			<Segment basic> 
				<Comment.Group> 
					{comments}
				</Comment.Group> 
			</Segment>  
		);
	}
} 
