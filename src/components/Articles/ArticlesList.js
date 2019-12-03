import React, { Component } from 'react'
import ArticlesCard from './ArticlesCard'
import APIManager from '../../modules/APIManager'

class ArticlesList extends Component {
  
  state = {
    articles: [],
  }

  componentDidMount() {
    APIManager.getAll("articles")
      .then((articlesArray) => {
        this.setState({
          articles: articlesArray
        })
      })
  }

  deleteArticle = id => {
    APIManager.delete("articles", id)
      .then(() => {
        APIManager.getAll("articles")
          .then((updatedArticles) => {
            this.setState({
              articles: updatedArticles
            })
          })
      })
  }

  render() {

    return (
      <>
        <section className="section-content">
          <button type="button"
            className="btn"
            onClick={() => { this.props.history.push("/articles/new") }}>
            New Articles
          </button>
        </section>
        <div className="container-cards">
          {this.state.articles.map(article =>
            <ArticleCard
              key={article.id}
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