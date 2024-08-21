import React, { useState } from 'react';
import GridCanvas from './GridCanvas';
import ImagePalette from './ImagePalette';

const Canvas: React.FC = () => {
  const [rows, setRows] = useState<number>(5);
  const [columns, setColumns] = useState<number>(5);
  const [selectedTile, setSelectedTile] = useState<{ row: number; column: number } | null>(null);
  const height = 500;

  const tileImageSrc = '/src/assets/tiles/tilemap_packed.png'; // Reemplaza con la ruta de tu mapa de tiles
  const tileSize = 32;  // Tamaño del tile en píxeles
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
      </div>
      <ImagePalette
        tileImageSrc={tileImageSrc}
        tileSize={tileSize}
        tilesPerRow={tilesPerRow}
        tilesPerColumn={tilesPerColumn}
        onSelectTile={setSelectedTile}
      />
      <GridCanvas
        rows={rows}
        columns={columns}
        height={height}
        tileImageSrc={tileImageSrc}
        tileSize={tileSize}
        selectedTile={selectedTile}
      />
    </div>
  );
};

export default Canvas;