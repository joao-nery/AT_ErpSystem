export function Footer() {
  return (
    <footer className="bg-neutral-900 w-full dark:bg-neutral-900 p-5 text-white h-max flex flex-col justify-center items-center">
      <div className="">
        <section className="w-full text-xs lg:text-sm text-center flex flex-col lg:flex-row lg:text-left justify-between gap-4 p-10">
          <ul className="">
            <li>
              <a href="#">Termos de Uso</a>
            </li>
            <li>
              <a href="#">Politica de Privacidade</a>
            </li>
            <li>
              <a href="#">Contato</a>
            </li>
            <li>
              <a href="#">Ajuda</a>
            </li>
          </ul>

          <ul className="">
            <li>
              <a href="#">Telefone: (11) 1234-5678</a>
            </li>
            <li>
              <a href="#">E-mail: erp_system@example.com</a>
            </li>
          </ul>

          <ul>
            <li>
              <a href="#">Facebook</a>
            </li>
            <li>
              <a href="#">Twitter</a>
            </li>
            <li>
              <a href="#">Instagram</a>
            </li>
          </ul>
        </section>

        <p className="text-center mt-5 text-sm text-gray-300 ">
          © {new Date().getFullYear()} AT-ERP. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
