import React from 'react';
import { useParams, useLocation } from "react-router-dom";
// 🎯 Importe o novo serviço de receitas estáticas
import { getStaticRecipeBySlug } from "../services/staticRecipeService"; 

export default function Receita() {
    const { id } = useParams(); // id será o SLUG ('pizza-pepperoni', 'bolo-cenoura')
    const location = useLocation(); 
    
    // 1. Tenta pegar a receita que foi passada pelo navigate (vinda da API)
    let recipe = location.state?.recipe;

    // 2. Se a receita não foi passada (clique na Home estática), busca a estática
    if (!recipe) {
        recipe = getStaticRecipeBySlug(id); // Usa o SLUG como chave
    }

    // Fallback final se nada for encontrado (nem API, nem Estático)
    const finalRecipe = recipe || {
        title: "Receita Não Encontrada",
        image_url: "/imagens/placeholder.jpeg",
        time: "N/A",
        ingredients: ["Receita não carregada. Tente voltar para a página de resultados."],
        steps: ["Verifique sua conexão e tente novamente."]
    };
    
    return (
        <div className="bg-white font-poppins min-h-screen">

            {/* Imagem de Fundo (HERO) */}
            <div
                className="w-full h-96 relative flex items-end"
                style={{
                    backgroundImage: `url(${finalRecipe.image_url})`, 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        {finalRecipe.title}
                    </h1>
                    <p className="text-lg text-gray-200">Tempo de Preparo: {finalRecipe.time}</p>
                </div>
            </div>
            
            <div className="w-full max-w-4xl mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row gap-12">
                    
                    {/* INGREDIENTES */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-2xl font-bold text-brand-light-black mb-4 border-b pb-2">
                            Ingredientes:
                        </h2>
                        <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                            {(finalRecipe.ingredients || []).map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* MODO DE PREPARO */}
                    <div className="w-full md:w-2/3">
                        <h2 className="text-2xl font-bold text-brand-light-black mb-4 border-b pb-2">
                            Modo de Preparo:
                        </h2>
                        <ol className="list-decimal pl-5 space-y-4 text-lg text-gray-700">
                            {(finalRecipe.steps || []).map((step, index) => (
                                <li key={index} className="pl-2">{step}</li>
                            ))}
                        </ol>

                        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-gray-700">
                             <h3 className="font-semibold mb-1">Informações Adicionais:</h3>
                             <p>
                                Nota: {recipe ? "Esta receita foi gerada pela Inteligência Artificial ou é um destaque estático." : "Esta é uma receita placeholder."}
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}