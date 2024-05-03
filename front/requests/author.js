import { gql } from '@apollo/client';

export const ALL_AUTHORS_QUERY = gql`
query {
    author {
      id
      name
    }
  }
  
`;

export const DELETE_AUTHOR_MUTATION = gql`
   mutation removeAuthor($id: Int!) {
    removeAuthor(id: $id) {
       id
     }
   }
 `;


export const ONE_AUTHOR_QUERY = gql`
query GetAuthor($id: Int!) {
    authorOne(id: $id) {
      id
      name
    }
  }
  
`;


export const UPDATE_AUTHOR_MUTATION = gql`
mutation UpdateAuthor($id: Int!, $updateAuthorInput: createAuthorInputs!) {
    updateAuthor(id: $id, updateAuthorInput: $updateAuthorInput) {
      id
      name
    }
  }
`;


export const INSERT_AUTHOR_MUTATION = gql`
mutation CreateAuthor($authorInput: createAuthorInputs!) {
    createAuthor(createAuthorInput: $authorInput) {
      id
      name
    }
  }
`;




















// 




