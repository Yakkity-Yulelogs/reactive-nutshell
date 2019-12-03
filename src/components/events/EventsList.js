import React, { Component } from 'react'
import EventsCard from './EventsCard'
import EventApiManager from './EventsApiManager'

class EventsList extends Component {
    state = {
        events: []
    }

    componentDidMount () {
        EventApiManager.getAllEvents()
        .then(eventsList => {
            this.setState({
                events: eventsList
            })
        })
    }

    render() {
        return (
            <React.Fragment>
                <div className="container-cards">
                    {this.state.events.map(event => 
                        <EventsCard 
                            key={event.id}
                        />)}

                </div>
            </React.Fragment>

        )
    }

}

export default EventsList