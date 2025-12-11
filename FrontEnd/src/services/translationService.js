export const translateText = async (text, targetLang) => {
    const BACKEND_URL = '/api/translate'; 

    try {
        const response = await fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                text: text,
                targetLang: targetLang.toUpperCase()
            })
        });

        if (!response.ok) {
            const errorBody = await response.json().catch(() => ({}));
            throw new Error(`Erro na tradução: ${response.status} - ${errorBody.message || response.statusText}`);
        }

        const data = await response.json();
        return data.translatedText;

    } catch (error) {
        console.error("Falha ao traduzir texto (R6):", error);
        return text; 
    }
};