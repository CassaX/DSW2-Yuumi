// backend/services/geminiService.js

const { GoogleGenAI } = require('@google/genai');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY; 

// Inicializa o cliente Gemini
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
const MODEL = 'gemini-2.5-flash'; // Rápido e excelente para este tipo de tarefa

//Esquema JSON para garantir o formato da saída
const recipeSchema = {
    type: "object",
    properties: {
        title: { type: "string", description: "O título da receita." },
        time: { type: "string", description: "Tempo total de preparo (ex: 45 min)." },
        ingredients: {
            type: "array",
            description: "Lista de ingredientes, onde cada item é um ingrediente com sua quantidade.",
            items: { type: "string" }
        },
        steps: {
            type: "array",
            description: "Lista de passos de preparo.",
            items: { type: "string" }
        },
    },
    required: ["title", "time", "ingredients", "steps"]
};

const responseSchema = {
    type: "object",
    properties: {
        recipes: {
            type: "array",
            description: "Lista de receitas geradas, contendo sempre apenas um item.",
            items: recipeSchema,
        }
    },
    required: ["recipes"]
};


/**
 * Função Core que Gera o Conteúdo JSON usando Structured Output do Gemini
 * @param {string} promptText - O prompt de entrada para a geração da receita
 */
const generateRecipeContent = async (promptText) => {
    if (!GEMINI_API_KEY) {
        throw new Error("GEMINI_API_KEY não está configurada no .env.");
    }

    try {
        const response = await ai.models.generateContent({
            model: MODEL,
            contents: [
                {
                    role: "user",
                    parts: [{
                        text: promptText
                    }]
                }
            ],
            config: {
                systemInstruction: "Você é um Chef assistente experiente. Sua única função é gerar UMA receita em Português-BR. Você DEVE responder APENAS com um objeto JSON seguindo o esquema fornecido.",
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 0.7,
                maxOutputTokens: 2048,
            },
        });

        const jsonString = response.text.trim();
        
        const data = JSON.parse(jsonString);
        return data.recipes;

    } catch (error) {
        console.error("Erro na chamada da Gemini API:", error.message);
        throw new Error(`Falha na geração da receita pela Gemini API. Verifique a chave e os limites. Erro: ${error.message}`);
    }
};

exports.generateBySearch = async (query) => {
    const prompt = `Gere uma receita detalhada sobre: "${query}".`;
    return generateRecipeContent(prompt);
};

exports.generateByIngredients = async (ingredients) => {
    const prompt = `Gere uma receita rápida e simples que utilize APENAS estes ingredientes: ${ingredients.join(', ')}.`;
    return generateRecipeContent(prompt);
};