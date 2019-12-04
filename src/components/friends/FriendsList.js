import React, { Component } from 'react'
import ApiFriends from './ApiFriends'
import FriendsCard from './FriendsCard'
export class FriendsList extends Component {
    state = {
        friends: [],
    }

    updateFriendsState = array => {
        const newState = { friends: [] };
        array.forEach(friend => {
            // include deleteId so that can delete the correct primary key from "friends" endpoint
            newState.friends = [...newState.friends, { deleteId: friend.id, ...friend.user }]
        })
        this.setState(newState)    
    }

    componentDidMount() {
        ApiFriends.getAllFriendsWithNames()
            .then(this.updateFriendsState)
    }

    removeFriend = id => {
        ApiFriends.removeFriend(id)
            .then(ApiFriends.getAllFriendsWithNames)
            .then(this.updateFriendsState)
    }

    render() {
        const { friends } = this.state

        return (
            <div className="container-cards">
                <h1>User Friends</h1>
                <button className="btn btn-primary" onClick={() => this.props.history.push("/friends/new")}>Add New Friend</button>
                {friends.map(user => {
                    return <FriendsCard 
                                key={user.id}
                                user={user}
                                isFriend={true}
                                removeFriend={this.removeFriend}
                                />
                })}
            </div>
        )
    }
}

export default FriendsList
