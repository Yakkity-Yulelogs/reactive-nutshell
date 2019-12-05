//Author: Trey Suiter

import React, { Component } from 'react';
import { convertDateTimeFromISO } from '../../modules/DateTime'

class ArticleCard extends Component {

    //Renders article card with title, user name who submitted, synopsis, link, and edit and delete button for logged in user cards

    render() {


        return (
            <div className={`card ${this.props.article.userId !== this.props.loggedInUser ? "friend-article" : null}`}>
                <div className="card-content">
                    <h2>Title: <span className="card-articleName">{this.props.article.title}</span></h2>
                    <p>Submitted by: {this.props.userName}</p>
                    <p>Synopsis: <span>{this.props.article.synopsis}</span></p>
                    <p>Link: <a href={this.props.article.url} target="_blank" rel="noopener noreferrer">{this.props.article.url}</a></p>
                    <p>Time: <span>{convertDateTimeFromISO(this.props.article.timestamp).toLocaleString()}</span></p>
                    {this.props.loggedInUser === this.props.article.userId ? <>
                    <button type="button" className="btn btn-danger" onClick={() => this.props.deleteArticle(this.props.article.id)}>Delete Article</button>
                    <button type="button" className="btn btn-warning"
                        onClick={() => { this.props.history.push(`/articles/${this.props.article.id}/edit`) }}>Edit Article</button>
                        </> : null }
                </div>
            </div>
        );
    }
}

export default ArticleCard;