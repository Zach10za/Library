import React, { Component } from 'react';
import { connect } from "react-redux";
import { getCoverLink, getBookLink } from '../utils';
import placeholderCover from '../assets/bookCoverPlaceholder.jpg';
import PropTypes from 'prop-types';

/**
 * Sidebar to show more information about a selected book
 */
class BookInfoBar extends Component { 

  static propTypes = {
    /** should the sidebar be hidden */
    hide: PropTypes.bool.isRequired,
    /** book geographic setting */
    place: PropTypes.array,
    /** book time setting */
    time: PropTypes.array,
    /** all authors */
    author_name: PropTypes.array,
    /** all years this book was published */
    publish_year: PropTypes.array,
    /** all places this book was published */
    publish_place: PropTypes.array,
    /** all companies that published this book */
    publisher: PropTypes.array,
    /** key subjects relating to this book */
    subject: PropTypes.array,
  }
  
  state = {
    image: null
  }

  /** attempt to get cover image of each book */
  componentDidMount() {
    let image = getCoverLink(this.props, 'L');
    if (!image) {
      image = placeholderCover;
    }
    this.setState({ image });
  }

  /** default to placeholder image if cover image 404s */
  handleError = (event) => {
    this.setState({ image: placeholderCover });
  }

  render() {
    return (
      <aside className={this.props.hide ? "book-info-bar hide" : "book-info-bar"}>
        <img src={this.state.image} alt={this.props.title} />
        <h1 className="title">{this.props.title} ({this.props.first_publish_year})</h1>
        {this.props.place ? <div className="place"><b>Where:</b> {this.props.place.join(', ')}</div> : null}
        {this.props.time ? <div className="time"><b>When:</b> {this.props.time.join(', ')}</div> : null}
        {this.props.author_name ? <div className="authors"><b>{this.props.author_name.length > 1 ? "Authors" : "Author"}:</b> {this.props.author_name.join(', ')}</div> : null}
        {this.props.publish_year ? <div className="published-year"><b>Publishing {this.props.publish_year.length > 1 ? "Years" : "Year"}:</b> {this.props.publish_year.join(', ')}</div> : null}
        {this.props.publish_place ? <div className="published-place"><b>Publishing {this.props.publish_place.length > 1 ? "Locations" : "Location"}:</b> {this.props.publish_place.join(', ')}</div> : null}
        {this.props.publisher ? <div className="publisher"><b>Publishing {this.props.publisher.length > 1 ? "Companies" : "Company"}:</b> {this.props.publisher.join(', ')}</div> : null}
        {this.props.subject ? <div className="subject"><b>{this.props.subject.length > 1 ? "Subjects" : "Subject"}:</b> {this.props.subject.join(', ')}</div> : null}
        <div><a href={getBookLink(this.props)} target="_blank">More information</a></div>
      </aside>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.currentBook
  }
}
export default connect(mapStateToProps)(BookInfoBar);