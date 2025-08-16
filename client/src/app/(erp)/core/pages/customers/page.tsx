"use client";

import { GetCookie } from "@/app/(erp)/core/actions/getCookie";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BoxesIcon,
  CircleUserRound,
  Edit,
  Plus,
  SearchIcon,
  Trash,
  User2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EditCustomerModal } from "./editCustomerModal";
import type { Customer } from "@/types/customer.entity.types";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { CreateCustomerModal } from "./createCustomerModal";

// Começo do Componente ----------------------------------------------------------

export default function Customers() {
  // modais
  const [idCustomerModal, setIdCustomerModal] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [createCustomerModal, setCreateCustomerModal] = useState(false);

  // gerando a lista
  const [customers, setCustomers] = useState<Customer[]>([]);

  console.log(customers);

  // --- Função buscar clientes -- //
  useEffect(() => {
    async function fetchCustomers() {
      const token = await GetCookie();

      const response = await fetch("http://localhost:3001/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Não há produtos");
      }

      const data = await response.json();

      setCustomers(data.data);
    }

    fetchCustomers();
  }, []);

  // --- Função formatar data -- //
  function formatDate(customerCreateAt: string) {
    const date = new Date(customerCreateAt);
    const formatedDate = `${date.getDate().toString()}-${
      date.getMonth() + 1
    }-${date.getFullYear().toString()}`;

    return formatedDate;
  }

  // --- Função filtrar clientes -- //
  async function filterCustomers(searchTerm: string) {
    const filteredCustomers = customers.filter((customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCustomers(filteredCustomers);

    if (searchTerm === "") {
      const token = await GetCookie();
      const response = await fetch("http://localhost:3001/customers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Não há clientes");
      }

      const data = await response.json();
      setCustomers(data.data);
    }
  }

  // --- Função deletar usuário -- //
  async function deleteUser(id: string) {
    try {
      const res = await fetch(`http://localhost:3001/customers/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await GetCookie()}`,
        },
      });

      if (!res.ok) {
        toast.error("Ocorreu um erro ao deletar o cliente", {
          duration: 1000,
          position: "top-center",
          richColors: true,
          style: {
            display: "flex",
            justifyContent: "center",
            fontSize: "15px",
            alignItems: "center",
            gap: "5px",
          },
        });

        throw new Error("Failed to delete user");
      }

      setCustomers((prev: any) =>
        prev.filter((customer: any) => customer.id !== id)
      );

      toast.success("Cliente deletado com sucesso!", {
        duration: 1000,
        position: "top-center",
        richColors: true,
        style: {
          display: "flex",
          justifyContent: "center",
          fontSize: "15px",
          alignItems: "center",
          gap: "5px",
        },
      });
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  // --- Elementos -- //
  return (
    <main className="p-5">
      <section className="mb-10">
        <div className="flex items-center gap-2">
          <CircleUserRound size={40} />
          <h1 className="text-2xl font-semibold text-center">Meus Clientes</h1>
        </div>
        <div className="flex items-center justify-between gap-2 mt-10">
          <div className="flex items-center gap-2">
            <SearchIcon size={20} />
            <label className="sr-only">Search</label>
            <input
              type="text"
              placeholder="Pesquisar"
              className=" py-2 px-3 border rounded-lg"
              onChange={(e) => filterCustomers(e.target.value)}
            />

            {/* <Button>Filtrar por</Button> */}
          </div>

          <div className="flex gap-3">
            <Button
              className="cursor-pointer"
              onClick={() => setCreateCustomerModal(true)}>
              Adicionar Cliente
              <Plus size={20} />
            </Button>
            {/* <Button onClick={}>importar Cliente</Button> */}
          </div>
        </div>
      </section>

      {/* Tabela de clientes */}
      <Table>
        <TableCaption>Lista de Clientes</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.notes}</TableCell>
              <TableCell>{formatDate(customer.createdAt)}</TableCell>

              <TableCell className="flex gap-4">
                <Edit
                  size={20}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setEditModal(true);
                    setIdCustomerModal(customer.id);
                  }}
                />
                <Trash
                  size={20}
                  className="text-destructive hover:cursor-pointer"
                  onClick={() => deleteUser(customer.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              <div className="flex gap-10 items-center justify-center">
                <span>Total de Clientes Cadastrados: {customers.length}</span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Modal de criação de cliente */}
      {createCustomerModal && (
        <CreateCustomerModal onClose={() => setCreateCustomerModal(false)} />
      )}

      {/* Modal de edição de cliente */}
      {editModal && (
        <EditCustomerModal
          onClose={() => setEditModal(false)}
          id={idCustomerModal}
        />
      )}

      {/* Toast para mensagens */}
      <Toaster />
    </main>
  );
}
