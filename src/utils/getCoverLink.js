export default (book, size = 'M') => {
  if ('cover_i' in book && book.cover_i !== -1) {
    return `https://covers.openlibrary.org/b/id/${book.cover_i}-${size}.jpg?default=false`
  }
  return false;
}