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
                console.log('friends', friends)
                this.setState({
                    friends: friends,
                })
            })
    }

    removeUser = id => {
        console.log('removing friend', id)
        ApiFriends.removeFriend(id)
            .then(ApiFriends.getAllFriendsWithNames)
            .then(friends => {
                this.setState({
                    friends: friends,
                })
            })
    }

    render() {
        const { friends } = this.state

        return (
            <div className="container-cards">
                <h1>User Friends</h1>
                {friends.map(friend => {
                    return <FriendsCard 
                                key={friend.id}
                                friend={friend} 
                                removeUser={this.removeUser}
                                // {...this.props}        
                                />
                })}
            </div>
        )
    }
}

export default FriendsList
