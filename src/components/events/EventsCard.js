/*
    Purpose: Display the information for a single event.
    Author(s): Ryan Crowley
*/

import React, { Component } from 'react'


class EventsCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
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

export default EventsCard