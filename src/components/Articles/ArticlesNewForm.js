import React, { Component } from 'react'
import APIManager from '../../modules/APIManager'

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
                userId: 1,
                title: this.state.articleTitle,
                synopsis: this.state.synopsis,
                url: this.state.url,
                timestamp: 
            }
            APIManager.post("animals", animal)
                .then(() => this.props.history.push("/animals"))
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
                                id="animalName"
                                placeholder="Robot Name"
                            />
                            <label htmlFor="animalName">Name</label>
                            <input type="text"
                                required
                                onChange={this.handleFieldChange}
                                id="breed"
                                placeholder="Model"
                            />
                            <label htmlFor="breed">Model</label>
                        </div>
                        <div className="alignRight">
                            <button
                                type="button"
                                disabled={this.state.loadingStatus}
                                onClick={this.constructNewAnimal}
                            >Submit</button>
                        </div>
                    </fieldset>
                </form>
            </>
        )

    }
}
export default ArticlesNewForm