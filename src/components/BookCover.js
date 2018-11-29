import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCoverLink } from '../utils';
import { setCurrentBook } from '../actions'
import placeholderCover from '../assets/bookCoverPlaceholder.jpg';
import PropTypes from 'prop-types';

/**
 * Results elements displayed by book cover and title.
 */
class BookCover extends Component {

  static propTypes = {
    /** the currently displayed books */
    book: PropTypes.object.isRequired,
    /** set the selected book for the side bar */
    setCurrentBook: PropTypes.func.isRequired
  }

  state = {
    image: null
  }

  /** attempt to get cover image of each book */
  componentDidMount() {
    let image = getCoverLink(this.props.book);
    if (!image) {
      image = placeholderCover;
    }
    this.setState({ image });
  }
  
  /** default to placeholder image if cover image 404s */
  handleError = (event) => {
    this.setState({ image: placeholderCover });
  }

  /** select a book to see more information on it */
  handleClick = (event) => {
    this.props.setCurrentBook({ 
      image: this.state.image, 
      ...this.props.book
    });
  }

  render() {
    return (
      <div className="book cover" onClick={this.handleClick}>
        <img src={this.state.image} alt={this.props.book.title} onError={this.handleError} />
        <h4>{this.props.book.title} ({this.props.book.first_publish_year})</h4>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentBook: currentBook => dispatch(setCurrentBook(currentBook))
  }
}

export default connect(null, mapDispatchToProps)(BookCover);