import { gql, useQuery } from "@apollo/client";
import { User } from "./models/User";
import { UserForm } from "./component/UserForm";

export const GET_USERS = gql`
  query {
    users {
      id
      name
    }
  }
`;

function App() {
  const { data, loading } = useQuery<{ users: User[] }>(GET_USERS);

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <ul>
        {data?.users.map((user: User) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      <UserForm />
    </>
  );
}

export default App;
