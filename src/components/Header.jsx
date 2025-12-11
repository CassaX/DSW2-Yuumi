import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="w-full bg-brand-yellow font-poppins shadow-md relative z-50">
      <div className="container mx-auto px-4 h-24 flex justify-between items-center">

        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src="/imagens/logos/yuumi.jpeg" alt="Logo" className="h-20" />
          </Link>
        </div>

        {/* Menu Desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium text-lg uppercase text-brand-light-black">Início</Link>
          <Link to="/resultados" className="font-medium text-lg uppercase text-brand-light-black">Todas as Receitas</Link>
          <Link to="/ingredientes" className="font-medium text-lg uppercase text-brand-light-black">Ingredientes</Link>
        </nav>

        {/* Mobile */}
        <div className="md:hidden">
          <details className="relative">
            <summary className="list-none cursor-pointer">
              <svg className="w-8 h-8 text-brand-light-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </summary>

            <nav className="absolute top-12 right-0 bg-brand-yellow shadow-lg rounded-lg p-4 w-56">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="p-2 rounded font-medium">Início</Link>
                <Link to="/resultados" className="p-2 rounded font-medium">Todas as Receitas</Link>
                <Link to="/ingredientes" className="p-2 rounded font-medium">Ingredientes</Link>
              </div>
            </nav>
          </details>
        </div>
      </div>
    </header>
  );
}
