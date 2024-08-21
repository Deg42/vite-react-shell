import React, { useEffect, useRef } from 'react';

interface ImagePaletteProps {
  tileImageSrc: string;
  tileSize: number;
  tilesPerRow: number;
  tilesPerColumn: number;
  onSelectTile: (tile: { row: number; column: number }) => void;
}

const ImagePalette: React.FC<ImagePaletteProps> = ({
  tileImageSrc,
  tileSize,
  tilesPerRow,
  tilesPerColumn,
  onSelectTile
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
          context.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
          context.drawImage(image, 0, 0, canvas.width, canvas.height);
          
          // Dibuja la cuadrícula sobre la imagen
          context.beginPath();
          context.strokeStyle = 'black';
          context.lineWidth = 1;

          // Dibujar líneas horizontales
          for (let i = 0; i <= tilesPerColumn; i++) {
            context.moveTo(0, i * tileSize);
            context.lineTo(canvas.width, i * tileSize);
          }

          // Dibujar líneas verticales
          for (let i = 0; i <= tilesPerRow; i++) {
            context.moveTo(i * tileSize, 0);
            context.lineTo(i * tileSize, canvas.height);
          }

          context.stroke();
        };
      }
    }
  }, [tileImageSrc, tileSize, tilesPerRow, tilesPerColumn]);

  const handlePaletteClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const column = Math.floor(x / tileSize);
    const row = Math.floor(y / tileSize);

    onSelectTile({ row, column });
  };

  return (
    <>
      <canvas
        ref={canvasRef}
        width={tileSize * tilesPerRow}
        height={tileSize * tilesPerColumn}
        style={{ border: '1px solid black', cursor: 'pointer' }}
        onClick={handlePaletteClick}
      />
    </>
  );
};

export default ImagePalette;
