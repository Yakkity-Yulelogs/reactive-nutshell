import { Route, Redirect } from "react-router-dom";
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
import RegisterMain from "./register/RegisterMain"
import EventsEditForm from "./events/EventsEditForm"
import RegisterLoginForm from "./register/RegisterLoginForm";

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return this.props.user ? 
              <ArticlesList {...props} /> :
              <Redirect to="/login" />
          }}
        />
        <Route path="/articles/new" render={(props) => {
          return this.props.user ? <ArticlesNewForm {...props} /> : <Redirect to="/login" />
        }} />
        <Route
          path="/articles/:articleId(\d+)/edit" render={props => {
            return this.props.user ? <ArticleEditForm {...props} /> : <Redirect to="/login" />
          }}
        />

        <Route
          exact path="/login" render={props => {
            return <RegisterLoginForm setUser={this.props.setUser} {...props} />
          }}
        />
        <Route
          exact path="/register" render={props => {
            return <RegisterMain setUser={this.props.setUser} {...props} />
          }}
        />

        <Route
          exact path="/friends" render={props => {
            return this.props.user ? <FriendsList {...props} /> : <Redirect to="/login" />
          }}
        />
        <Route
          path="/friends/new" render={props => {
            return this.props.user ? <FriendsNewForm {...props} /> : <Redirect to="/login" />
          }}
        />

        <Route
          exact path="/messages" render={props => {
            return this.props.user ? <MessagesList {...props} /> : <Redirect to="/login" />
          }}
        />
        <Route
          path="/messages/new" render={props => {
            return this.props.user ? <MessagesNewForm {...props} /> : <Redirect to="/login" />
          }}
        />
        <Route
          path="/messages/:messageId(\d+)/edit" render={props => {
            return this.props.user ? <MessagesEditForm {...props} /> : <Redirect to="/login" />
          }}
        />

        <Route
          exact path="/tasks" render={props => {
            return this.props.user ? <TasksList {...props} /> : <Redirect to="/login" />
          }}
        />
        <Route path="/tasks/new" render={(props) => {
          return this.props.user ? <TasksNewForm {...props} /> : <Redirect to="/login" />
        }} />
        <Route
          exact path="/tasks/:taskId(\d+)/edit" render={props => {
            return this.props.user ? <TasksEditForm {...props} /> : <Redirect to="/login" />
          }}
        />

        <Route
          exact path="/events" render={props => {
            return this.props.user ? <EventsList {...props} /> : <Redirect to="/login" />
            // Remove null and return the component which will show the user's events
          }}
        />
        <Route path="/events/new" render={(props) => {
          return this.props.user ? <EventsNewForm {...props} /> : <Redirect to="/login" />
        }}
        />
        <Route path="/events/:eventId(\d+)/edit" render={(props) => {
          return this.props.user ? <EventsEditForm
            eventId={parseInt(props.match.params.eventId)}
            {...props} /> : <Redirect to="/login" />
        }}
        />

      </React.Fragment>
    );
  }
}
