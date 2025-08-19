"use client";

import { GetCookie } from "@/app/(erp)/core/actions/getCookie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { useState, useEffect } from "react";

type User = {
  name: string;
  email: string;
  role: string;
  createAt: string;
};

export default function ListUsers() {
  const [users, setUsers] = useState<User[]>([]);

  console.log(users);

  useEffect(() => {
    async function fetchUsers() {
      const token = await GetCookie();

      const res = await fetch("http://localhost:3001/users", {
        method: "GET",
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUsers(data.users);
    }

    fetchUsers();
  }, []);

  console.log(users);

  return (
    <Table>
      <TableCaption>Lista de Usuários</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>E-mail</TableHead>
          <TableHead>Cargo</TableHead>
          <TableHead>Criado em</TableHead>
          <TableHead>Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={index}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>{user.createAt}</TableCell>
            <TableCell className="flex gap-4">
              <Edit size={20} className="hover:cursor-pointer" />
              <Trash
                size={20}
                className="text-destructive hover:cursor-pointer"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
