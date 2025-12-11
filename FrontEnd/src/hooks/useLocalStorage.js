import { useState, useEffect } from 'react';

/**
 * Hook customizado para armazenar e carregar estado no localStorage,
 * * @param {string} key A chave de armazenamento no localStorage.
 * @param {any} initialValue O valor inicial do estado, se não houver nada salvo.
 * @returns {[any, (value: any) => void]} O estado armazenado e a função para atualizá-lo.
 */
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Erro ao carregar do localStorage:", error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error("Erro ao salvar no localStorage:", error);
    }
  };

  return [storedValue, setValue];
}

export default useLocalStorage;