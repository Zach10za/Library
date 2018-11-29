import {
  SET_CURRENT_BOOK,
  CLEAR_SEARCH,
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../constants/action-types';


export const setCurrentBook = currentBook => ({
  type: SET_CURRENT_BOOK,
  payload: {currentBook}
});

export const clearSearch = () => ({
  type: CLEAR_SEARCH,
});

export const fetchBooksBegin = () => ({
  type: FETCH_BOOKS_BEGIN,
});

export const fetchBooksSuccess = (books, numFound, page) => ({
  type: FETCH_BOOKS_SUCCESS,
  payload: {books, numFound, page}
});

export const fetchBooksFailure = error => ({
  type: FETCH_BOOKS_FAILURE,
  payload: {error}
});

export const fetchBooks = (searchTerm, page) => {
  return async dispatch => {
    try {
      dispatch(fetchBooksBegin());
      const response = await fetch(`https://openlibrary.org/search.json?title=${searchTerm.split(' ').join('+')}&page=${page}`);
      if (!response.ok) {
        throw Error(response.statusText);
      }
      const json = await response.json();
      dispatch(fetchBooksSuccess(json.docs, json.numFound, page));
    } catch (error) {
      dispatch(fetchBooksFailure(error));
    }
  }
}