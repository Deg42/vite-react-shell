import { Route, Routes } from 'react-router-dom';
import './App.css';
import Chess from './components/DragAndDrop/Chess/Chess';
import Grid3X3 from './components/DragAndDrop/Grid3X3/Grid3X3';
import KanbanBoard from './components/Kanban/KanbanBoard';
import Home from './Home';
import Layout from './Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Board" element={<KanbanBoard />} />
        <Route path="Grid3X3" element={<Grid3X3 />} />
        <Route path="Chess" element={<Chess />} />
      </Route>
    </Routes>
  )
}