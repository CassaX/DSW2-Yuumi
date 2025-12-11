const fetchRecipes = async (data, endpoint) => {
    try {
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(`Erro: ${response.status} - ${errorBody.message || response.statusText}`);
        }

        const result = await response.json(); 
        return result.recipes; // Retorna apenas o array de receitas
        
    } catch (error) {
        console.error("Falha na chamada da IA:", error);
        return []; // Retorna um array vazio em caso de falha
    }
};

/**
 * 1. Geração de Receita por Busca Geral (R5)
 * @param {string} query O termo de busca do usuário (ex: "bolo de fubá cremoso").
 */
export const searchRecipe = (query) => {
    return fetchRecipes({ query: query }, '/api/search');
};

/**
 * 2. Geração de Receita por Ingredientes (R5)
 * @param {string[]} ingredients O array de ingredientes disponíveis.
 */
export const generateByIngredients = (ingredients) => {
    return fetchRecipes({ ingredients: ingredients }, '/api/ingredients');
};