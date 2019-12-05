import { Route } from "react-router-dom";
import React, { Component } from "react";
import TasksList from "./tasks/TasksList"
import FriendsList from "./friends/FriendsList";
import EventsList from './events/EventsList'
import ArticlesList from "../components/Articles/ArticlesList"
import ArticlesNewForm from "../components/Articles/ArticlesNewForm"
import FriendsNewForm from "./friends/FriendsNewForm";
import ArticleEditForm from "../components/Articles/ArticlesEditForm"
import EventsNewForm from "./events/EventsNewForm"
import TasksNewForm from "./tasks/TasksNewForm";
import MessagesList from "./messages/MessagesList";
import MessagesEditForm from "./messages/MessagesEditForm";
import TasksEditForm from "./TasksEditForm";
import MessagesNewForm from "./messages/MessagesNewForm";
import EventsEditForm from "./events/EventsEditForm"

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
          exact path="/messages" render={props => {
            return <MessagesList {...props} />
          }}
        />
        <Route
          path="/messages/new" render={props => {
            return <MessagesNewForm {...props} />
          }}
        />
        <Route
          path="/messages/:messageId(\d+)/edit" render={props => {
            return <MessagesEditForm {...props} />
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return <TasksList {...props} />
          }}
        />
        <Route path="/tasks/new" render={(props) => {
          return <TasksNewForm {...props} />
        }} />
        <Route
          exact path="/tasks/:taskId(\d+)/edit" render={props => {
            return <TasksEditForm {...props} />
          }}
        />

        <Route
          exact path="/events" render={props => {
            return <EventsList {...props} />
            // Remove null and return the component which will show the user's events
          }}
        />
        <Route path="/events/new" render={(props) => {
          return <EventsNewForm {...props} />
        }}
        />
        <Route path="/events/:eventId(\d+)/edit" render={(props) => {
          return <EventsEditForm
            eventId={parseInt(props.match.params.eventId)}
            {...props} />
        }}
        />

      </React.Fragment>
    );
  }
}
