import {
  SET_CURRENT_BOOK,
  CLEAR_SEARCH,
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../constants/action-types';
import reducer from '../reducers'

describe('root reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(
      {
        books: [],
        currentBook: null,
        page: 1,
        numFound: 0,
        loading: false,
        error: null
      }
    )
  })

  it('should handle SET_CURRENT_BOOK', () => {
    expect(
      reducer({}, {
        type: SET_CURRENT_BOOK,
        payload: {currentBook: {title: "test"}}
      })
    ).toEqual(
      {currentBook: {title: "test"}}
    )
  })

  it('should handle CLEAR_SEARCH', () => {
    expect(
      reducer({}, {
        type: CLEAR_SEARCH,
      })
    ).toEqual({
      books: [],
      currentBook: null,
      page: 1,
      numFound: 0,
      loading: false,
      error: null
    })
  })

  it('should handle FETCH_BOOKS_BEGIN', () => {
    expect(
      reducer({}, {
        type: FETCH_BOOKS_BEGIN,
        payload: {currentBook: {title: "test"}}
      })
    ).toEqual({
      loading: true,
      error: null
    })
  })

  it('should handle FETCH_BOOKS_SUCCESS', () => {
    expect(
      reducer({}, {
        type: FETCH_BOOKS_SUCCESS,
        payload: {
          books: [],
          numFound: 0,
          page: 1,
        }
      })
    ).toEqual({
      books: [],
      numFound: 0,
      page: 1,
      loading: false,
      error: null
    })
  })

  it('should handle FETCH_BOOKS_FAILURE', () => {
    expect(
      reducer({}, {
        type: FETCH_BOOKS_FAILURE,
        payload: {
          error: "Error!"
        }
      })
    ).toEqual({
      numFound: 0,
      page: 1,
      loading: false,
      error: "Error!"
    })
  })
})