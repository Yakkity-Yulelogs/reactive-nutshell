import React, { Component } from 'react'
import ApiFriends from './ApiFriends'
import FriendsCard from './FriendsCard'
export class FriendsList extends Component {
    state = {
        friends: [],
    }

    componentDidMount() {
        ApiFriends.getAllFriendsWithNames()
            .then(friends => {
                const newState = { friends: []};
                friends.forEach(friend => {
                    newState.friends = [...newState.friends,{deleteId: friend.id, ...friend.user}]
                })
                this.setState(newState)
            })
    }

    removeFriend = id => {
        // console.log('removing friend', id)
        ApiFriends.removeFriend(id)
            .then(ApiFriends.getAllFriendsWithNames)
            .then(friends => {
                const newState = { friends: []};
                friends.forEach(friend => {
                    newState.friends = [...newState.friends,{deleteId: friend.id, ...friend.user}]
                })
                this.setState(newState)
            })
    }

    render() {
        const { friends } = this.state

        return (
            <div className="container-cards">
                <h1>User Friends</h1>
                <button className="btn btn-primary" onClick={() => this.props.history.push("/friends/new")}>Add New Friend</button>
                {friends.map(friend => {
                    return <FriendsCard 
                                key={friend.id}
                                friend={friend} 
                                removeFriend={this.removeFriend}
                                // {...this.props}        
                                />
                })}
            </div>
        )
    }
}

export default FriendsList
