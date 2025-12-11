import React, { useState } from 'react'; // Importe useState
import { useNavigate } from "react-router-dom";
import { generateByIngredients } from "../services/aiService"; // R5: Importe a função de geração

export default function Ingredientes() {
    const navigate = useNavigate();
    
    // Estado para o texto de entrada dos ingredientes
    const [ingredientsInput, setIngredientsInput] = useState('');
    
    // Estado para o carregamento e desabilitar o botão
    const [loading, setLoading] = useState(false);

    // 💡 Função principal para lidar com a busca por ingredientes
    const handleGenerate = async () => {
        // Verifica se o campo não está vazio
        if (!ingredientsInput.trim()) return;

        setLoading(true);
        
        // R5: Converte a string de input em um array (separado por vírgula)
        const ingredientsArray = ingredientsInput
            .split(',') // Divide pela vírgula
            .map(item => item.trim()) // Remove espaços em branco
            .filter(item => item.length > 0); // Remove itens vazios
        
        // Chama a API de IA do back-end
        const recipes = await generateByIngredients(ingredientsArray);

        setLoading(false);

        // Navega para a página de resultados, passando os dados
        // A 'query' é formatada para ser exibida nos Resultados.
        navigate("/resultados", { 
            state: { 
                recipes: recipes, 
                query: `Ingredientes: ${ingredientsArray.join(', ')}` 
            } 
        });
    };

    return (
        <div className="bg-gray-50 font-poppins min-h-screen"> 

            {/* Hero (Mantido) */}
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
                    {/* Aqui estava o input da busca, que foi movido para o corpo da página */}
                    <div className="w-full max-w-2xl px-4 relative">
                        <h2 className="text-white text-4xl font-bold text-center">
                            O que você tem na geladeira?
                        </h2>
                    </div>
                </div>
            </div>

            {/* Título */}
            <div className="text-center mt-12 mb-12">
                <h1 className="text-3xl md:text-5xl font-bold inline-block bg-[#FFEAA2] px-6 py-3 rounded-lg">
                    BUSCA POR INGREDIENTES
                </h1>
                <p className="text-gray-600 mt-3">Digite os ingredientes que você tem, separados por vírgula.</p>
            </div>

            {/* 💡 NOVO: Área de Input e Botão de Geração */}
            <div className="w-full max-w-xl mx-auto px-4 pb-12">
                <textarea
                    placeholder="Ex: Frango, batata, creme de leite, queijo..."
                    className="w-full p-4 border rounded-lg shadow-md focus:ring-yellow-500 focus:border-yellow-500 transition"
                    rows="6"
                    value={ingredientsInput}
                    onChange={(e) => setIngredientsInput(e.target.value)}
                    disabled={loading}
                />
            
                <div className="text-center mt-6">
                    <button
                        onClick={handleGenerate}
                        className="bg-[#FFEAA2] px-10 py-3 rounded-full text-xl font-semibold hover:bg-yellow-200 transition disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Gerando Receitas...' : 'Gerar Receitas com IA'}
                    </button>
                </div>
            </div>

            {/* Conteúdo original foi simplificado/removido, pois a busca agora é o foco */}
            
        </div>
    );
}