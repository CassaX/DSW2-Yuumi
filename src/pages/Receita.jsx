import { useParams } from "react-router-dom";

export default function Receita() {
  const { id } = useParams();

  return (
    <div className="bg-white font-poppins">

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
      </div>

      <div className="w-full max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-center mb-12">
          RECEITA: {id.replace("-", " ").toUpperCase()}
        </h1>

        {/* Conteúdo original simplificado */}
        <p className="text-lg">
          Aqui você pode colocar os ingredientes e preparo da receita <b>{id}</b>.
        </p>
      </div>
    </div>
  );
}
