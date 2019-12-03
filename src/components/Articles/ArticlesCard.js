import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { convertDateTimeFromISO } from '../../modules/DateTime'

class ArticleCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="card-content">
                    <h2>Title: <span className="card-articleName">{this.props.article.title}</span></h2>
                    <p>Synopsis: <span>{this.props.article.synopsis}</span></p>
                    <p>Link: <span>{this.props.article.url}</span></p>
                    <p>Time: <span>{convertDateTimeFromISO(this.props.article.timestamp).toLocaleString()}</span></p>
                    <button type="button" onClick={() => this.props.deleteArticle(this.props.article.id)}>Delete Article</button>
                    <button type="button"
                        onClick={() => { this.props.history.push(`/articles/${this.props.article.id}/edit`) }}>Edit</button>
                </div>
            </div>
        );
    }
}

export default ArticleCard;