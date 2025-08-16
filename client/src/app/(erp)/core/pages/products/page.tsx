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
} from "lucide-react";
import { useEffect, useState } from "react";
import { EditProductModal } from "./editProductModal";

import type { ProductTypes } from "@/types/product.entity.types";
import { Button } from "@/components/ui/button";
import CreateProductModal from "./createProductModal";

// Começo do Componente ----------------------------------------------------------

export default function Products() {
  // modal
  const [product, setProduct] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [createProductsModal, setCreateProductsModal] = useState(false);

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
    const formatedDate = `${date.getDate().toString()}-${
      date.getMonth() + 1
    }-${date.getFullYear().toString()}`;

    return formatedDate;
  }

  async function filterProducts(searchTerm: string) {
    const filteredProducts = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setProducts(filteredProducts);

    if (searchTerm === "") {
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
  }

  function CalculateQuantity() {
    const filteredQuantity = products.map((item) => item.quantity);

    return filteredQuantity.reduce(
      (total, value) => Number(total) + Number(value),
      0
    );
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
      <section className="mb-10">
        <div className="flex items-center gap-2">
          <BoxesIcon size={40} />
          <h1 className="text-2xl font-semibold text-center">Meus Produtos</h1>
        </div>
        <div className="flex items-center justify-between gap-2 mt-10">
          <div className="flex items-center gap-2">
            <SearchIcon size={20} />
            <label className="sr-only">Search</label>
            <input
              type="text"
              placeholder="Pesquisar"
              className=" py-2 px-3 border rounded-lg"
              onChange={(e) => filterProducts(e.target.value)}
            />

            {/* <Button>Filtrar por</Button> */}
          </div>

          <div className="flex gap-3">
            <Button
              className="cursor-pointer"
              onClick={() => setCreateProductsModal(true)}>
              Adicionar Produto
              <Plus size={20} />
            </Button>
            {/* <Button onClick={}>importar Cliente</Button> */}
          </div>
        </div>
      </section>

      {/* Tabela de produtos */}
      <Table>
        <TableCaption>Lista de Produtos</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Preço de Venda</TableHead>
            <TableHead>Quantidade</TableHead>
            <TableHead>Criado em</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                {product.salePrice.toString().replace(".", ",")}
              </TableCell>
              <TableCell>{product.quantity}</TableCell>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex gap-10 items-center justify-center">
                <span>Total de produtos: {products.length}</span>
                <span>Quantidade em Estoque: {CalculateQuantity()}</span>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Modal de criação de produto */}
      {createProductsModal && (
        <CreateProductModal onClose={() => setCreateProductsModal(false)} />
      )}

      {editModal && (
        <EditProductModal
          onClose={() => setEditModal(false)}
          idProduct={product}
        />
      )}
    </main>
  );
}
