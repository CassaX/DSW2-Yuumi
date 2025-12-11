import { useNavigate } from "react-router-dom";

export default function Ingredientes() {
  const navigate = useNavigate();

  return (
    <div className="bg-white font-poppins">

      {/* Hero */}
      <div
        className="w-full h-96 relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-2xl px-4 relative">
            <input
              placeholder="Buscar receitas..."
              className="w-full py-4 px-6 rounded-full bg-white"
            />
            <button
              onClick={() => navigate("/resultados")}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-brand-yellow py-2 px-6 rounded-full font-semibold"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="text-center mt-12 mb-12">
        <h1 className="text-5xl font-bold inline-block bg-brand-yellow px-8 py-4 rounded-lg">
          BUSCA POR INGREDIENTES
        </h1>
      </div>

      {/* Conteúdo original omitido para ficar curto — posso colocar completo se quiser */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate("/resultados")}
          className="bg-brand-yellow px-12 py-4 rounded-full text-xl font-semibold"
        >
          Buscar Receitas
        </button>
      </div>
    </div>
  );
}
