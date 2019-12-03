import React, { Component } from 'react'

export class FriendsCard extends Component {
    render() {
        const { friend } = this.props
        const { removeFriend } = this.props
        return (
            <div className="card">
                <div className="card-content">
                    <h3>{friend.user.fullName}</h3>
                    <button className="btn btn-danger" onClick={() => removeFriend(friend.id)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default FriendsCard
