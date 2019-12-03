import { Route } from "react-router-dom";
import React, { Component } from "react";
import EventsList from './events/EventsList'
import ArticlesList from "../components/Articles/ArticlesList"
import ArticlesNewForm from "../components/Articles/ArticlesNewForm"

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
            return <ArticlesList {...props} />
            // Remove null and return the component which will show news articles
          }}
        />
         <Route path="/articles/new" render={(props) => {
          return <ArticlesNewForm {...props} />
        }} />

        <Route
          exact path="/register" render={props => {
            return null
            // Remove null and return the component which will handle user registration
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route
          path="/events" render={props => {
            return <EventsList {...props}/>
            // Remove null and return the component which will show the user's events
          }}
        />

      </React.Fragment>
    );
  }
}
