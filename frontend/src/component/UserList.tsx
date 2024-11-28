import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_USERS, DELETE_USER } from "../graphql/users";
import { UserForm } from "./UserForm";
import { User } from "../models/User";

export function UserList() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  if (loading) return <p>Carregando...</p>;

  async function handleDeleteUser(id: string) {
    if (!confirm("Tem certeza que deseja excluir este usuário?")) return;

    await deleteUser({
      variables: { id },
      update: (cache) => {
        const { users } = cache.readQuery<{ users: User[] }>({
          query: GET_USERS,
        }) || { users: [] };

        const updatedUsers = users.filter((user: User) => user.id !== id);
        cache.writeQuery({
          query: GET_USERS,
          data: { users: updatedUsers },
        });
      },
    });

    alert("Usuário excluído!");
  }

  return (
    <>
      <h1>Lista de Usuários</h1>
      <ul>
        {data?.users.map((user: User) => (
          <li key={user.id}>
            {user.name}{" "}
            <button onClick={() => setEditingUser(user)}>Editar</button>
            <button onClick={() => handleDeleteUser(user.id)}>Excluir</button>
          </li>
        ))}
      </ul>

      <h2>{editingUser ? "Editar Usuário" : "Criar Novo Usuário"}</h2>
      <UserForm
        userToEdit={editingUser}
        onComplete={() => setEditingUser(null)} // Limpa o estado após editar/criar
      />
    </>
  );
}
