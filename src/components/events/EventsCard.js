/*
    Purpose: Display the information for a single event.
    Author(s): Ryan Crowley
*/
import React, { Component } from 'react'



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
                            <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => {
                                this.props.deleteEvent(this.props.event.id)
                            }}
                            >
                            Delete
                        </button>
                        : null}
                    </div>
                </div>
            </React.Fragment >
        )
    }

}

export default EventsCard