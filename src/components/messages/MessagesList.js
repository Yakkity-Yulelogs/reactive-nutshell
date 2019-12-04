/* 
    Purpose: Fetch list of messages in the database to then create MessagesCard components for each
    Author: Ryan Bishop (2019)
*/

import React, { Component } from 'react';
import ApiMessages from './ApiMessages';
import MessagesCard from './MessagesCard';

const { getAllMessages, deleteUserMessage } = ApiMessages
export class MessagesList extends Component {
	state = {
		messages: []
	};

	updateStateMessages = (array) => {
		this.setState({
			messages: array
		})
	}

	componentDidMount() {
		getAllMessages().then(this.updateStateMessages);
	}

	editMessage = id => {
		this.props.history.push(`/messages/${id}/edit`)
	}

	deleteMessage = id => {
		if (window.confirm("Delete this message?")){
			deleteUserMessage(id)
			.then(getAllMessages)
			.then(this.updateStateMessages)
		}
	}

	render() {
		const { messages } = this.state;
		return (
			<>
			    <div className="container-cards">
    				<h1>Messages</h1>
    				{messages.map((message) => {
						return <MessagesCard
									key={message.id} 
									message={message}
									editMessage={this.editMessage}
									deleteMessage={this.deleteMessage}
								/>;
    				})}
    			</div>
			</>
		);
	}
}

export default MessagesList;
