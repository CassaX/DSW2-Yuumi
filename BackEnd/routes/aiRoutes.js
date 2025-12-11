const express = require('express');
const router = express.Router();
const { generateRecipeContent, translateContent } = require('../services/geminiService'); 

// 🤖 1. ENDPOINT: /api/search (Geração por Busca Geral)
router.post('/search', async (req, res) => {
    const { query } = req.body; 

    if (!query) {
        return res.status(400).json({ message: "O termo de busca (query) é obrigatório." });
    }

    try {
        // Comando para a IA: Gere 3 receitas com base na busca
        const command = `Gere TRÊS receitas sobre o tema: ${query}.`;

        const recipeData = await generateRecipeContent(command);
        res.json(recipeData); 

    } catch (error) {
        console.error("Erro na busca geral:", error);
        res.status(500).json({ message: error.message || "Erro interno na IA." });
    }
});


// 🧪 2. ENDPOINT: /api/ingredients (Geração por Ingredientes)
router.post('/ingredients', async (req, res) => {
    const { ingredients } = req.body; // Espera um array de ingredientes

    if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ message: "É necessário fornecer ingredientes." });
    }

    try {
        // Comando para a IA: Gere 3 receitas utilizando a lista de ingredientes
        const command = `Gere TRÊS receitas utilizando EXCLUSIVAMENTE estes ingredientes: ${ingredients.join(', ')}.`;

        const recipeData = await generateRecipeContent(command);
        res.json(recipeData); 

    } catch (error) {
        console.error("Erro na busca por ingredientes:", error);
        res.status(500).json({ message: error.message || "Erro interno na IA." });
    }
});


// 🌍 3. ENDPOINT: /api/translate (Tradução - R6/R5)
router.post('/translate', async (req, res) => {
    // ... (código da rota de tradução permanece o mesmo) ...
    const { text, targetLang } = req.body; 

    if (!text || !targetLang) {
        return res.status(400).json({ message: "Texto e idioma de destino são obrigatórios." });
    }

    try {
        const translatedText = await translateContent(text, targetLang);
        res.json({ translatedText }); 

    } catch (error) {
        console.error("Erro na rota de tradução:", error);
        res.status(500).json({ message: error.message || "Erro interno na tradução." });
    }
});


module.exports = router;