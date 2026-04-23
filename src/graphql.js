import { gql } from "@apollo/client";

// GET USERS
export const GET_USERS = gql`
  query {
    allUsers {
      id
      name
      email
    }
  }
`;

// CREATE USER
export const ADD_USER = gql`
  mutation ($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// UPDATE USER
export const UPDATE_USER = gql`
  mutation ($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      id
      name
      email
    }
  }
`;

// DELETE USER
export const DELETE_USER = gql`
  mutation ($id: ID!) {
    removeUser(id: $id) {
      id
    }
  }
`;
