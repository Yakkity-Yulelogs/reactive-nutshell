import React, { Component } from 'react'

export class FriendsCard extends Component {
    render() {
        const { user, isFriend } = this.props
        const { removeFriend, addFriend } = this.props
        
        return (
            <div className="card">
                <div className="card-content">
                    <p>{user.fullName}</p>
                    {isFriend ? 
                        <button className="btn btn-danger" onClick={() => removeFriend(user.deleteId)}>Remove</button> :
                        <button className="btn btn-success" onClick={() => addFriend(user.id)}>Add Friend</button>
                    }

                </div>
            </div>
        )
    }
}

export default FriendsCard
