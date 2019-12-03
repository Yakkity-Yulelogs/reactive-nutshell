import React, { Component } from 'react'

export class FriendsCard extends Component {
    render() {
        const { friend } = this.props
        const { removeFriend } = this.props
        // console.log('FriendsCard', friend)
        return (
            <div className="card">
                <div className="card-content">
                    <h3>{friend.fullName}</h3>
                    <button className="btn btn-danger" onClick={() => removeFriend(friend.deleteId)}>Remove</button>
                </div>
            </div>
        )
    }
}

export default FriendsCard
