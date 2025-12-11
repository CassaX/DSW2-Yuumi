import { Link } from "react-router-dom";
import { useState } from "react"; 

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

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

        {/* Mobile (Usando useState para controle de estado e ícone 'X') */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="cursor-pointer p-2 rounded-lg hover:bg-yellow-200 transition focus:outline-none"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-8 h-8 text-brand-light-black"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              role="img"
              aria-label={isOpen ? "Fechar Menu" : "Abrir Menu"}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                // 'X' se aberto, 'Hamburguer' se fechado
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>

          {/* Menu Suspenso Mobile */}
          {isOpen && (
            <nav 
              id="mobile-menu"
              className="absolute top-20 right-0 bg-brand-yellow shadow-xl rounded-lg p-4 w-56 border-t-2 border-brand-light-black/10"
            >
              <div className="flex flex-col space-y-3">
                <Link to="/" onClick={toggleMenu} className="p-2 rounded font-medium hover:bg-yellow-300 transition">Início</Link>
                <Link to="/resultados" onClick={toggleMenu} className="p-2 rounded font-medium hover:bg-yellow-300 transition">Todas as Receitas</Link>
                <Link to="/ingredientes" onClick={toggleMenu} className="p-2 rounded font-medium hover:bg-yellow-300 transition">Ingredientes</Link>
              </div>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}