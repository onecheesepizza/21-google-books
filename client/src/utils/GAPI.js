import axios from "axios";

export default {
  // Gets all books
  searchBooks: function(query) {
    return axios.get("https://www.googleapis.com/books/v1/volumes?q="+query);
  }
};
