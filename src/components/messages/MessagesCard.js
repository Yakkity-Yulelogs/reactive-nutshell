/* 
    Purpose: Display an individual message card with dynamic style/buttons based on currently logged in user
    Author: Ryan Bishop (2019)
*/

import React, { Component } from 'react'
import { convertDateTimeFromISO } from '../../modules/DateTime'

//TODO: replace with localStorage authentication later
const loggedInUser = 1

export class MessagesCard extends Component {
    render() {
        const { timestamp, message, userId } = this.props.message
        const { user: { fullName }} = this.props.message
        const { editMessage, deleteMessage } = this.props

        // setup unique message styling for current user
        let messageClasses = "otherUser"
        if (loggedInUser === userId){
            messageClasses = "currentUser"
        }
        const displayDateTime = convertDateTimeFromISO(timestamp).toLocaleString()

        return (
            <div className={`${messageClasses} card`}>
                <div className="card-body">
                    <span><b>{fullName}</b></span>
                    <span className="small"> {displayDateTime} </span>
                    {messageClasses === "currentUser" && 
                        <>
                            <button className="btn btn-warning btn-sm" onClick={()=>{editMessage(this.props.message.id)}}>Edit</button>
                            <button className="btn btn-danger btn-sm" onClick={()=>{deleteMessage(this.props.message.id)}}>X</button>
                        </>
                    }
                    <p>{message}</p>
                </div>
            </div>
        )
    }
}

export default MessagesCard
