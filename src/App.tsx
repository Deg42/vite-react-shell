import { Route, Routes } from 'react-router-dom';
import './App.css';
import APIPlatform from './components/ApiPlatform/ApiPlatform';
import Canvas from './components/Canvas/Canvas';
import Chess from './components/Chess/Chess';
import Dinosaurs from './components/Dinosaurs/Dinosaurs';
import Grid3X3 from './components/Grid3X3/Grid3X3';
import KanbanBoard from './components/Kanban/KanbanBoard';
import Home from './Home';
import Layout from './Layout';
import Roulette from './components/Roulette/Roulette';
import Balatro from './components/Balatro/Balatro';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Board" element={<KanbanBoard />} />
        <Route path="ApiPlatform" element={<APIPlatform />} />
        <Route path="Grid3X3" element={<Grid3X3 />} />
        <Route path="Chess" element={<Chess />} />
        <Route path="Dinosaurs" element={<Dinosaurs />} />
        <Route path="Canvas" element={<Canvas />} />
        <Route path="Balatro" element={<Balatro />} />
        <Route path="Roulette" element={<Roulette />} />
      </Route>
    </Routes>
  )
}