/*
    Purpose: Display a form that allows a user to edit an existing event.
    Author(s): Ryan Crowley
*/
import React, { Component } from 'react'
import EventsApiManager from './EventsApiManager'
import { isCurrentEvent } from './EventsHelpers'

// CHANGE THIS AFTER LOGIN
const loggedInUser = 1

class EventsEditForm extends Component {
    state = {
        eventName: "",
        eventDate: "",
        location: "",
        loadingStatus: false
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    updateExistingEvent = evt => {
        evt.preventDefault()
        if (this.state.eventName === "" || this.state.eventDate === "" || this.state.location === "") {
            window.alert("Please input an Event Name, Event Date, and location")
        } else {
            this.setState({ loadingStatus: true })
            const updatedEvent = {
                id: this.props.match.params.eventId,
                userId: loggedInUser,
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                location: this.state.location
            }
            if (isCurrentEvent(updatedEvent)) {
                // Put event to database and redirect user to Events List
                EventsApiManager.editEvent(updatedEvent)
                    .then(() => this.props.history.push("/events"))
            } else {
                this.setState({ loadingStatus: false })
                window.alert("Please input a date not in the past")
            }
        }
    }

    componentDidMount() {
        EventsApiManager.getSingleEvent(this.props.eventId)
            .then(event => {
                this.setState({
                    eventName: event.eventName,
                    eventDate: event.eventDate,
                    location: event.location,
                    loadingStatus: false
                })
            })
    }

    render() {
        return(
            <React.Fragment>
                <form>
                    <fieldset>
                        <h1>Edit Event</h1>
                        <div>
                            <label htmlFor="eventName">Event</label>
                            <br />
                            <input 
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                value={this.state.eventName}
                                id="eventName"
                                placeholder="event"
                            />
                            <br />
                            <label htmlFor="location">Where?</label>
                            <br />
                            <input 
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                value={this.state.location}
                                id="location"
                                placeholder="Location"
                            />
                            <br />
                            <label htmlFor="eventDate">When?</label>
                            <br />
                            <input 
                            // type="date" is causing a depreciation error
                                type="date"
                                required
                                onChange={this.handleFieldChange}
                                value={this.state.eventDate}
                                id="eventDate"
                                placeholder="Event Date"
                            />
                        </div>
                        <div>
                            <button 
                                type="button"
                                className="btn btn-primary"
                                // disabled= {this.state.loadingStatus}
                                onClick={this.updateExistingEvent}
                            >Update
                            </button>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }

}

export default EventsEditForm