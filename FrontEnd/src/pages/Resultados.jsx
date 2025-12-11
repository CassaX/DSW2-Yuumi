import React, { useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage"; // Importe o R6

export default function Resultados() {
    const navigate = useNavigate();
    const location = useLocation(); 

    // 1. Recebe os dados passados pelo navigate (a busca mais recente)
    const newRecipesData = location.state || { recipes: null, query: 'Última Busca' };
    
    // 2. R6: Hook para armazenar o último resultado de busca no localStorage
    const [lastResults, setLastResults] = useLocalStorage('lastSearchResults', newRecipesData);

    // 3. Define qual conjunto de dados usar para renderizar:
    const recipesToRender = newRecipesData.recipes || lastResults.recipes || [];
    const queryToRender = newRecipesData.query || lastResults.query || 'Nenhuma Busca Encontrada';
    
    useEffect(() => {
        if (newRecipesData.recipes && newRecipesData.recipes.length > 0) {
            setLastResults(newRecipesData); 
        }
    }, [newRecipesData, setLastResults]);

    const hasRecipes = recipesToRender.length > 0 && !recipesToRender.error;

    return (
        <main className="container mx-auto p-4 font-poppins">

            <section className="my-8">
                <h1 className="text-3xl font-bold text-brand-light-black">
                    Resultados para: "{queryToRender}"
                </h1>
                <p className="text-gray-600">
                    {hasRecipes 
                        ? `Foram encontradas ${recipesToRender.length} receitas geradas pela IA.` 
                        : (queryToRender === 'Última Busca' 
                            ? 'Nenhuma busca recente encontrada. Tente buscar na Home.'
                            : 'A IA não retornou receitas para esta busca. Tente refinar sua pesquisa.')
                    }
                </p>
            </section>

            <section className="my-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                    {hasRecipes ? (
                        // Mapeia o array de receitas dinâmicas (R5)
                        recipesToRender.map((recipe, index) => (
                            <article
                                key={index}
                                // Navega para a receita e passa o objeto completo
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
                                </div>
                            </article>
                        ))
                    ) : (
                        // Mensagem de erro/falha
                        <div className="col-span-full text-center py-10 text-gray-500">
                            {recipesToRender.error ? `Erro da API: ${recipesToRender.message}` : 'Nenhuma receita para exibir. Faça uma nova busca na página inicial.'}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}