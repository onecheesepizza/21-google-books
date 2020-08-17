import React, { useState, useEffect } from "react";
import API from "../utils/API";
import GAPI from "../utils/GAPI";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

function Search() {
  // Setting our component's initial state
  const [books, setBooks] = useState([])
  const [formObject, setFormObject] = useState({})

  // search for books on Google Books API
  useEffect(() => {
    searchBooks()
  }, [])

  // search for books on Google Books API
  function searchBooks() {
    GAPI.searchBooks()
      .then(res => 
        setBooks(res.data)
      )
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormObject({...formObject, [name]: value})
  };

  // When the form is submitted, use the GAPI.searchBooks method to get book results
  // Then sets books state
  function handleFormSubmit(event) {
    event.preventDefault();
    //query Google Books API with GAPI util
    GAPI.searchBooks(formObject.search)
      .then(res => {
        console.log(res.data.items);
        //set Books state to API results
        setBooks(res.data.items);
      }
        );
  };

  function handleBookSave(bookID){
    //build newBook object
    const newBook = {
      title: books[bookID].volumeInfo.title ? books[bookID].volumeInfo.title : "",
      authors: books[bookID].volumeInfo.authors ? books[bookID].volumeInfo.authors.join(", ") : "",
      description: books[bookID].volumeInfo.description ? books[bookID].volumeInfo.description : "",
      image: books[bookID].volumeInfo.imageLinks ? books[bookID].volumeInfo.imageLinks.thumbnail : "",
      link: books[bookID].volumeInfo.infoLink ? books[bookID].volumeInfo.infoLink : ""
    }
    console.log(newBook);
    //post newBook to API
    API.saveBook(newBook)
    .then(alert("Book Saved!"));
  }

    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <form>
              <Input
                onChange={handleInputChange}
                name="search"
                placeholder="Search Book (required)"
              />
              <FormBtn onClick={handleFormSubmit} >
                Submit Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            {books.length ? (
              <List>
                {books.map((book, index) => (
                  <ListItem key={index}>
                      <strong>
                        {book.volumeInfo.title && book.volumeInfo.title} by {book.volumeInfo.authors && book.volumeInfo.authors.join(", ")}
                      </strong>
                      <FormBtn onClick={() => handleBookSave(index)}>Save Book</FormBtn>
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }


export default Search;
