import { gql } from "@apollo/client";

// Query para obter os usuários
export const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

// Mutation para criar um novo usuário
export const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

// Mutation para atualizar um usuário existente
export const UPDATE_USER = gql`
  mutation ($id: ID!, $name: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

// Mutation para excluir um usuário
export const DELETE_USER = gql`
  mutation ($id: ID!) {
    deleteUser(id: $id)
  }
`;
