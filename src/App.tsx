import { Route, Routes } from 'react-router-dom';
import './App.css';
import Grid3X3 from './DragAndDrop/Grid3X3/Grid3X3';
import Home from './Home';
import Layout from './Layout';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Grid3X3" element={<Grid3X3 />} />
      </Route>
    </Routes>
  )
}