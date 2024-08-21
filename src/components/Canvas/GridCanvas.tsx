import React, { useEffect, useRef, useState } from 'react';

interface GridCanvasProps {
  rows: number;
  columns: number;
  height: number;
  tileImageSrc: string;
  tileSize: number;
  selectedTile: { row: number; column: number } | null;
}

interface Cell {
  row: number;
  column: number;
  tileRow: number;
  tileColumn: number;
}

const GridCanvas: React.FC<GridCanvasProps> = ({ rows, columns, height, tileImageSrc, tileSize, selectedTile }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cellImages, setCellImages] = useState<Cell[]>([]);

  const cellSize = height / rows;
  const width = columns * cellSize;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        // Limpia el canvas
        context.clearRect(0, 0, width, height);

        // Rellenar el fondo del canvas
        context.fillStyle = 'white';
        context.fillRect(0, 0, width, height);

        // Dibujar las líneas de la cuadrícula
        context.beginPath();
        for (let i = 0; i <= rows; i++) {
          context.moveTo(0, i * cellSize);
          context.lineTo(width, i * cellSize);
        }
        for (let i = 0; i <= columns; i++) {
          context.moveTo(i * cellSize, 0);
          context.lineTo(i * cellSize, height);
        }
        context.strokeStyle = 'black';
        context.stroke();

        // Cargar y dibujar la imagen de tiles
        const tileImage = new Image();
        tileImage.src = tileImageSrc;
        tileImage.onload = () => {
          cellImages.forEach(cell => {
            const sourceX = cell.tileColumn * tileSize;
            const sourceY = cell.tileRow * tileSize;

            context.drawImage(
              tileImage,
              sourceX, sourceY, tileSize, tileSize,  // Origen del tile
              cell.column * cellSize, cell.row * cellSize, cellSize, cellSize // Destino en el canvas
            );
          });
        };
      }
    }
  }, [rows, columns, width, height, cellSize, cellImages, tileImageSrc, tileSize]);

  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTile) return;

    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const row = Math.floor(y / cellSize);
      const column = Math.floor(x / cellSize);

      setCellImages(prevCellImages => {
        const existingCellIndex = prevCellImages.findIndex(cell => cell.row === row && cell.column === column);

        const newCell: Cell = {
          row,
          column,
          tileRow: selectedTile.row,
          tileColumn: selectedTile.column,
        };

        if (existingCellIndex >= 0) {
          // Actualizar la celda existente
          const updatedCellImages = [...prevCellImages];
          updatedCellImages[existingCellIndex] = newCell;
          return updatedCellImages;
        } else {
          // Añadir una nueva celda
          return [...prevCellImages, newCell];
        }
      });
    }
  };

  return <canvas ref={canvasRef} width={width} height={height} onClick={handleCanvasClick} />;
};

export default GridCanvas;
