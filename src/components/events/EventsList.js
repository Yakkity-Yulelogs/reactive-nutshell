/*
    Purpose: Make fetch calls to database for events and friends to create a list of event objects.
    This component renders the EventsCards component.
    Author(s): Ryan Crowley
*/
import React, { Component } from 'react'
import EventsCard from './EventsCard'
import EventApiManager from './EventsApiManager'
import {isCurrentEvent} from './EventsHelpers'
import './Events.css'

function loggedInUserId() {return parseInt(localStorage.getItem("userId"))}

class EventsList extends Component {
    state = {
        events: []
    }

    // deletes one event
    deleteEvent = id => {
        EventApiManager.deleteEvent(id)
        .then(() => {
            this.getEventsUpdateState()
        })
    }

    getEventsUpdateState = () => {
        EventApiManager.getAllFriends(loggedInUserId())
            .then(friendsList => {
                return this.createStringOfFriends(friendsList)
            })
            .then(friendString => {
                EventApiManager.getUserAndFriendEventsSorted(loggedInUserId(), friendString)
                    .then(eventsList => {
                        this.setState({
                            events: this.putOwnFirstEventFirst(eventsList)
                        })
                    })
            }
            )
    }


    // returns new array where loggedInUser's first event is always the first event
    putOwnFirstEventFirst = (eventsArray) => {
        const oldArray = eventsArray
        const finalArray = []
        let foundFirstEvent = false

        // we only want to update finalArray if the event takes place today or later.
        for (const evt of oldArray) {
            if (isCurrentEvent(evt)) {

                if (!foundFirstEvent && evt.userId === loggedInUserId()) {
                    // add user's own first event as the first index position in finalArray
                    finalArray.unshift(evt)
                    foundFirstEvent = true
                    
                } else {
                    // add evt to the end of the list
                    finalArray.push(evt)
                }
            }
        }
        return finalArray
    }

    // creates a string to allow query for each friend
    createStringOfFriends(friendsArray) {
        let friendsParam = ""

        for (const friend of friendsArray) {
            friendsParam += `&userId=${friend.userId}`
        }
        return friendsParam
    }


    componentDidMount() {
        this.getEventsUpdateState()
    }

    render() {
        return (
            <React.Fragment>
                <section className="section-content">
                <h1>Events</h1>
                <div>
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => {this.props.history.push('/events/new')}}>
                        New Event
                    </button>
                </div>
                </section>
                <div className="container-cards" id="events">
                    {this.state.events.map(event =>
                        <EventsCard
                            key={event.id}
                            event={event}
                            loggedInUser={loggedInUserId()}
                            deleteEvent={this.deleteEvent}
                            {...this.props}
                        />)}

                </div>
            </React.Fragment>

        )
    }

}

export default EventsList