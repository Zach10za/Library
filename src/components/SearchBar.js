import React, { Component } from 'react';
import { connect } from "react-redux";
import { clearSearch, fetchBooks } from '../actions';
import PropTypes from 'prop-types';

/**
 * Searchbar for finding books based on text searches
 */
class SearchBar extends Component {

  static propTypes = {
    /** current page of results */
    page: PropTypes.number.isRequired,
    /** number of results found */
    numFound: PropTypes.number.isRequired,
    /** fetch books from the openlibrary api given a search term and a page */
    fetchBooks: PropTypes.func.isRequired,
    /** reset the search */
    clearSearch: PropTypes.func.isRequired
  }

  state = {
    searchTerm: ""
  }

  /** increment or decrement the pages of results */
  prevPage = () => { this.props.fetchBooks(this.state.searchTerm, this.props.page - 1) }
  nextPage = () => { this.props.fetchBooks(this.state.searchTerm, this.props.page + 1) }
  
  /** if the search term is not empty then fetch the api else reset the search */
  handleChange = (event) => {
    this.setState({ searchTerm: event.target.value }, () => {
      this.state.searchTerm.trim()
      ? this.props.fetchBooks(this.state.searchTerm, this.props.page)
      : this.props.clearSearch();
    });
  }

  render() {
    return (
      <div className="search-bar">
        <input
          type="search"
          id="search"
          placeholder="Harry Potter, Lord of the Rings, Moby Dick..."
          onChange={this.handleChange}
          value={this.state.searchTerm} />
        <div className="page-controls">
          <button onClick={this.prevPage} className="prev" disabled={this.props.page === 1}>{"<"}</button>
          <h2 className="page-number">{this.props.numFound < 1 ? 0 : `${this.props.page} / ${Math.ceil(this.props.numFound / 100)}`}</h2>
          <button onClick={this.nextPage} className="next" disabled={Math.ceil(this.props.numFound / 100) <= this.props.page}>{">"}</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    clearSearch: () => dispatch(clearSearch()),
    fetchBooks: (searchTerm, page) => dispatch(fetchBooks(searchTerm, page)),
  }
}

const mapStateToProps = state => {
  return {
    page: state.page,
    numFound: state.numFound,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);