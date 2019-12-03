import React, { Component } from 'react'
import ApiManager from '../../modules/ApiManager'
import { createDateTimeToISO } from '../../modules/DateTime'

class ArticlesNewForm extends Component {
    state = {
        articleTitle: "",
        synopsis: "",
        url: ""
    }


    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewArticle = evt => {
        evt.preventDefault()
        if (this.state.articleTitle === "" || this.state.synopsis === "" || this.state.url === "") {
            window.alert("Please input article title, synopsis and page link")
        } else {
            this.setState({ loadingStatus: true })
            const article = {
                //! change this to reference local storage
                userId: 1,
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
                                onChange={this.handleFieldChange}
                                id="articleTitle"
                                placeholder="Title Here"
                            />
                            <label htmlFor="articleTitle">Article Title</label>
                            <input type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="synopsis"
                                placeholder="Synopsis Here"
                            />
                            <label htmlFor="breed">Synopsis</label>
                            <input type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="url"
                                placeholder="Link Here"
                            />
                            <label htmlFor="breed">Article Link</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewArticle}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )

    }
}
export default ArticlesNewForm