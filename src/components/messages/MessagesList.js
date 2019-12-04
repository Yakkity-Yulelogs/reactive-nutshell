import React, { Component } from 'react';
import ApiMessages from './ApiMessages';
import MessagesCard from './MessagesCard';

export class MessagesList extends Component {
	state = {
		messages: []
	};

	componentDidMount() {
		ApiMessages.getAllMessages().then((messages) => {
            console.log('messages', messages);
            this.setState({
                messages: messages
            })
		});
	}

	render() {
		const { messages } = this.state;
		return (
			<>
			    <div className="container-cards">
    				<h1>Messages</h1>
    				{messages.map((message) => {
    					return <MessagesCard key={message.id} message={message} />;
    				})}
    			</div>
			</>
		);
	}
}

export default MessagesList;
