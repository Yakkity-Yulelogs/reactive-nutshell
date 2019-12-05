/*
    Purpose: Display the information for a single event.
    Author(s): Ryan Crowley
*/
import React, { Component } from 'react'
import { Link } from 'react-router-dom'



class EventsCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className={`card 
                ${this.props.event.userId !== this.props.loggedInUser ? "friend-event" : "own-event"}`} >
                    <div className="card-content">
                        <h3>{this.props.event.eventName}</h3>
                        <p>
                            {this.props.event.location}
                            <br /><small>{this.props.event.eventDate}</small>
                        </p>
                        {this.props.event.userId === this.props.loggedInUser ?
                            <div className="buttons">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm"
                                    onClick={() => {
                                        this.props.deleteEvent(this.props.event.id)
                                    }}
                                >Delete</button>
                                <button
                                    type="button"
                                    className="btn btn-warning btn-sm"
                                    onClick={() => {
                                        this.props.history.push(`/events/${this.props.event.id}/edit`)
                                    }}
                                >Edit</button>
                            </div>
                            : null}
                    </div>
                </div>
            </React.Fragment >
        )
    }

}

export default EventsCard