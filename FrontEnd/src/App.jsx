import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Ingredientes from "./pages/Ingredientes";
import Resultados from "./pages/Resultados";
import Receita from "./pages/Receita";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ingredientes" element={<Ingredientes />} />
        <Route path="/resultados" element={<Resultados />} />
        <Route path="/receita/:id" element={<Receita />} />
      </Routes>
    </BrowserRouter>
  );
}
