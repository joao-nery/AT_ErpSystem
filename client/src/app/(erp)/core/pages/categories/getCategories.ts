import { GetCookie } from "../../actions/getCookie";

export async function GetAllCategories() {
  const token = await GetCookie();

  const response = await fetch("http://localhost:3001/categories", {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar categorias!");
  }

  const data = await response.json();

  return data;
}
