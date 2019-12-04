import React, { Component } from 'react'
import ApiMessages from './ApiMessages'
import { convertDateTimeFromISO } from '../../modules/DateTime'

const { getSingleMessage, saveEditedMessage } = ApiMessages
export class MessagesEditForm extends Component {
    state = {
        message: {},
        messageText: "",
        loadingStatus: true,
    }

    componentDidMount() {
        const { messageId } = this.props.match.params
        getSingleMessage(messageId)
        .then((message) =>{
            this.setState({
                message: message,
                messageText: message.message,
                loadingStatus: false,
            })
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    
    saveEditedEntry = e => {
        e.preventDefault()
        // console.log('save button clicked')
        const { message, messageText } = this.state
        const editedEntry = {
            id: message.id,
            userId: message.userId,
            message: messageText,
            timestamp: message.timestamp,
        }
        // console.log('editedEntry', editedEntry)
        saveEditedMessage(editedEntry)
        .then(()=>this.props.history.push("/messages"))
    }
    
    render() {
        const { message, messageText, loadingStatus } = this.state
        const displayDateTime = convertDateTimeFromISO(message.timestamp).toLocaleString()
        const blockStyle = {
            display: "block",
            width: "100%"
        }
        return (
            <div className="card">
                <div className="card-body">
                    <h2>Edit Message</h2>
                    <p>{ displayDateTime }</p>
                    <span><b>Original Message:</b></span><p>{ message.message }</p>
                    <span><b>Edit Message:</b></span>
                    <input name="messageText" value={messageText} onChange={this.handleChange}
                           style={blockStyle}/>
                    <button type="button"
                            className="btn btn-primary" 
                            disabled={loadingStatus}
                            onClick={this.saveEditedEntry}
                    >Save</button>
                    <button type="button"
                            className="btn btn-danger" 
                            disabled={loadingStatus}
                            onClick={()=>this.props.history.push("/messages")}
                    >Cancel</button>
                </div>
            </div>
        )
    }
}

export default MessagesEditForm
