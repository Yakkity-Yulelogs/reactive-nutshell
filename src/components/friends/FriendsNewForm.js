import React, { Component } from 'react';
import FriendsCard from './FriendsCard';
import ApiFriends from './ApiFriends';
import ApiManager from '../../modules/ApiManager';

// TODO: change to localStorage when implemented
const loggedInUserId = 1
export class FriendsNewForm extends Component {
	state = {
        friends: [],
        friendIds: [],
        nonFriends: [],
        searchTerm: "",
        loadingStatus: false,
	};

	componentDidMount() {
		ApiFriends.getAllFriendsWithNames().then((friends) => {
			const newState = { friends: [], friendIds: [] };
			friends.forEach((friend) => {
                newState.friends = [ ...newState.friends, { ...friend.user } ];
                newState.friendIds = [...newState.friendIds, friend.userId];
			});
            this.setState(newState);
        })
    }
    
    handleChange = e => {
        const stateToChange = {}
        stateToChange[e.target.id] = e.target.value
        this.setState(stateToChange)
    }

    searchNonFriends = e => {
        if (e.key === "Enter"){
            const { searchTerm, friendIds } = this.state
            ApiManager.getAll("users", `fullName_like=${searchTerm}`)
            .then(results => {
                const filtered = results.filter(result => {
                    return (result.id !== loggedInUserId && !friendIds.includes(result.id))
                })
                console.log('filtered results', filtered)
                this.setState({
                    nonFriends: filtered
                })
            })
        }
    }

    addFriend = id => {
        const newFriend = {
            loggedInUser: loggedInUserId,
            userId: id
        }
        ApiManager.post("friends", newFriend)
        .then(()=>this.props.history.push("/friends"))
    }

	render() {
		const { nonFriends, friends } = this.state;

		return (
			<div>
				<h1>Add New Friend</h1>
                <input id="searchTerm" placeholder="Search" onChange={this.handleChange} onKeyPress={this.searchNonFriends} />
                <h3>Search Results</h3>
                {nonFriends.length ? 
                    nonFriends.map((friend) => {
                        return (
                            <FriendsCard
                                key={friend.id}
                                friend={friend}
                                isFriend={false}
                                addFriend={this.addFriend}
                                {...this.props}
                            />
                        );
                    }) :
                    <h4>No results. Try another search term</h4>
                }
			</div>
		);
	}
}

export default FriendsNewForm;
