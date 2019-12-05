/* 
    Purpose: Fetch list of messages in the database to then create MessagesCard components for each
    Author: Ryan Bishop (2019)
*/

import React, { Component } from 'react';
import ApiMessages from './ApiMessages';
import MessagesCard from './MessagesCard';
import ApiFriends from '../friends/ApiFriends'

const { getAllMessages, deleteUserMessage } = ApiMessages
const { getAllFriendsWithNames } = ApiFriends
//TODO: replace with localStorage authentication
const loggedInUserId = 1
export class MessagesList extends Component {
	state = {
		messages: [],
		friendIds: [],
	};

	updateStateMessages = (array) => {
		this.setState({
			messages: array
		})
	}

	componentDidMount() {
		getAllMessages().then(this.updateStateMessages);
		getAllFriendsWithNames().then((friends) => {
			// setState should only be run once, so this is setting up a temporary obj to store the data from the forEach
			const newState = {
				messages: this.state.messages,
				friendIds: []
			};
			friends.forEach((friend) => {
				// newState.friends = [ ...newState.friends, { ...friend.user } ];
				newState.friendIds = [ ...newState.friendIds, friend.userId ];
			});
			this.setState(newState);
			//https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
			this.scrollToBottom();
		});
	}

	//https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react
	componentDidUpdate() {
		this.scrollToBottom();
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

	scrollToBottom = () => {
		this.messagesEnd.scrollIntoView({ behavior: "smooth" });
	}

	render() {
		const { messages } = this.state;
		const center = {
			textAlign: "center", 
			width: "100%"
		}

		const scrollContainer = {
			height: "400px",
			overflow: "auto",
			padding: "20px",
		}
		return (
			<>
			    <div className="container-cards">
    				<div style={center}>
    					<h1>Messages</h1>
						<button 
							type="button"
							className="btn btn-primary"
							onClick={()=>this.props.history.push("/messages/new")}>
								New Message
						</button>
    				</div>
    				<div id="scroll-containre" style={scrollContainer}>
						<div style={center}>(Oldest)</div>
    					{messages.map((message) => {
							// check for friendStatus to display button logic to add new friends
							const isFriendOrSelf = this.state.friendIds.includes(message.userId) ||
													message.userId === loggedInUserId
							return <MessagesCard
										key={message.id} 
										message={message}
										isFriendOrSelf={isFriendOrSelf}
										editMessage={this.editMessage}
										deleteMessage={this.deleteMessage}
										{...this.props}
									/>;
	    				})}
						{/* enables auto-scroll to the bottom of the chat window to show most recent message*/}
						{/* https://stackoverflow.com/questions/37620694/how-to-scroll-to-bottom-in-react */}
						<div style={{ float:"left", clear: "both", textAlign: "center", width: "100%" }}
             				ref={(el) => { this.messagesEnd = el; }}>(Newest)
        				</div>
    				</div>
    			</div>
			</>
		);
	}
}

export default MessagesList;
