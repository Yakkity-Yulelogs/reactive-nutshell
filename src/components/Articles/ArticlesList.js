import React, { Component } from 'react'
import ArticlesCard from './ArticlesCard'
import ApiManager from '../../modules/ApiManager'

class ArticlesList extends Component {
  
  state = {
    articles: [],
  }

  componentDidMount() {
    ApiManager.getAll("articles", "userId=1")
      .then((articlesArray) => {
        this.setState({
          articles: articlesArray
        })
      })
  }

  deleteArticle = id => {
    ApiManager.delete("articles", id)
      .then(() => {
        ApiManager.getAll("articles")
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
            className="btn btn-primary"
            onClick={() => { this.props.history.push("/articles/new") }}>
            New Article
          </button>
        </section>
        <div className="container-cards">
          {this.state.articles.map(article =>
            <ArticlesCard
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