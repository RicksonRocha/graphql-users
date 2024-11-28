import { useMutation } from "@apollo/client";
import { FormEvent, useState } from "react";
import { CREATE_USER, UPDATE_USER, GET_USERS } from "../graphql/users";
import { client } from "../lib/apollo";
import { User } from "../models/User";

interface UserFormProps {
  userToEdit?: User | null; // Para edição de usuários
  onComplete?: () => void; // Callback após a conclusão
}

export function UserForm({ userToEdit, onComplete }: Readonly<UserFormProps>) {
  const [name, setName] = useState<string>(userToEdit?.name ?? "");
  const [createUser] = useMutation(CREATE_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  async function update(userToEdit: User) {
    await updateUser({
      variables: { id: userToEdit.id, name },
      update: (cache, { data: { updateUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS });
        const updatedUsers = users.map((user: User) =>
          user.id === updateUser.id ? updateUser : user
        );
        cache.writeQuery({
          query: GET_USERS,
          data: { users: updatedUsers },
        });
      },
    });
  }

  async function create() {
    await createUser({
      variables: { name },
      update: (cache, { data: { createUser } }) => {
        const { users } = client.readQuery({ query: GET_USERS });
        cache.writeQuery({
          query: GET_USERS,
          data: { users: [...users, createUser] },
        });
      },
    });
  }

  async function handleSubmit(ev: FormEvent) {
    ev.preventDefault();

    if (!name) return;

    if (userToEdit) {
      update(userToEdit);
    } else {
      create();
    }

    alert(`Usuário ${userToEdit ? "atualizado" : "criado"} com sucesso!`);
    setName("");
    if (onComplete) onComplete();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nome do usuário"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <button type="submit">{userToEdit ? "Atualizar" : "Criar"}</button>
    </form>
  );
}
