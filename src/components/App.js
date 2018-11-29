import React, { Component } from 'react';
import SearchBar from './SearchBar';
import BookList from './BookList';
import BookInfoBar from './BookInfoBar';

class App extends Component {
  state = {
    hideBookInfoBar: true,
  }

  handleClick = (event) => {
    if (event.target.parentNode.classList.contains('book') || event.target.classList.contains('book')) {
      if (this.state.hideBookInfoBar) {
        this.setState({ hideBookInfoBar: false });
      }
    } else if (!this.state.hideBookInfoBar) {
      this.setState({ hideBookInfoBar: true });
    }
  }

  render() {
    return (
      <div className="app" onClick={this.handleClick}>
        <h1 className="page-title">Search a book:</h1>
        <SearchBar />
        <BookList />
        <BookInfoBar hide={this.state.hideBookInfoBar} />
      </div>
    )
  }
}

export default App;