import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b to-slate-200 from-slate-100">
      <h2 className="text-4xl font-semibold">Página não encontrada!</h2>
      <p className="text-2xl">
        Não foi possível encontrar o recurso requisitado.
      </p>
      <p>
        Clique aqui para{" "}
        <Link className="text-blue-300" href="/">
          voltar
        </Link>
      </p>
    </div>
  );
}
