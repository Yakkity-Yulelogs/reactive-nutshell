import { Route } from "react-router-dom";
import React, { Component } from "react";
import TasksList from "./tasks/TasksList"
import FriendsList from "./friends/FriendsList";
import EventsList from './events/EventsList'
import ArticlesList from "../components/Articles/ArticlesList"
import ArticlesNewForm from "../components/Articles/ArticlesNewForm"
import FriendsNewForm from "./friends/FriendsNewForm";
import ArticleEditForm from "../components/Articles/ArticlesEditForm"

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
          path="/articles/:articleId(\d+)/edit" render={props => {
            return <ArticleEditForm {...props} />
          }}
        />

        <Route
          exact path="/register" render={props => {
            return null
            // Remove null and return the component which will handle user registration
          }}
        />

        <Route
          exact path="/friends" render={props => {
            return <FriendsList {...props} />
          }}
        />
        <Route
          path="/friends/new" render={props => {
            return <FriendsNewForm {...props} />
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
            return <TasksList />
          }}
        />

        <Route
          path="/events" render={props => {
            return <EventsList {...props} />
            // Remove null and return the component which will show the user's events
          }}
        />

      </React.Fragment>
    );
  }
}
