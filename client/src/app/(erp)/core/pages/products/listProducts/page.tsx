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
import { BoxesIcon, Edit, SearchIcon, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { EditProductModal } from "./editProductModal";

import type { ProductTypes } from "@/types/product.entity.types";

// Começo do Componente ----------------------------------------------------------

export default function ListProducts() {
  // modal
  const [product, setProduct] = useState("");
  const [editModal, setEditModal] = useState(false);

  // gerando a lista
  const [products, setProducts] = useState<ProductTypes[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const token = await GetCookie();

      const response = await fetch("http://localhost:3001/products", {
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

      setProducts(data);
    }

    fetchProducts();
  }, []);

  function formatDate(productCreateAt: string) {
    const date = new Date(productCreateAt);

    console.log(date);

    const formatedDate = `${date.getDate().toString()}-${
      date.getMonth() + 1
    }-${date.getFullYear().toString()}`;

    return formatedDate;
  }

  async function filterProducts(searchTerm: string) {
    const filteredProducts = products.filter((product) =>
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setProducts(filteredProducts);

    if (searchTerm === "") {
      const token = await GetCookie();

      const response = await fetch("http://localhost:3001/products", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();

      setProducts(data);
    }
  }

  async function deleteUser(id: string) {
    try {
      const res = await fetch(`http://localhost:3001/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await GetCookie()}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to delete user");
      }

      setProducts((prev) => prev.filter((product) => product.id !== id));

      console.log(`User with ID ${id} deleted successfully`);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <main className="p-5">
      <div className="flex gap-5 justify-center">
        <h1 className="text-2xl font-semibold text-center">
          Lista de Produtos
        </h1>
        <BoxesIcon size={40} />
      </div>
      <div className="flex items-center gap-2 mt-10">
        <SearchIcon size={20} />
        <label className="sr-only">Search</label>
        <input
          type="text"
          placeholder="Pesquisar"
          className=" p-3 border rounded-lg"
          onChange={(e) => filterProducts(e.target.value)}
        />
      </div>
      <Table className="mt-10 rounded-2xl">
        <TableCaption>Lista de Produtos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r">Descrição</TableHead>
            <TableHead className="border-r">Fornecedor</TableHead>
            <TableHead className="border-r">Código de Barras</TableHead>
            <TableHead className="border-r">Referência</TableHead>
            <TableHead className="border-r">Preço de Venda</TableHead>
            <TableHead className="border-r">Preço de Compra</TableHead>
            <TableHead className="border-r">Quantidade</TableHead>
            <TableHead className="border-r">Categoria</TableHead>
            <TableHead className="border-r">Tamanho</TableHead>
            <TableHead className="border-r">Criado em</TableHead>
            <TableHead className="border-r">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.description}</TableCell>
              <TableCell>{product.supplier}</TableCell>
              <TableCell>{product.barCode}</TableCell>
              <TableCell>{product.reference}</TableCell>
              <TableCell>
                {product.salePrice.toString().replace(".", ",")}
              </TableCell>
              <TableCell>
                {product.purchasePrice.toString().replace(".", ",")}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.categories}</TableCell>
              <TableCell>{product.size}</TableCell>
              <TableCell>{formatDate(product.createdAt)}</TableCell>
              <TableCell className="flex gap-4">
                <Edit
                  size={20}
                  className="hover:cursor-pointer"
                  onClick={() => {
                    setEditModal(true);
                    setProduct(product.id);
                  }}
                />
                <Trash
                  size={20}
                  className="text-destructive hover:cursor-pointer"
                  onClick={() => deleteUser(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editModal && (
        <EditProductModal
          onClose={() => {
            setEditModal(false);
          }}
          id={product}
        />
      )}
    </main>
  );
}
