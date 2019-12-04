/*
    Purpose: Make fetch calls to database for events and friends to create a list of event objects.
    This component renders the EventsCards component.
    Author(s): Ryan Crowley
*/
import React, { Component } from 'react'
import EventsCard from './EventsCard'
import EventApiManager from './EventsApiManager'
import { convertDateTimeFromISO } from "../../modules/DateTime"
import './Events.css'

// WILL NEED TO CHANGE THIS ONCE LOGIN IS FUNCTIONING
const loggedInUser = 1

class EventsList extends Component {
    state = {
        events: []
    }

    // returns boolean of whether event takes place before today or not before today
    isCurrentEvent = (eventObject) => {
        const now = new Date()
        const nowDay = (now.getDay()) + 1
        const nowYear = now.getFullYear()
        const nowMonth = (now.getMonth()) + 1

        const eventFullDate = convertDateTimeFromISO(eventObject.eventDate)
        const eventToday = (eventFullDate.getDay()) + 1
        const eventMonth = (eventFullDate.getMonth()) + 1
        const eventYear = eventFullDate.getFullYear()

        if (eventYear >= nowYear && eventMonth >= nowMonth && eventToday >= nowDay) {
            return true
        } else {
            return false
        }

    }

    // returns new array where loggedInUser's first event is always the first event
    putOwnFirstEventFirst = (eventsArray) => {
        const oldArray = eventsArray
        const finalArray = []
        let foundFirstEvent = false

        // we only want to update finalArray if the event takes place today or later.
        for (const evt of oldArray) {
            if (this.isCurrentEvent(evt)) {

                if (!foundFirstEvent && evt.userId === loggedInUser) {
                    // add user's own first event as the first index position in finalArray
                    finalArray.unshift(evt)
                    foundFirstEvent = true
                    
                } else {
                    // if own event or friends evt
                    if (evt.userId)
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
        EventApiManager.getAllFriends(loggedInUser)
            .then(friendsList => {
                return this.createStringOfFriends(friendsList)
            })
            .then(friendString => {
                EventApiManager.getUserAndFriendEventsSorted(loggedInUser, friendString)
                    .then(eventsList => {
                        this.setState({
                            events: this.putOwnFirstEventFirst(eventsList)
                        })
                    })
            }
            )
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-cards" id="events">
                    {this.state.events.map(event =>
                        <EventsCard
                            key={event.id}
                            event={event}
                            loggedInUser={loggedInUser}
                        />)}

                </div>
            </React.Fragment>

        )
    }

}

export default EventsList