const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const model = "gemini-2.5-flash"; 

exports.generateRecipeContent = async (command) => {
    const singleRecipeSchema = {
        type: "object",
        properties: {
            title: { type: "string", description: "O título criativo da receita." },
            image_url: { type: "string", description: "Uma URL de imagem placeholder relevante (simulada)." },
            time: { type: "string", description: "Tempo total de preparo (ex: 45 min)." },

            ingredients: {
                type: "array",
                description: "Lista de ingredientes, onde cada item é um ingrediente com sua quantidade e unidade.",
                items: { type: "string" } // Ex: "2 xícaras de farinha", "100g de manteiga"
            },
            steps: {
                type: "array",
                description: "Lista de passos de preparo, onde cada item é uma instrução numerada.",
                items: { type: "string" } // Ex: "Pré-aqueça o forno a 180°C."
            },
            
        },
        required: ["title", "image_url", "time", "ingredients", "steps"]
    };

    // Esquema FINAL: um objeto contendo a lista (array) de receitas (continua o mesmo)
    const responseSchema = {
        type: "object",
        properties: {
            recipes: { 
                type: "array",
                description: "Uma lista de 3 receitas completas.",
                items: singleRecipeSchema
            }
        },
        required: ["recipes"]
    }

    const systemInstruction = `Você é um Chef assistente experiente. Sua única função é gerar receitas. O usuário fornecerá um comando. Você DEVE responder APENAS com um objeto JSON válido, seguindo o esquema fornecido.`;
    
    try {
        // PROMPT ALTERADO PARA PEDIR TRÊS RECEITAS
        const prompt = `Com base neste pedido: "${command}", gere TRÊS receitas completas, variadas e criativas.`;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema, // USANDO O NOVO ESQUEMA DE ARRAY
                temperature: 0.7,
            }
        });

        const jsonString = response.text.trim();
        // A IA agora retorna o objeto: { "recipes": [...] }
        return JSON.parse(jsonString); 

    } catch (error) {
        console.error("Erro na chamada da Gemini API (Geração):", error);
        throw new Error("Falha na geração da receita pela Inteligência Artificial.");
    }
};


exports.translateContent = async (text, targetLang) => {
    try {
        const prompt = `Traduza o seguinte texto para o idioma com o código: ${targetLang}. Mantenha a formatação do texto original, se aplicável. TEXTO A TRADUZIR: "${text}"`;

        const response = await ai.models.generateContent({
            model: model,
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                temperature: 0.1, 
            }
        });
        return response.text.trim();

    } catch (error) {
        console.error("Erro na chamada da Gemini API (Tradução):", error);
        throw new Error("Falha na tradução pela Inteligência Artificial.");
    }
};