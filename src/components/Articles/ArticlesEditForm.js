//Author: Trey Suiter

import React, { Component } from "react"
import ApiManager from "../../modules/ApiManager"
import { createDateTimeToISO } from '../../modules/DateTime'

//! Change this reference for local storage
const loggedInUser = 1

//Handles edit button on Article CArd

class ArticleEditForm extends Component {
    //set the initial state
    state = {
        articleTitle: "",
        synopsis: "",
        url: "",
        loadingStatus: true,
    };

    //Handles changing state for text fields receiving input

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //Creates object for edited article info to updated on databse

    updateExistingArticle = evt => {
        evt.preventDefault()
        this.setState({ loadingStatus: true });
        const editedArticle = {
            id: this.props.match.params.articleId,
            userId: loggedInUser,
            title: this.state.articleTitle,
            synopsis: this.state.synopsis,
            url: this.state.url,
            timestamp: createDateTimeToISO()
        };

        ApiManager.update("articles", editedArticle)
            .then(() => this.props.history.push("/"))
    }

    //Populates DOM with article to be edited

    componentDidMount() {
        ApiManager.get("articles", this.props.match.params.articleId)
            .then(article => {
                this.setState({
                    articleTitle: article.title,
                    synopsis: article.synopsis,
                    url: article.url,
                    loadingStatus: false,
                });
            });
    }

    render() {
        return (
            <>
                <form className="card-body">
                    <fieldset>
                        <div className="formgrid">
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="articleTitle"
                                value={this.state.articleTitle}
                            />
                            <label htmlFor="animalName">Title</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="synopsis"
                                value={this.state.synopsis}
                            />
                            <label htmlFor="breed">Synopsis</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="url"
                                value={this.state.url}
                            />
                            <label htmlFor="breed">Link</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button" disabled={this.state.loadingStatus}
                                onClick={this.updateExistingArticle}
                                className="btn btn-primary"
                            >Save Edit</button>
                            <button 
                            type="button" 
                            className="btn btn-danger" 
                            onClick={() => this.props.history.push("/")}
                            >Cancel</button>
                        </div>
                    </fieldset>
                </form>
            </>
        );
    }
}

export default ArticleEditForm