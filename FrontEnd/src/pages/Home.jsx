import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; 
import { generateBySearch } from "../services/aiService"; 
import useLocalStorage from "../hooks/useLocalStorage"; 
// Se você está usando Heroicons, adicione:
// import { XMarkIcon } from '@heroicons/react/24/solid'; 

// 🎯 Dados Estáticos (Mock Data)
const MOCK_RECIPE_OF_THE_DAY = {
    title: "Pizza de Pepperoni Caseira",
    description: "Aprenda a fazer uma pizza deliciosa e crocante no conforto da sua casa. Esta receita foi inserida manualmente para minimizar o uso da API.",
    image_url: "/imagens/receitas/PizzaPepperoni.jpg",
    slug: "pizza-pepperoni" 
};

const MOCK_POPULAR_RECIPES = [
    { title: "Bolo de Cenoura", author: "Chef Ana", image_url: "/imagens/receitas/boloDeCenouras.avif", slug: "bolo-cenoura" },
    { title: "Costela Assada", author: "Chef Cassatti", image_url: "/imagens/receitas/costela.jpeg", slug: "costela-assada" },
    { title: "Lasanha", author: "Chef Nathalia", image_url: "/imagens/receitas/lasanha.jpeg", slug: "lasanha" },
];


export default function Home() {
    const navigate = useNavigate();
    
    // R6: Histórico de termos de pesquisa
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useLocalStorage('recentSearches', []);
    
    // 🎯 REINTEGRADO: Hook para o histórico de RECEITAS GERADAS (R6)
    const [generatedRecipesHistory, setGeneratedRecipesHistory] = useLocalStorage('generatedRecipesHistory', []);
    
    
    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        const newQuery = searchTerm.trim();
        
        // R6: Salva a nova pesquisa no histórico de termos
        const updatedHistory = [newQuery, ...searchHistory.filter(q => q !== newQuery)].slice(0, 5);
        setSearchHistory(updatedHistory);

        const recipes = await generateBySearch(newQuery);

        // 🚨 BLOCO REINTEGRADO: Acumula as receitas geradas
        if (recipes && recipes.length > 0) {
            // Adiciona a query de origem à receita antes de salvar
            const newRecipes = recipes.map(r => ({ ...r, sourceQuery: newQuery }));
            
            // ACUMULAÇÃO: Adiciona as novas receitas no topo das antigas
            setGeneratedRecipesHistory(prevHistory => [...newRecipes, ...prevHistory]);
        }
        // FIM DO BLOCO REINTEGRADO

        setLoading(false);
        
        navigate("/resultados", { state: { recipes: recipes, query: newQuery } });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };
    
    // 🎯 FUNÇÃO DE LIMPAR HISTÓRICO DE TERMOS (Mantida)
    const handleClearHistory = () => {
        if (window.confirm("Tem certeza que deseja apagar todo o histórico de pesquisas recentes?")) {
            setSearchHistory([]);
        }
    };


    return (
        <main className="bg-gray-50 font-poppins min-h-screen">
            {/* ... (O restante do JSX permanece o mesmo) ... */}
            
            {/* HERO / BUSCA */}
            <section
                className="relative h-96 flex items-center justify-center text-center"
                style={{
                    backgroundImage:
                        "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1740&q=80')",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                {/* ... (Bloco de Busca) ... */}
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
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyPress={handleKeyPress}
                            disabled={loading}
                        />

                        <button 
                            onClick={handleSearch} 
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#FFEAA2] text-brand-light-black py-2 px-5 rounded-full font-semibold hover:bg-yellow-200"
                            disabled={loading}
                        >
                            {loading ? 'Buscando...' : 'Buscar'}
                        </button>
                    </div>
                </div>
            </section>
            
            {/* Histórico de Pesquisa (R6) */}
            {searchHistory.length > 0 && (
                <section className="container mx-auto p-4 my-6">
                    
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-gray-700">Pesquisas Recentes:</h3>
                        
                        <button
                            onClick={handleClearHistory}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition"
                        >
                            Limpar Histórico
                        </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {searchHistory.map((query, index) => (
                            <button
                                key={index}
                                onClick={() => setSearchTerm(query)}
                                className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
                            >
                                {query}
                            </button>
                        ))}
                    </div>
                </section>
            )}


            {/* RECEITA DO DIA (Estático) */}
            <section className="container mx-auto p-4 my-12">
                <h2 className="text-2xl font-bold text-brand-light-black mb-6">Receita do Dia</h2>

                <article className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center">
                    <div className="w-full md:w-1/2">
                        <img src={MOCK_RECIPE_OF_THE_DAY.image_url} alt={MOCK_RECIPE_OF_THE_DAY.title} className="w-full h-80 object-cover" />
                    </div>

                    <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-brand-light-black mb-4">
                            {MOCK_RECIPE_OF_THE_DAY.title}
                        </h3>

                        <p className="text-gray-600 mb-6">
                            {MOCK_RECIPE_OF_THE_DAY.description}
                        </p>

                        <button 
                            onClick={() => navigate(`/receita/${MOCK_RECIPE_OF_THE_DAY.slug}`)} 
                            className="bg-[#FFEAA2] text-brand-light-black self-start py-3 px-6 rounded-full font-semibold hover:bg-yellow-200 transition">
                            Ver Receita Completa
                        </button>
                    </div>
                </article>
            </section>

            {/* RECEITAS POPULARES (Estático) */}
            <section className="container mx-auto p-4 my-12">
                <h2 className="text-2xl font-bold text-brand-light-black mb-6">Receitas Populares</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    
                    {MOCK_POPULAR_RECIPES.map((recipe, index) => (
                        <article
                            key={index}
                            onClick={() => navigate(`/receita/${recipe.slug}`)}
                            className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300"
                        >
                            <img src={recipe.image_url} alt={recipe.title} className="w-full h-40 object-cover" />
                            <div className="p-4">
                                <h3 className="font-semibold text-brand-light-black">{recipe.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">Por: {recipe.author}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

        </main>
    );
}