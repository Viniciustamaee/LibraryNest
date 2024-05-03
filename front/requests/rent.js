import { gql } from "@apollo/client";
import apiFecth from "../axios/apiAxios";

export const ALL_RENTS = gql`
query {
    rents {
      id
      rented_date
      due_date
      user {
        id
      }
      book {
        id
      }
    }
  }
`;


export const DELETE_RENT = gql`
mutation($id: String!) {
  deleteRent(id: $id){
	id
  }
}

`

export const ONE_RENT = gql`
  query GetRent($id: String!) {
    rent(id: $id) {
      id
      rented_date
      due_date
      user {
        id
      }
      book {
        id
      }
    }
  }
`;

export const INSERT_RENT = gql`
mutation createRent($input: InputtRents!) {
  createRent(input: $input) {
    id
    due_date
    rented_date
    book {
      id
    }
    user {
      id
    }
  }
}


`

export const UPDATE_RENTS = gql`
mutation UpdateRent($id: String!, $input: InputtRents!) {
  updateRent(id: $id, input: $input) {
    due_date
  }
}
`

export const ONE_RENT_DATA = gql`
  query($id: String!) {
    rentOne(id: $id) {
      id
      rented_date
      due_date
      user {
        id
        username
      }
      book {
        id
        title
      }
    }
  }
`;



