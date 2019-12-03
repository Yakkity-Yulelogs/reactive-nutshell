import React, { Component } from 'react'
import EventsCard from './EventsCard'
import EventApiManager from './EventsApiManager'
import './Events.css'

// WILL NEED TO CHANGE THIS ONCE LOGIN IS FUNCTIONING
const loggedInUser = 1

class EventsList extends Component {
    state = {
        events: [],
        friendsEvents: [],

    }



    componentDidMount () {
        EventApiManager.getOwnEventsSorted(loggedInUser)
        .then(eventsList => {
            this.setState({
                events: eventsList
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