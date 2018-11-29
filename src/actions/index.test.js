import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import * as actions from '../actions';
import {
  SET_CURRENT_BOOK,
  CLEAR_SEARCH,
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../constants/action-types';

describe('actions', () => {
  it('should create an action to set the current book', () => {
    const currentBook = { title: 'test book' };
    const expectedAction = {
      type: SET_CURRENT_BOOK,
      payload: {currentBook}
    };
    expect(actions.setCurrentBook(currentBook)).toEqual(expectedAction)
  })
  it('should create an action to clear the search', () => {
    const expectedAction = {
      type: CLEAR_SEARCH
    };
    expect(actions.clearSearch()).toEqual(expectedAction)
  })
  it('should create an action to fetch books begin', () => {
    const expectedAction = {
      type: FETCH_BOOKS_BEGIN
    };
    expect(actions.fetchBooksBegin()).toEqual(expectedAction)
  })
  it('should create an action to fetch books failure', () => {
    const error = "ERROR!";
    const expectedAction = {
      type: FETCH_BOOKS_FAILURE,
      payload: {error}
    };
    expect(actions.fetchBooksFailure(error)).toEqual(expectedAction)
  })
  it('should create an action to fetch books success', () => {
    const books = [];
    const numFound = 0;
    const page = 1;
    const expectedAction = {
      type: FETCH_BOOKS_SUCCESS,
      payload: {books, numFound, page}
    };
    expect(actions.fetchBooksSuccess(books, numFound, page)).toEqual(expectedAction)
  })
})

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async actions', () => {
  afterEach(() => { fetchMock.restore() });

  it('creates FETCH_BOOKS_SUCCESS when fetching books has been done', () => {
    const books = [];
    const numFound = 0;
    const searchTerm = "A book";
    const page = 1;
    fetchMock.getOnce('http://openlibrary.org/search.json?title=A+book&page=1', { docs: [], numFound });
    const expectedActions = [
      { type: FETCH_BOOKS_BEGIN },
      { type: FETCH_BOOKS_SUCCESS, payload: {books, numFound, page} }
    ]
    const store = mockStore({ books, page, numFound })

    return store.dispatch(actions.fetchBooks(searchTerm, page)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})