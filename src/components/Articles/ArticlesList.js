//Author: Trey Suiter

import React, { Component } from 'react'
import ArticlesCard from './ArticlesCard'
import ApiManager from '../../modules/ApiManager'
// import { sortElementsByDate } from "../../modules/DateTime"
import ArticlesApiManager from "../Articles/ArticlesApiManager"
import "./Articles.css"


//! Change this reference for local storage
function loggedInUserId() {return parseInt(localStorage.getItem("userId"))}

//Handles landing page for articles

class ArticlesList extends Component {

    state = {
        articles: [],
    }

    //Creates parameters to send to fetch call to get friends list

    createStringOfFriends(friendsArray) {
        let friendsParam = ""

        for (const friend of friendsArray) {
            friendsParam += `&userId=${friend.userId}`
        }
        return friendsParam
    }

    //Sets state with user and friends articles sorted by timestamp descending; includes nested full name of user

    componentDidMount() {

        ArticlesApiManager.getAllFriends(loggedInUserId())
            .then(friendsList => {
                return this.createStringOfFriends(friendsList)
            })
            .then(friendString => {
                ArticlesApiManager.getUserAndFriendsArticlesSorted(loggedInUserId(), friendString)
                    .then(articlesList => {
                        this.setState({
                            articles: articlesList
                        })
                    })
            })
    }

    //Deletes user submitted articles

    deleteArticle = id => {
        ApiManager.delete("articles", id)
            .then(ArticlesApiManager.getAllFriends(loggedInUserId())
                .then(friendsList => {
                    return this.createStringOfFriends(friendsList)
                })
                .then(friendString => {
                    ArticlesApiManager.getUserAndFriendsArticlesSorted(loggedInUserId(), friendString)
                        .then(articlesList => {
                            this.setState({
                                articles: articlesList
                            })
                        })
                })
            )
    }

    render() {

        return (
            <>
                <section className="section-content">
                    <h1>Articles</h1>
                    <button type="button"
                        className="btn btn-primary"
                        onClick={() => { this.props.history.push("/articles/new") }}>
                        New Article
                    </button>
                </section>
                <div className="container-cards">
                    {this.state.articles.map(article =>
                        <ArticlesCard
                            key={article.id}
                            userName={article.user.fullName}
                            loggedInUser={loggedInUserId()}
                            article={article}
                            deleteArticle={this.deleteArticle}
                            {...this.props}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default ArticlesList