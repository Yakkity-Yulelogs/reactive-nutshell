import React, { Component } from 'react';
import FriendsCard from './FriendsCard';
import ApiFriends from './ApiFriends';

// TODO: change to localStorage when implemented
const loggedInUserId = 1
export class FriendsNewForm extends Component {
	state = {
        // friends: [],
        friendIds: [],
        nonFriends: [],
        searchTerm: "",
	};

	componentDidMount() {
		ApiFriends.getAllFriendsWithNames().then((friends) => {
            const newState = { 
                // friends: [], 
                friendIds: [] 
            };
			friends.forEach((friend) => {
                // newState.friends = [ ...newState.friends, { ...friend.user } ];
                newState.friendIds = [...newState.friendIds, friend.userId];
			});
            this.setState(newState);
        })
    }
    
    handleChange = e => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    searchUserNames = e => {
        // only search using input value after user hits 'Enter' key
        if (e.key === "Enter"){
            const { searchTerm, friendIds } = this.state
            ApiFriends.searchUsersByKeyWord(searchTerm)
            .then(results => {
                // only return non-friend userIds that also aren't current user
                const nonFriends = results.filter(result => {
                    return (result.id !== loggedInUserId && !friendIds.includes(result.id))
                })
                this.setState({
                    nonFriends: nonFriends
                })
            })
        }
    }

    addFriend = id => {
        const newFriend = {
            loggedInUser: loggedInUserId,
            userId: id
        }
        ApiFriends.follow(newFriend)
        .then(()=>this.props.history.push("/friends"))
    }

	render() {
		const { nonFriends } = this.state;

		return (
			<div className="container-cards">
				<h1>Add New Friend</h1>
                <input id="searchTerm" 
                    placeholder="Search Users"
                    onChange={this.handleChange}
                    onKeyPress={this.searchUserNames} 
                />
                <h3>Search Results</h3>
                <button className="btn btn-info" onClick={() => this.props.history.push("/friends")}>Go To Friends</button>
                {nonFriends.map((user) => {
                        return (
                            <FriendsCard
                                key={user.id}
                                user={user}
                                isFriend={false}
                                addFriend={this.addFriend}
                            />
                        );
                    })
                }
			</div>
		);
	}
}

export default FriendsNewForm;
