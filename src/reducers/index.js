import { 
  SET_CURRENT_BOOK,
  CLEAR_SEARCH,
  FETCH_BOOKS_BEGIN,
  FETCH_BOOKS_SUCCESS,
  FETCH_BOOKS_FAILURE
} from '../constants/action-types';

const initialState = {
  books: [],
  currentBook: null,
  page: 1,
  numFound: 0,
  loading: false,
  error: null
};

const rootReducer = (state = initialState, action) => {
  switch(action.type) {
    case SET_CURRENT_BOOK:
      return {
        ...state,
        currentBook: action.payload.currentBook
      }
    case CLEAR_SEARCH:
      return {
        ...state,
        books: [],
        currentBook: null,
        page: 1,
        numFound: 0,
        loading: false,
        error: null
      }
    case FETCH_BOOKS_BEGIN:
      return {
        ...state,
        loading: true,
        error: null
      }
    case FETCH_BOOKS_SUCCESS:
      return {
        ...state,
        books: action.payload.books,
        numFound: action.payload.numFound,
        page: action.payload.page,
        loading: false,
        error: null
      }
    case FETCH_BOOKS_FAILURE:
      return {
        ...state,
        numFound: 0,
        page: 1,
        loading: false,
        error: action.payload.error
      }
    default:
      return state;
  }
};

export default rootReducer;