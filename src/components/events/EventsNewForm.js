import React, { Component } from 'react'
import EventsApiManager from './EventsApiManager'
import { convertDateTimeFromISO } from "../../modules/DateTime"


// CHANGE THIS AFTER LOGIN
const loggedInUser = 1

class EventsNewForm extends Component {
    state = {
        eventName: "",
        eventDate: "",
        location: "",
        loadingStatus: false
    }

    // returns boolean of whether event takes place before today or not before today
    isCurrentEvent = (eventObject) => {
        const now = new Date()
        const nowDay = (now.getDay()) + 1
        const nowYear = now.getFullYear()
        const nowMonth = (now.getMonth()) + 1

        const eventFullDate = convertDateTimeFromISO(eventObject.eventDate)
        const eventToday = (eventFullDate.getDay()) + 2
        const eventMonth = (eventFullDate.getMonth()) + 1
        const eventYear = eventFullDate.getFullYear()

        if (eventYear >= nowYear && eventMonth >= nowMonth && eventToday >= nowDay) {
            return true
        } else {
            return false
        }
    }

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewEvent = evt => {
        evt.preventDefault()
        if (this.state.eventName ==="" || this.state.eventDate ==="" || this.state.location ==="") {
            window.alert("Please input an Event Name, Event Date, and location")
        } else {
            this.setState({loadingStatus: true})
            const newEvent = {
                userId: loggedInUser,
                eventName: this.state.eventName,
                eventDate: this.state.eventDate,
                location: this.state.location
            }  
            if (this.isCurrentEvent(newEvent)) {
                // Post event to database and redirect user to Events List
                EventsApiManager.addNewEvent(newEvent)    
                .then(() => this.props.history.push("/events"))
            } else {
                this.setState({loadingStatus: false})
                window.alert("Please input a date not in the past")
            }  
        }
    }

    render() {
        return(
            <React.Fragment>
                <form>
                    <fieldset>
                        <div>
                            <label htmlFor="eventName">Event Name</label>
                            <input 
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="eventName"
                                placeholder="Event Name"
                            />
                            <label htmlFor="location">Location</label>
                            <input 
                                type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="location"
                                placeholder="Location"
                            />
                            <label htmlFor="eventDate">Event Date</label>
                            <input 
                            // type="date" is causing a depreciation error
                                type="date"
                                required
                                onChange={this.handleFieldChange}
                                id="eventDate"
                                placeholder="Event Date"
                            />
                        </div>
                        <div>
                            <button 
                                type="button"
                                disabled= {this.state.loadingStatus}
                                onClick={this.constructNewEvent}
                            >Submit
                            </button>
                        </div>
                    </fieldset>
                </form>
            </React.Fragment>
        )
    }

}

export default EventsNewForm