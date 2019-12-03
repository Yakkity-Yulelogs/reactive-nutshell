import React, { Component } from 'react'
import EventsCard from './EventsCard'
import EventApiManager from './EventsApiManager'
import './Events.css'

// WILL NEED TO CHANGE THIS ONCE LOGIN IS FUNCTIONING
const loggedInUser = 1

class EventsList extends Component {
    state = {
        events: []
    }

    putOwnFirstEventFirst = (eventsArray) => {
        const oldArray = eventsArray
        const finalArray = []
        let foundFirstEvent = false

        for (const evt of oldArray) {
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
        return finalArray
    }

    // create a string to allow query for each friend
    createStringOfFriends(friendsArray) {
        let friendsParam = ""

        for (friend of friendsArray) {
            friendsParam += `&userId=${friend.userId}`
        }
        return friendsParam
    }


    componentDidMount() {
        
        EventApiManager.getAllEventsSorted()
            .then(eventsList => {
                this.setState({
                    events: this.putOwnFirstEventFirst(eventsList)
                    // events: eventsList
                })
            })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-cards" id="events">
                    {this.state.events.map(event =>
                        <EventsCard
                            key={event.id}
                            event={event}
                        />)}

                </div>
            </React.Fragment>

        )
    }

}

export default EventsList