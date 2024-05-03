import apiFecth from "../axios/apiAxios";
import { gql } from '@apollo/client';

export const ALL_USER = gql`
query {
  users {
    id
    email
    username
    password
    img
    description
    admin
  }
}
`;

export const ONE_USER = gql`
query user($id: Int!) {
  user(id: $id) {
    id
    email
    username
    password
    description
  }
}

`

export const INSERT_USER = gql`
mutation InsertUser($data: CreateUsersInput!) {
  createUser(data: $data) {
    id
    email
    username
    description
    password
    admin
    img 
  }
}
`;
export const LOGIN_MUTATION = gql`
mutation Login($username: String!, $password: String!) {
    login(input: { username: $username, password: $password }) {
      accessToken
      user {
        id
        email
        username
        img
        description
        admin
      }
    }
  }
  
  
`;

export const UPDATE_USER = gql`
  mutation($id: Int!, $updateUserInput: CreateUsersInput!) {
    updateUser(
      id: $id,
      updateUserInput: $updateUserInput
    ) {
      id
      email
      username
      description
      password
      img
    }
  }
`;


