/*
    Purpose: Display the information for a single event.
    Author(s): Ryan Crowley
*/

import React, { Component } from 'react'


class EventCard extends Component {
    render() {
        return (
            <div className="card-container">
                <div className="card">
                    <h3>Name of Event</h3>
                    <p>
                        Location of Event
                        <br />Date/Of/Event
                    </p>
                </div>
            </div>
        )
    }

}

export default EventCard