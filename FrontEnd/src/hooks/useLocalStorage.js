// Arquivo: frontend/src/hooks/useLocalStorage.js

import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
    
    // 1. Obtém o valor inicial.
    // Usar uma função (callback) garante que esta lógica só rode na inicialização.
    const [storedValue, setStoredValue] = useState(() => {
        try {
            // Tenta ler o item do navegador
            const item = window.localStorage.getItem(key);
            
            // 🚨 Ponto Crítico 1: Se o item existir, retorna o objeto JSON desserializado.
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Erro ao ler localStorage:", error);
            // Se houver erro (JSON inválido, etc.), retorna o valor inicial (ex: [])
            return initialValue;
        }
    });

    // 2. Define a função que atualiza o estado e o localStorage.
    const setValue = (value) => {
        try {
            // Se o 'value' for uma função (como `prev => [...novos, ...prev]`),
            // executa essa função para obter o novo valor.
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;

            // Atualiza o estado do React
            setStoredValue(valueToStore);
            
            // 🚨 Ponto Crítico 2: Salva no localStorage como string JSON.
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Erro ao salvar no localStorage:", error);
        }
    };

    // Note: O useEffect não é estritamente necessário se o useState for um callback,
    // mas não fará mal se estiver presente.

    return [storedValue, setValue];
}

export default useLocalStorage;