import React from 'react';
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { XMarkIcon } from '@heroicons/react/24/solid'; // Se você instalou o Heroicons

export default function HistoricoReceitas() {
    const navigate = useNavigate();
    
    // Carrega o histórico completo de receitas
    const [recipesHistory, setRecipesHistory] = useLocalStorage('generatedRecipesHistory', []);

    const hasRecipes = recipesHistory.length > 0;
    
    //Limpa todo o histórico de receitas geradas
    const handleClearHistory = () => {
        if (window.confirm("Tem certeza que deseja apagar TODO o histórico de receitas geradas? Esta ação não pode ser desfeita.")) {
            setRecipesHistory([]); // Limpa o estado e o LocalStorage
        }
    };


    return (
        <main className="container mx-auto p-4 font-poppins min-h-screen">

            <section className="my-8">
                
                {/* TÍTULO E BOTÃO DE LIMPAR */}
                <div className="flex justify-between items-center mb-3">
                    <h1 className="text-3xl font-bold text-brand-light-black">
                        Receitas Geradas ({recipesHistory.length})
                    </h1>
                    
                    {hasRecipes && (
                        <button
                            onClick={handleClearHistory}
                            className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center gap-1 transition"
                        >
                            <XMarkIcon className="h-4 w-4" /> 
                            Limpar Histórico
                        </button>
                    )}
                </div>

                <p className="text-gray-600">
                    {hasRecipes 
                        ? 'Todas as receitas criadas pela IA desde o seu último acesso.'
                        : 'Nenhuma receita gerada ainda. Use a busca na página inicial para começar!'
                    }
                </p>
            </section>

            <section className="my-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {hasRecipes ? (
                        recipesHistory.map((recipe, index) => (
                            <article
                                key={index}
                                onClick={() => navigate(`/receita/${index}`, { state: { recipe: recipe } })}
                                className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition duration-300"
                            >
                                <img 
                                    src={recipe.image_url || "/imagens/placeholder.jpeg"} 
                                    alt={recipe.title} 
                                    className="w-full h-48 object-cover" 
                                />
                                <div className="p-4">
                                    <h3 className="font-semibold text-brand-light-black line-clamp-1">{recipe.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1">Tempo: {recipe.time || 'N/A'}</p>
                                    {recipe.sourceQuery && (
                                        <p className="text-xs text-gray-400 mt-1">Busca: {recipe.sourceQuery}</p>
                                    )}
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-10 text-gray-500">
                            Comece a buscar na Home!
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}