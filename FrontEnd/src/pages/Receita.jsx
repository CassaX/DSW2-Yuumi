import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from "react-router-dom";
import { translateText } from "../services/translationService"; // R6: Importe o serviço de tradução

// Configuração de idiomas disponíveis para o R6
const LANGUAGES = {
    PT: 'PT',
    EN: 'EN',
    ES: 'ES'
};

export default function Receita() {
    const { id } = useParams(); 
    const location = useLocation(); 
    
    // Define uma receita fallback para caso os dados não sejam encontrados
    const defaultRecipe = {
        title: "Receita Não Encontrada",
        image_url: "https://via.placeholder.com/1740x800?text=Receita+Nao+Encontrada",
        time: "N/A",
        ingredients: ["Receita não carregada. Tente voltar para a página de resultados."],
        steps: ["Verifique sua conexão e tente novamente."]
    };

    // Receita original (vindo do Home ou Resultados)
    const originalRecipe = location.state?.recipe || defaultRecipe;

    // Estados para a tradução (R6)
    const [currentLang, setCurrentLang] = useState('PT');
    const [translatedRecipe, setTranslatedRecipe] = useState(originalRecipe);
    const [isTranslating, setIsTranslating] = useState(false);

    // 💡 R6: Efeito para traduzir o conteúdo da receita
    useEffect(() => {
        // Se já está em Português, não traduz
        if (currentLang === 'PT') {
            setTranslatedRecipe(originalRecipe);
            return;
        }

        const fetchTranslation = async () => {
            setIsTranslating(true);
            try {
                // Concatena todos os textos que precisam de tradução em um único array
                const textsToTranslate = [
                    originalRecipe.title, 
                    originalRecipe.time,
                    ...originalRecipe.ingredients, // Traduz todos os ingredientes
                    ...originalRecipe.steps // Traduz todos os passos
                ];
                
                // Dispara a tradução de todos os itens de uma vez (Promise.all)
                const translated = await Promise.all(textsToTranslate.map(text => 
                    translateText(text, currentLang)
                ));

                // Reconstroi o objeto traduzido a partir dos resultados
                const translatedTitle = translated[0];
                const translatedTime = translated[1];
                const translatedIngredients = translated.slice(2, 2 + originalRecipe.ingredients.length);
                const translatedSteps = translated.slice(2 + originalRecipe.ingredients.length);

                setTranslatedRecipe({
                    ...originalRecipe,
                    title: translatedTitle,
                    time: translatedTime,
                    ingredients: translatedIngredients,
                    steps: translatedSteps
                });

            } catch (error) {
                console.error("Erro na tradução da receita:", error);
                // Em caso de falha, reverte para o idioma original
                setTranslatedRecipe(originalRecipe);
            } finally {
                setIsTranslating(false);
            }
        };

        fetchTranslation();

    }, [currentLang, originalRecipe]); 


    return (
        <div className="bg-white font-poppins min-h-screen">

            {/* Imagem de Fundo (HERO) */}
            <div
                className="w-full h-96 relative flex items-end"
                style={{
                    // Usa a imagem da receita da IA (R5)
                    backgroundImage: `url(${translatedRecipe.image_url})`, 
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                <div className="absolute inset-0 bg-black/60"></div>
                <div className="relative z-10 w-full max-w-4xl mx-auto px-6 py-6">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
                        {translatedRecipe.title}
                    </h1>
                    <p className="text-lg text-gray-200">Tempo de Preparo: {translatedRecipe.time}</p>
                </div>
            </div>

            <div className="w-full max-w-4xl mx-auto px-6 py-12">
                
                {/* 🌍 Seletor de Idioma (R6) */}
                <div className="flex justify-between items-center mb-8">
                    <span className="text-sm text-gray-600">
                        {isTranslating ? 'Traduzindo...' : `Idioma Atual: ${currentLang}`}
                    </span>
                    <select
                        value={currentLang}
                        onChange={(e) => setCurrentLang(e.target.value)}
                        className="p-2 border rounded-lg shadow-sm"
                        disabled={isTranslating}
                    >
                        {Object.keys(LANGUAGES).map((code) => (
                            <option key={code} value={code}>{code}</option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col md:flex-row gap-12">
                    
                    {/* INGREDIENTES (1/3 da Largura) */}
                    <div className="w-full md:w-1/3">
                        <h2 className="text-2xl font-bold text-brand-light-black mb-4 border-b pb-2">
                            Ingredientes:
                        </h2>
                        
                        {/* 💡 RENDERIZAÇÃO SEGURA: Usa o array 'ingredients' do JSON (R5) */}
                        <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                            {translatedRecipe.ingredients.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* MODO DE PREPARO (2/3 da Largura) */}
                    <div className="w-full md:w-2/3">
                        <h2 className="text-2xl font-bold text-brand-light-black mb-4 border-b pb-2">
                            Modo de Preparo:
                        </h2>
                        
                        {/* 💡 RENDERIZAÇÃO SEGURA: Usa o array 'steps' do JSON (R5) */}
                        <ol className="list-decimal pl-5 space-y-4 text-lg text-gray-700">
                            {translatedRecipe.steps.map((step, index) => (
                                <li key={index} className="pl-2">{step}</li>
                            ))}
                        </ol>

                        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-gray-700">
                             <h3 className="font-semibold mb-1">Informações Adicionais:</h3>
                             <p>
                                Nota: Esta receita foi gerada pela Inteligência Artificial.
                             </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}