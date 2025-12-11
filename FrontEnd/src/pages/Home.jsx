import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom"; 
import { searchRecipe } from "../services/aiService"; // Busca Geral (Busca do Usuário)
import { generateByIngredients } from "../services/aiService"; // Usado para a Receita do Dia/Populares
import useLocalStorage from "../hooks/useLocalStorage"; // R6: Persistência de dados

export default function Home() {
    const navigate = useNavigate();
    
    // R6: Estados persistentes no localStorage
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchHistory, setSearchHistory] = useLocalStorage('recentSearches', []);
    const [homeRecipes, setHomeRecipes] = useLocalStorage('homeRecipes', { 
        dayRecipe: null, 
        popularRecipes: [] 
    });
    const [hasLoaded, setHasLoaded] = useState(false); // Para controlar o carregamento inicial

    // 💡 Efeito para carregar as receitas da Home (R5 e R6)
    useEffect(() => {
        // Se já temos receitas salvas, pulamos a chamada da API
        if (homeRecipes.dayRecipe && homeRecipes.popularRecipes.length > 0) {
            setHasLoaded(true);
            return;
        }

        const fetchHomeRecipes = async () => {
            setLoading(true);

            try {
                // 1. Geração da Receita do Dia (comando mais específico)
                const dayRecipeCommand = "Gere 1 receita rápida e inspiradora para a 'Receita do Dia'.";
                const dayRecipeResult = await searchRecipe(dayRecipeCommand);
                const dayRecipe = dayRecipeResult[0]; // Pega a primeira (e única) receita

                // 2. Geração das 3 Receitas Populares (comando mais genérico)
                const popularCommand = "Gere 3 receitas populares e variadas para a seção de 'Receitas Populares'.";
                const popularRecipes = await searchRecipe(popularCommand);

                // R6: Salva no localStorage (persiste a informação)
                setHomeRecipes({
                    dayRecipe: dayRecipe,
                    popularRecipes: popularRecipes.slice(0, 3) 
                });

            } catch (error) {
                console.error("Erro ao carregar receitas da Home:", error);
                // Define valores vazios em caso de falha
                setHomeRecipes({ dayRecipe: null, popularRecipes: [] });
            } finally {
                setLoading(false);
                setHasLoaded(true);
            }
        };

        if (!hasLoaded) {
             fetchHomeRecipes();
        }

    }, [hasLoaded, homeRecipes, setHomeRecipes]); 


    // Função para lidar com a busca do usuário (busca geral)
    const handleSearch = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        const newQuery = searchTerm.trim();
        
        // R6: Salva a nova pesquisa no histórico
        const updatedHistory = [newQuery, ...searchHistory.filter(q => q !== newQuery)].slice(0, 5);
        setSearchHistory(updatedHistory);

        // R5: Chama a API de IA com a busca
        const recipes = await searchRecipe(newQuery);

        setLoading(false);
        
        // Navega para a página de resultados, passando os dados
        navigate("/resultados", { state: { recipes: recipes, query: newQuery } });
    };

    // Função para tratar a tecla Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    const { dayRecipe, popularRecipes } = homeRecipes;
    const recipeOfTheDayReady = hasLoaded && dayRecipe;
    const popularRecipesReady = hasLoaded && popularRecipes.length > 0;


    return (
        <main className="bg-gray-50 font-poppins min-h-screen">

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
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">Pesquisas Recentes:</h3>
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

            {/* RECEITA DO DIA (R5 Dinâmico) */}
            <section className="container mx-auto p-4 my-12">
                <h2 className="text-2xl font-bold text-brand-light-black mb-6">Receita do Dia</h2>
                
                {loading && !recipeOfTheDayReady && (
                    <div className="text-center text-gray-500">Carregando a Receita do Dia...</div>
                )}
                
                {recipeOfTheDayReady && (
                    <article 
                        className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row items-center cursor-pointer"
                        onClick={() => navigate("/receita/day", { state: { recipe: dayRecipe } })} 
                    >
                        <div className="w-full md:w-1/2">
                            <img 
                                src={dayRecipe.image_url || "/imagens/placeholder.jpeg"} 
                                alt={dayRecipe.title} 
                                className="w-full h-80 object-cover" 
                            />
                        </div>

                        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-bold text-brand-light-black mb-4">
                                {dayRecipe.title}
                            </h3>

                            <p className="text-gray-600 mb-6 line-clamp-3">
                                {dayRecipe.instructions ? dayRecipe.instructions.substring(0, 150) + '...' : 'Descrição indisponível.'}
                            </p>

                            <button 
                                className="bg-[#FFEAA2] text-brand-light-black self-start py-3 px-6 rounded-full font-semibold hover:bg-yellow-200 transition">
                                Ver Receita Completa
                            </button>
                        </div>
                    </article>
                )}
            </section>

            {/* RECEITAS POPULARES (R5 Dinâmico) */}
            <section className="container mx-auto p-4 my-12">
                <h2 className="text-2xl font-bold text-brand-light-black mb-6">Receitas Populares</h2>
                
                {loading && !popularRecipesReady && (
                    <div className="text-center text-gray-500">Carregando Receitas Populares...</div>
                )}

                {popularRecipesReady && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        
                        {popularRecipes.map((recipe, index) => (
                            <article
                                key={index}
                                // Navega para a página de receita passando o objeto
                                onClick={() => navigate(`/receita/${index}`, { state: { recipe: recipe } })}
                                className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300"
                            >
                                <img src={recipe.image_url || "/imagens/placeholder.jpeg"} alt={recipe.title} className="w-full h-40 object-cover" />
                                <div className="p-4">
                                    <h3 className="font-semibold text-brand-light-black line-clamp-1">{recipe.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Tempo: {recipe.time || 'N/A'}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}