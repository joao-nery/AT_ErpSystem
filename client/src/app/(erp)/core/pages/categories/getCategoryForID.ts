"use server";

export async function GetCategoryForID(id: string, token: string) {
  const response = await fetch(`http://localhost:3001/categories/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("Erro ao buscar categoria");
  }
  const data = await response.json();
  return data;
}
