const express = require('express');
const router = express.Router();
// 🎯 Altera a importação para o novo serviço Gemini
const { generateBySearch, generateByIngredients } = require('../services/geminiService'); 

// ... (O restante das rotas permanece o mesmo)

// 🤖 1. ENDPOINT: /api/search (Geração por Busca Geral)
router.post('/search', async (req, res) => {
    const { query } = req.body; 
    if (!query) {
        return res.status(400).json({ message: "O termo de busca (query) é obrigatório." });
    }
    try {
        // Chama a função de busca do Gemini
        const recipes = await generateBySearch(query);
        res.json({ recipes: recipes }); 
    } catch (error) {
        console.error("Erro na busca geral (Gemini):", error);
        res.status(500).json({ message: error.message || "Erro interno na API." });
    }
});


// 🧪 2. ENDPOINT: /api/ingredients (Geração por Ingredientes)
router.post('/ingredients', async (req, res) => {
    const { ingredients } = req.body; 
    if (!ingredients || ingredients.length === 0) {
        return res.status(400).json({ message: "É necessário fornecer ingredientes." });
    }
    try {
        // Chama a função de ingredientes do Gemini
        const recipes = await generateByIngredients(ingredients);
        res.json({ recipes: recipes });
    } catch (error) {
        console.error("Erro na busca por ingredientes (Gemini):", error);
        res.status(500).json({ message: error.message || "Erro interno na API." });
    }
});



module.exports = router;