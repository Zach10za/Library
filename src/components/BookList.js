import React from 'react';
import { connect } from 'react-redux'
import BookCover from './BookCover';
import loading from '../assets/loading.svg';
import PropTypes from 'prop-types';

/**
 * The container showing all results
 */
const BookList = (props) => {
  
  /** either display the books, loading screen, error message, or "0 results found" */
  return (
    <div className="book-list">
      <div className="wrapper">
        {props.loading
          ? <img className="loading" src={loading} />
          : props.books.length > 0
          ? props.books.map(book => <BookCover key={book.key} book={book}/>)
          : props.error
          ? <h1 className="no-results">Error fetching books</h1>
          : <h1 className="no-results">0 books found</h1> }
      </div>
    </div>
  )
}


const mapStateToProps = state => {
  return {
    books: state.books,
    loading: state.loading,
    error: state.error,
  }
}

BookList.propTypes = {
  /** the currently displayed books */
  books: PropTypes.array.isRequired,
  /** status of page if it is awaiting the results of an api fetch */
  loading: PropTypes.bool.isRequired,
  /** error message if api fetch failed */
  error: PropTypes.string
}

export default connect(mapStateToProps)(BookList);