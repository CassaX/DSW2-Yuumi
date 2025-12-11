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
        // Retorna apenas o array de receitas
        return result.recipes; 
        
    } catch (error) {
        console.error("Falha na chamada da IA:", error);
        return []; 
    }
};


export const generateBySearch = (query) => {
    return fetchRecipes({ query: query }, '/api/search');
};


export const generateByIngredients = (ingredients) => {
    return fetchRecipes({ ingredients: ingredients }, '/api/ingredients');
};