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
import { Edit, LayoutList, Plus, SearchIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";

import type { Category } from "@/types/category.entity.types";
import { Button } from "@/components/ui/button";
import CreateCategoryModal from "./createCategoriesModal";
import { EditCategoriesModal } from "./editCategoriesModal";

// Começo do Componente ----------------------------------------------------------

export default function Categories() {
  // modal
  const [category, setCategory] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [createCategoriesModal, setCreateCategoriesModal] = useState(false);

  // gerando a lista
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      const token = await GetCookie();

      const response = await fetch("http://localhost:3001/categories", {
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

      setCategories(data.categories);
    }
    fetchCategories();
  }, []);

  function formatDate(categoryCreateAt: string) {
    const date = new Date(categoryCreateAt);
    const formatedDate = `${date.getDate().toString()}-${
      date.getMonth() + 1
    }-${date.getFullYear().toString()}`;

    return formatedDate;
  }

  async function filterCategories(searchTerm: string) {
    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setCategories(filteredCategories);

    if (searchTerm === "") {
      const token = await GetCookie();
      const response = await fetch("http://localhost:3001/categories", {
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
      setCategories(data.categories);
    }
  }

  async function deleteCategory(id: string) {
    try {
      const res = await fetch(`http://localhost:3001/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await GetCookie()}`,
        },
      });

      if (!res.ok) {
        throw new Error("Erro ao deletar categoria");
      }

      setCategories((prev) => prev.filter((category) => category.id !== id));

      console.log(`Category with ID ${id} deleted successfully`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <main className="p-5">
      <section className="mb-10">
        <div className="flex items-center gap-2">
          <LayoutList size={40} />
          <h1 className="text-2xl font-semibold text-center">
            Minhas Categorias
          </h1>
        </div>
        <div className="flex items-center justify-between gap-2 mt-10">
          <div className="flex items-center gap-2">
            <SearchIcon size={20} />
            <label className="sr-only">Search</label>
            <input
              type="text"
              placeholder="Pesquisar"
              className=" py-2 px-3 border rounded-lg"
              onChange={(e) => filterCategories(e.target.value)}
            />
          </div>

          <div className="flex gap-3">
            <Button
              className="cursor-pointer"
              onClick={() => setCreateCategoriesModal(true)}>
              Adicionar Categoria
              <Plus size={20} />
            </Button>
          </div>
        </div>
      </section>

      {/* Tabela de Categorias */}
      <Table>
        <TableCaption>Lista de Categorias</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Quantidade de Produtos</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>{category.quantity}</TableCell>
              <TableCell>{formatDate(category.createdAt)}</TableCell>
              <TableCell className="flex gap-4">
                <Edit
                  size={20}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setEditModal(true);
                    setCategory(category.id);
                  }}
                />
                <Trash
                  size={20}
                  className="text-destructive hover:cursor-pointer"
                  onClick={() => deleteCategory(category.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex gap-10 items-center justify-center">
                <span>Total de categorias: {categories.length}</span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Modal de criação de categoria */}
      {createCategoriesModal && (
        <CreateCategoryModal onClose={() => setCreateCategoriesModal(false)} />
      )}

      {editModal && (
        <EditCategoriesModal
          onClose={() => setEditModal(false)}
          idCategory={category}
        />
      )}
    </main>
  );
}
