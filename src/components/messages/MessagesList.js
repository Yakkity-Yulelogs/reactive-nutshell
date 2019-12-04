import React, { Component } from 'react';
import ApiMessages from './ApiMessages';
import MessagesCard from './MessagesCard';

const { getAllMessages } = ApiMessages
export class MessagesList extends Component {
	state = {
		messages: []
	};

	componentDidMount() {
		getAllMessages().then((messages) => {
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
