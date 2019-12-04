//Author: Trey Suiter

import React, { Component } from 'react'
import ArticlesCard from './ArticlesCard'
import ApiManager from '../../modules/ApiManager'
// import { sortElementsByDate } from "../../modules/DateTime"
import ArticlesApiManager from "../Articles/ArticlesApiManager"
import "./Articles.css"

const loggedInUser = 1

class ArticlesList extends Component {

    state = {
        articles: [],
    }

    // putOwnFirstArticleFirst = (articlesArray) => {
    //     const originalArray = articlesArray
    //     const finalArray = []
    //     let foundFirstArticle = false

    //     for (const evt of originalArray) {

    //         if (!foundFirstArticle && evt.userId === loggedInUser) {
    //             finalArray.unshift(evt)
    //             foundFirstArticle = true

    //         } else {

    //             finalArray.push(evt)
    //         }
    //     }
    //     return finalArray
    // }

    createStringOfFriends(friendsArray) {
        let friendsParam = ""

        for (const friend of friendsArray) {
            friendsParam += `&userId=${friend.userId}`
        }
        console.log('is this freindsParam', friendsParam)
        return friendsParam
    }

    componentDidMount() {

        ArticlesApiManager.getAllFriends(loggedInUser)
            .then(friendsList => {
                console.log("is this a friends list?", friendsList)
                return this.createStringOfFriends(friendsList)
            })
            .then(friendString => {
                ArticlesApiManager.getUserAndFriendsArticlesSorted(loggedInUser, friendString)
                    .then(articlesList => {
                        this.setState({
                            articles: articlesList
                        })
                    })
            })
    }

    //     ApiManager.getAll("articles", `userId=${loggedInUser}`)
    //         .then((articlesArray) => {
    //             this.setState({
    //                 articles: sortElementsByDate(articlesArray, "timestamp")
    //             })
    //         })
    // }

    deleteArticle = id => {
        ApiManager.delete("articles", id)
            .then(ArticlesApiManager.getAllFriends(loggedInUser)
            .then(friendsList => {
                return this.createStringOfFriends(friendsList)
            })
            .then(friendString => {
                ArticlesApiManager.getUserAndFriendsArticlesSorted(loggedInUser, friendString)
                    .then(articlesList => {
                        this.setState({
                            articles: this.putOwnFirstArticleFirst(articlesList)
                        })
                    })
            })
            //     ApiManager.getAll("articles", `userId=${loggedInUser}`)
            //         .then((updatedArticles) => {
            //             this.setState({
            //                 articles: sortElementsByDate(updatedArticles, "timestamp")
            //             })
            //         })
            // })
            )
        }

    render() {

        return (
            <>
                <section className="section-content">
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
                            loggedInUser={loggedInUser}
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