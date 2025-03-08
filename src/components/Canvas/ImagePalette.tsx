import React, { useEffect, useRef } from 'react';

interface ImagePaletteProps {
  tileImageSrc: string;
  tilesPerRow: number;
  tilesPerColumn: number;
  scaleFactor: number;
  onSelectTile: (tile: { row: number; column: number }) => void;
}

const ImagePalette: React.FC<ImagePaletteProps> = ({
  tileImageSrc,
  tilesPerRow,
  tilesPerColumn,
  scaleFactor,
  onSelectTile,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const image = new Image();
        image.src = tileImageSrc;
        image.onload = () => {
          const originalTileWidth = image.width / tilesPerRow;
          const originalTileHeight = image.height / tilesPerColumn;

          const scaledWidth = image.width * scaleFactor;
          const scaledHeight = image.height * scaleFactor;
          const scaledTileWidth = originalTileWidth * scaleFactor;
          const scaledTileHeight = originalTileHeight * scaleFactor;

          // Ajustar el tamaño del canvas
          canvas.width = scaledWidth;
          canvas.height = scaledHeight;

          // Desactivar el suavizado de imágenes
          context.imageSmoothingEnabled = false;

          // Dibujar la imagen escalada
          context.clearRect(0, 0, canvas.width, canvas.height);
          context.drawImage(image, 0, 0, scaledWidth, scaledHeight);

          // Dibujar la cuadrícula escalada
          context.beginPath();
          context.strokeStyle = 'black';
          context.lineWidth = 1;

          for (let i = 0; i <= tilesPerColumn; i++) {
            context.moveTo(0, i * scaledTileHeight);
            context.lineTo(scaledWidth, i * scaledTileHeight);
          }

          for (let i = 0; i <= tilesPerRow; i++) {
            context.moveTo(i * scaledTileWidth, 0);
            context.lineTo(i * scaledTileWidth, scaledHeight);
          }

          context.stroke();
        };
      }
    }
  }, [tileImageSrc, tilesPerRow, tilesPerColumn, scaleFactor]);

  const handlePaletteClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const scaledTileWidth = (canvas.width / tilesPerRow);
      const scaledTileHeight = (canvas.height / tilesPerColumn);

      const column = Math.floor(x / scaledTileWidth);
      const row = Math.floor(y / scaledTileHeight);

      console.log(`Selected Tile: Row ${row}, Column ${column}`);
      onSelectTile({ row, column });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      style={{ border: '1px solid black', cursor: 'pointer' }}
      onClick={handlePaletteClick}
    />
  );
};

export default ImagePalette;