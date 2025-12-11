import { useNavigate } from "react-router-dom"; 
// * O import do Header foi removido daqui! *

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="bg-gray-50 font-poppins">

      {/* HERO */}
      <section
        className="relative h-96 flex items-center justify-center text-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative z-10 px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            O que vamos cozinhar hoje?
          </h1>

          <p className="text-gray-200 mb-6 max-w-2xl mx-auto">
            Encontre a receita perfeita para qualquer ocasião.
          </p>

          <div className="relative w-full max-w-xl mx-auto">
            <input
              type="search"
              placeholder="Busque por receitas..."
              className="w-full p-4 pl-6 pr-24 rounded-full border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <button 
                onClick={() => navigate("/resultados")} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FFEAA2] text-brand-light-black py-2 px-5 rounded-full font-semibold hover:bg-yellow-200">
              Buscar
            </button>
          </div>
        </div>
      </section>

      {/* RECEITA DO DIA */}
      <section className="container mx-auto p-4 my-12">
        <h2 className="text-2xl font-bold text-brand-light-black mb-6">Receita do Dia</h2>

        <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2">
            <img src="/imagens/receitas/PizzaPepperoni.jpg" alt="Pizza" className="w-full h-80 object-cover" />
          </div>

          <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
            <h3 className="text-2xl font-bold text-brand-light-black mb-4">
              Pizza de Pepperoni Caseira
            </h3>

            <p className="text-gray-600 mb-6">
              Aprenda a fazer uma pizza deliciosa e crocante no conforto da sua casa.
            </p>

            <button 
                onClick={() => navigate("/receita/pizza-pepperoni")} 
                className="bg-[#FFEAA2] text-brand-light-black self-start py-3 px-6 rounded-full font-semibold hover:bg-yellow-200 transition">
              Ver Receita Completa
            </button>
          </div>
        </article>
      </section>

      {/* RECEITAS POPULARES */}
      <section className="container mx-auto p-4 my-12">
          <h2 className="text-2xl font-bold text-brand-light-black mb-6">Receitas Populares</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <article
                  onClick={() => navigate("/receita/bolo-cenoura")}
                  className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300"
              >
                  <img src="/imagens/receitas/boloDeCenouras.avif" alt="Bolo de Cenoura" className="w-full h-40 object-cover" />
                  <div className="p-4">
                      <h3 className="font-semibold text-brand-light-black">Bolo de Cenoura</h3>
                      <p className="text-sm text-gray-500 mt-1">Por: Chef Ana</p>
                  </div>
              </article>
              
              <article
                  onClick={() => navigate("/receita/costela-assada")}
                  className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300"
              >
                  <img src="/imagens/receitas/costela.jpeg" alt="Costela Assada" className="w-full h-40 object-cover" />
                  <div className="p-4">
                      <h3 className="font-semibold text-brand-light-black">Costela Assada</h3>
                      <p className="text-sm text-gray-500 mt-1">Por: Chef Cassatti</p>
                  </div>
              </article>

              <article
                  onClick={() => navigate("/receita/lasanha")}
                  className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300"
              >
                  <img src="/imagens/receitas/lasanha.jpeg" alt="Lasanha" className="w-full h-40 object-cover" />
                  <div className="p-4">
                      <h3 className="font-semibold text-brand-light-black">Lasanha</h3>
                      <p className="text-sm text-gray-500 mt-1">Por: Chef Nathalia</p>
                  </div>
              </article>
          </div>
      </section>

    </main>
  );
}