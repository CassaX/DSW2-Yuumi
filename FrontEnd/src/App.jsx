import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Ingredientes from "./pages/Ingredientes";
import Resultados from "./pages/Resultados";
import Receita from "./pages/Receita";
import HistoricoReceitas from "./pages/HistoricoReceitas";

export default function App() {
  return (
    <BrowserRouter>
      {/* Header é renderizado uma única vez aqui */}
      <Header /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredientes" element={<Ingredientes />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/receita/:id" element={<Receita />} /> 
        <Route path="/historico-receitas" element={<HistoricoReceitas />} />
      </Routes>
    </BrowserRouter>
  );
}