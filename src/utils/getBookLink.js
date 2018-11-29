export default (book) => {
  let key = null;
  let value = null;
  if (book.olid) {
    key = 'olid';
    value = book.olid[0]
  } else if (book.lccn) {
    key = 'lccn';
    value = book.lccn[0]
  } else if (book.oclc) {
    key = 'oclc';
    value = book.oclc[0]
  } else if (book.isbn) {
    key = 'isbn';
    value = book.isbn[0]
  }
  return `https://openlibrary.org/${key}/${value}`;
  }
     