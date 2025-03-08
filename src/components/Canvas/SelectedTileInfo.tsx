import React, { useEffect, useRef } from 'react';

interface SelectedTileInfoProps {
  selectedTile: { row: number; column: number } | null;
  tileImageSrc: string;
  tileSize: number; // Tamaño de cada tile en píxeles originales
  scaleFactor: number
}

const SelectedTileInfo: React.FC<SelectedTileInfoProps> = ({ selectedTile, tileImageSrc, tileSize, scaleFactor }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scaledTileSize = tileSize * scaleFactor;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !selectedTile) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Limpia el canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;


    // Configura la imagen del tilemap
    const image = new Image();
    image.src = tileImageSrc;

    image.onload = () => {
      const { row, column } = selectedTile;

      // Coordenadas de origen en el tilemap
      const sourceX = column * tileSize;
      const sourceY = row * tileSize;
      


      // Dibujar únicamente el tile seleccionado en todo el canvas
      context.drawImage(
        image,
        sourceX,
        sourceY,
        tileSize,
        tileSize,
        0,
        0,
        scaledTileSize,
        scaledTileSize
      );
    };
  }, [selectedTile, tileImageSrc, tileSize]);

  if (!selectedTile) {
    return <div>No tile selected</div>;
  }

  return (
    <div>
      <h3>Selected Tile</h3>
      <canvas
  ref={canvasRef}
  width={scaledTileSize}
  height={scaledTileSize}
  style={{ border: '1px solid black' }}
/>
    </div>
  );
};

export default SelectedTileInfo;
