import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-brand-yellow font-poppins border-t border-black/10 mt-12">
      <div className="container mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="flex items-start justify-center md:justify-start">
            <Link to="/">
              <img src="/imagens/logos/yuumi.jpeg" alt="Logo Yuumi" className="h-32" />
            </Link>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-brand-light-black">Links</h3>
            <nav className="flex flex-col space-y-2 text-brand-light-black">
              <Link to="/" className="hover:underline">Home</Link>
              <Link to="/ingredientes" className="hover:underline">Receita por Ingredientes</Link>
            </nav>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-brand-light-black">Suporte</h3>
            <nav className="flex flex-col space-y-2 text-brand-light-black">
              <a href="#" className="hover:underline">Termos de Serviço</a>
              <a href="#" className="hover:underline">Política de Privacidade</a>
              <a href="#" className="hover:underline">FAQs</a>
            </nav>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider mb-4 text-brand-light-black">Redes Sociais</h3>
            <div className="flex items-center space-x-4">
              
              <a href="#" aria-label="Facebook" className="hover:opacity-75 transition-opacity">
                <img src="/imagens/logos/facebook.svg" alt="Facebook" className="w-6 h-6" />
              </a>

              <a href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
                <img src="/imagens/logos/instagram.svg" alt="Instagram" className="w-6 h-6" />
              </a>

              <a href="#" aria-label="X" className="hover:opacity-75 transition-opacity">
                <img src="/imagens/logos/x.svg" alt="X" className="w-6 h-6" />
              </a>

            </div>
          </div>
        </div>

        <div className="text-center text-brand-light-black mt-12 pt-8 border-t border-black/10">
          <p>&copy; 2025 Yuumi. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}