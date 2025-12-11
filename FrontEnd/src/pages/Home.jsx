import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50">

      {/* Hero */}
      <section
        className="relative h-96 flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-5xl font-bold text-white mb-4">O que vamos cozinhar hoje?</h1>

          {/* Campo de busca (quando clicar → resultados) */}
          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Busque por receitas..."
              className="w-full p-4 pl-6 pr-24 rounded-full border-2 border-transparent focus:ring-2 focus:ring-yellow-500"
            />
            <button
              onClick={() => navigate("/resultados")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-yellow py-2 px-5 rounded-full font-semibold"
            >
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* Receita do dia */}
      <section className="container mx-auto p-4 my-12">
        <h2 className="text-2xl font-bold mb-6">Receita do Dia</h2>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <img src="/imagens/receitas/PizzaPepperoni.jpg" className="w-full h-80 object-cover" />
          </div>

          <div className="w-full md:w-1/2 p-8">
            <h3 className="text-2xl font-bold mb-4">Pizza de Pepperoni Caseira</h3>
            <p className="text-gray-600 mb-6">
              Aprenda a fazer uma pizza deliciosa e crocante no conforto da sua casa.
            </p>

            <button
              onClick={() => navigate("/receita/pizza-pepperoni")}
              className="bg-brand-yellow py-3 px-6 rounded-full font-semibold"
            >
              Ver Receita Completa
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
