import React, { Component } from 'react'
//Author: Trey Suiter

import ApiManager from '../../modules/ApiManager'
import { createDateTimeToISO } from '../../modules/DateTime'

//Handles form that populates when New Article button is pressed on main Articles page


//! Change this reference for local storage
const loggedInUser = 1


class ArticlesNewForm extends Component {

    state = {
        articleTitle: "",
        synopsis: "",
        url: ""
    }

    //Handles changing state for text fields receiving input

    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //Creates New Article Object to be posted to database (if fields are filled) then sends user to main Articles page

    constructNewArticle = evt => {
        evt.preventDefault()
        if (this.state.articleTitle === "" || this.state.synopsis === "" || this.state.url === "") {
            window.alert("Please input article title, synopsis and page link")
        } else {
            this.setState({ loadingStatus: true })
            const article = {
                userId: loggedInUser,
                title: this.state.articleTitle,
                synopsis: this.state.synopsis,
                url: this.state.url,
                timestamp: createDateTimeToISO()
            }
            ApiManager.post("articles", article)
                .then(() => this.props.history.push("/"))
        }
    }

    render() {
        return (
            <>
                <form>
                    <fieldset>
                        <div className="formgrid">
                            <input type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="articleTitle"
                                placeholder="Title Here"
                            />
                            <label htmlFor="articleTitle">Title</label>
                            <input type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="synopsis"
                                placeholder="Synopsis Here"
                            />
                            <label htmlFor="breed">Synopsis</label>
                            <input type="text"
                                required
                                className="form-control"
                                onChange={this.handleFieldChange}
                                id="url"
                                placeholder="Link Here"
                            />
                            <label htmlFor="breed">Link</label>
                        </div>
                        <div className="alignRight">
                            <button
                                className="btn btn-primary"
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewArticle}
                            >Save Article</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )

    }
}
export default ArticlesNewForm