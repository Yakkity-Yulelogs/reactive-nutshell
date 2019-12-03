import React, { Component } from 'react'
import FriendsCard from './FriendsCard'
import ApiFriends from './ApiFriends';

export class FriendsNewForm extends Component {
    state = {
        
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
    
    render() {
        return (
            <div>
                <h1>Add New Friend</h1>
                <ul>
                    <FriendsCard />
                </ul>
            </div>
        )
    }
}

export default FriendsNewForm
