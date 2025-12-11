import { useNavigate } from "react-router-dom";

export default function Resultados() {
  const navigate = useNavigate();

  return (
    <main className="container mx-auto p-4">

      <section className="my-8">
        <h1 className="text-3xl font-bold">Resultados</h1>
        <p className="text-gray-600">Foram encontradas 2 receitas</p>
      </section>

      <section className="my-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <article
            onClick={() => navigate("/receita/bolo-cenoura")}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition"
          >
            <img src="/imagens/receitas/boloDeCenouras.avif" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Bolo de Cenoura</h3>
              <p className="text-sm text-gray-500">Por: Chef Ana</p>
            </div>
          </article>

          <article
            onClick={() => navigate("/receita/bolo-fuba")}
            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition"
          >
            <img src="/imagens/receitas/BoloFuba.jpeg" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="font-semibold">Bolo de Fubá</h3>
              <p className="text-sm text-gray-500">Por: Chef Pedro</p>
            </div>
          </article>

        </div>
      </section>
    </main>
  );
}
