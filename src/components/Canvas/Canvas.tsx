import React, { useState } from 'react';
import GridCanvas from './GridCanvas';
import ImagePalette from './ImagePalette';
import SelectedTileInfo from './SelectedTileInfo';

const Canvas: React.FC = () => {
  const [rows, setRows] = useState<number>(10);
  const [columns, setColumns] = useState<number>(10);
  const [scaleFactor, setScaleFactor] = useState<number>(2);
  const [selectedTile, setSelectedTile] = useState<{ row: number; column: number } | null>(null);
  const [canvasSize, setCanvasSize] = useState<number>(300);

  const tileImageSrc = '/src/assets/tiles/tilemap_packed.png'; // Reemplaza con la ruta de tu mapa de tiles
  const tileSize = 16;  // Tamaño del tile en píxeles
  const tilesPerRow = 18;  // Número de tiles por fila en la paleta
  const tilesPerColumn = 11;  // Número de tiles por columna en la paleta

  return (
    <div>
      <div className="mb-2">
        <label>
          Rows:
          <input
            className="text-neutral-950"
            type="number"
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Columns:
          <input
            className="text-neutral-950"
            type="number"
            value={columns}
            onChange={(e) => setColumns(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Scale:
          <input
            className="text-neutral-950"
            type="number"
            value={scaleFactor}
            onChange={(e) => setScaleFactor(parseInt(e.target.value, 10))}
          />
        </label>
        <label>
          Canvas Size:
          <input
            className="text-neutral-950"
            type="number"
            value={canvasSize}
            onChange={(e) => setCanvasSize(parseInt(e.target.value, 10))}
          />
        </label>
      </div>
      <SelectedTileInfo
          selectedTile={selectedTile}
          tileImageSrc={tileImageSrc}
          tileSize={tileSize}
          scaleFactor= {scaleFactor}
        />
      <ImagePalette
        tileImageSrc={tileImageSrc}
        tilesPerRow={tilesPerRow}
        tilesPerColumn={tilesPerColumn}
        onSelectTile={setSelectedTile}
        scaleFactor={scaleFactor}
      />
      <GridCanvas
        rows={rows}
        columns={columns}
        size={canvasSize}
        tileImageSrc={tileImageSrc}
        tileSize={tileSize}
        selectedTile={selectedTile}
      />
    </div>
  );
};

export default Canvas;