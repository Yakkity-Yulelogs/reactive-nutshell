import React, { Component } from 'react'

export class FriendsCard extends Component {
    render() {
        const { friend, isFriend } = this.props
        const { removeFriend, addFriend } = this.props
        // console.log('FriendsCard', friend)
        return (
            <div className="card">
                <div className="card-content">
                    <p>{friend.fullName}</p>
                    {isFriend ? 
                        <button className="btn btn-danger" onClick={() => removeFriend(friend.deleteId)}>Remove</button> :
                        <button className="btn btn-success" onClick={() => addFriend(friend.id)}>Add Friend</button>
                    }

                </div>
            </div>
        )
    }
}

export default FriendsCard
