import { gql, useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { GET_USERS } from "../App";
import { client } from "../lib/apollo";

export const CREATE_USER = gql`
  mutation ($name: String!) {
    createUser(name: $name) {
      id
      name
    }
  }
`;

export function UserForm() {
  const [name, setName] = useState<string>();
  const [createUser, { data }] = useMutation(CREATE_USER);
  async function handleCreateUser(ev: FormEvent) {
    ev.preventDefault();

    if (!name) return;

    await createUser({
      variables: { name },
      //   refetchQueries: [GET_USERS],
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: { users: [...users, createUser] },
        });
      },
    });

    alert(`Usuário ${data?.createUser.name} criado!`);
  }
  return (
    <form onSubmit={handleCreateUser}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <button type="submit">Enviar</button>
    </form>
  );
}
