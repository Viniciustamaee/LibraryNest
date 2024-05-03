import apiFecth from "../axios/apiAxios";
import { gql } from '@apollo/client';

export const ALL_BOOKS_QUERY = gql`
query {
    books {
      id
      title
      quantity_available
      img
      description
      category {
        id
        category_name
      }
      author {
        id
        name
      }
    }
  }
`;

export const ONE_BOOK_QUERY = gql`
query OneBook($id: Float!) {
    book(id: $id) {
      id
      title
      quantity_available
      img
      description
      category {
        id
        category_name
      }
      author {
        id
        name
      }
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation UpdateBook($input: inputBook!, $id: String!) {
    updateBook(input: $input, id: $id) {
      id
      title
      quantity_available
      description
      img
      category {
        id
      }
      author {
        id
      }
    }
  }
`;



export const INSERT_BOOK = gql`
mutation createBook($data: inputBook!) {
  createBook(data: $data) {
    id
    title
    quantity_available
    description
    img
    category {
      id
    }
    author {
      id
    }
  }
}
`;

export const delete_book = gql`
mutation($id: String!) {
  removeBook(id: $id) {
    id
  }
}

`


