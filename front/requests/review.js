import { gql } from "@apollo/client";

export const INSER_REVIEW = gql`
mutation($data: InputReview!) {
  createReview(data: $data) {
    id
    rating
    comment
    user {
      id
    }
    book {
      id
    }
  }
}
`;

export const All_Review = gql`
query($id: String!) {
  reviewsByBookId(id: $id) {
    id
    rating
    comment
    user {
      id
      username
      email 
      img
      description
      admin
    }
    book {
      id
      title
      img
      quantity_available 
      description
    }
  }
}

`;

export const DELETE_REVIEW = gql`
mutation($id: String!) {
  deleteReview(id: $id) {
    id
  }
}

`