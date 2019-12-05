import React, { Component } from 'react'
import { createDateTimeToISO } from '../../modules/DateTime'
import ApiMessages from './ApiMessages'

const { postNewMessage } = ApiMessages

const loggedInUserId = parseInt(localStorage.getItem("userId"))
export class MessagesNewForm extends Component {
    state = {
        messageText: '',
        loggedInUserId: '',
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    handleSubmit = e => {
        e.preventDefault()
        const messageContent = {
            userId: loggedInUserId,
            message: this.state.messageText,
            timestamp: createDateTimeToISO()
        }
        postNewMessage(messageContent)
        .then(()=>this.props.history.push("/messages"))
    }
    render() {
        const blockStyle = {
            display: "block",
            width: "100%"
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h1>New Message</h1>
                    <form onSubmit={this.handleSubmit}>
                        <input name="messageText"
                                style={blockStyle}
                                onChange={this.handleChange}
                                placeholder="Enter message"
                                required
                                />
                        <button type="submit"
                                className="btn btn-success"
                        >Post </button>
                    </form>
                </div>
            </div>
        )
    }
}

export default MessagesNewForm
