import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

/**
 * Bottom right element to display the current page and number of results.
 */
const BookCount = (props) => {
  return (
    <div className="book-count">{props.numFound > 0 ? `page ${props.page} / ${Math.ceil(props.numFound / 100)} ` : ''}{`(${props.numFound} results)`}</div>
  )
}

const mapStateToProps = state => {
  return {
    page: state.page,
    numFound: state.numFound,
  }
}

BookCount.propTypes = {
  /** current page number */
  page: PropTypes.number.isRequired,
  /** number of results found from search */
  numFound: PropTypes.number.isRequired
}

export default connect(mapStateToProps)(BookCount);