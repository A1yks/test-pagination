import { TUserItem } from "@/types/users";
import Table from "react-bootstrap/Table";

export type UsersTableProps = {
  users: TUserItem[];
};

function UsersTable({ users }: UsersTableProps) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Имя</th>
          <th>Фамилия</th>
          <th>Телефон</th>
          <th>Email</th>
          <th>Дата обновления</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.phone}</td>
            <td>{user.email}</td>
            <td>{user.updatedAt}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default UsersTable;
