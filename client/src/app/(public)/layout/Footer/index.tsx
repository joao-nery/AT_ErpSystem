export function Footer() {
  return (
    <footer className="bg-neutral-900 w-full h-[250px] dark:bg-neutral-900 p-5 text-white  flex flex-col justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold">
          AT-ERP <span className="text-[#ED254E]">System</span>
        </h1>
        <p className="text-gray-400">
          Be sure to take a look at our Terms of Use and Privacy Policy
        </p>
        <p className="text-center mt-5 text-sm text-gray-300 ">
          © {new Date().getFullYear()} AT-ERP. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
