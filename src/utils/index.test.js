import { getBookLink, getCoverLink } from '../utils';

describe('getBookLink', () => {
  it('should create a link to the openlibrary book given a book object', () => {
    const book = { olid: ["test"] };
    const expectedLink = 'https://openlibrary.org/olid/test';
    expect(getBookLink(book)).toEqual(expectedLink);
  })
})

describe('getCoverLink', () => {
  it('should create a link to the book cover given a book object', () => {
    const book = { cover_i: "test" };
    const size = "M";
    const expectedLink = 'https://covers.openlibrary.org/b/id/test-M.jpg?default=false';
    expect(getCoverLink(book,size)).toEqual(expectedLink);
  })
  it('should return false if no link can be created', () => {
    const book = {};
    const size = "M";
    expect(getCoverLink(book,size)).toEqual(false);
  })
})