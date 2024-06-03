import React, { useState } from 'react';
import ChessPiece, { ChessPieceType } from "./ChessPiece";

const Chess = () => {
    const col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const row = ['8', '7', '6', '5', '4', '3', '2', '1'];

    const initialBoard: { [key: string]: ChessPieceType } = {
        'h8': { type: 'rook', color: 'black', position: 'h8' }, 'g8': { type: 'knight', color: 'black', position: 'g8' }, 'f8': { type: 'bishop', color: 'black', position: 'f8' }, 'e8': { type: 'queen', color: 'black', position: 'e8' }, 'd8': { type: 'king', color: 'black', position: 'd8' }, 'c8': { type: 'bishop', color: 'black', position: 'c8' }, 'b8': { type: 'knight', color: 'black', position: 'b8' }, 'a8': { type: 'rook', color: 'black', position: 'a8' },
        'h7': { type: 'pawn', color: 'black', position: 'h7' }, 'g7': { type: 'pawn', color: 'black', position: 'g7' }, 'f7': { type: 'pawn', color: 'black', position: 'f7' }, 'e7': { type: 'pawn', color: 'black', position: 'e7' }, 'd7': { type: 'pawn', color: 'black', position: 'd7' }, 'c7': { type: 'pawn', color: 'black', position: 'c7' }, 'b7': { type: 'pawn', color: 'black', position: 'b7' }, 'a7': { type: 'pawn', color: 'black', position: 'a7' },
        'h2': { type: 'pawn', color: 'white', position: 'h2' }, 'g2': { type: 'pawn', color: 'white', position: 'g2' }, 'f2': { type: 'pawn', color: 'white', position: 'f2' }, 'e2': { type: 'pawn', color: 'white', position: 'e2' }, 'd2': { type: 'pawn', color: 'white', position: 'd2' }, 'c2': { type: 'pawn', color: 'white', position: 'c2' }, 'b2': { type: 'pawn', color: 'white', position: 'b2' }, 'a2': { type: 'pawn', color: 'white', position: 'a2' },
        'h1': { type: 'rook', color: 'white', position: 'h1' }, 'g1': { type: 'knight', color: 'white', position: 'g1' }, 'f1': { type: 'bishop', color: 'white', position: 'f1' }, 'e1': { type: 'queen', color: 'white', position: 'e1' }, 'd1': { type: 'king', color: 'white', position: 'd1' }, 'c1': { type: 'bishop', color: 'white', position: 'c1' }, 'b1': { type: 'knight', color: 'white', position: 'b1' }, 'a1': { type: 'rook', color: 'white', position: 'a1' }
    };

    const [board, setBoard] = useState<{ [key: string]: ChessPieceType }>(initialBoard);
    const [capturedPieces, setCapturedPieces] = useState<{ [color: string]: ChessPieceType[] }>({ white: [], black: [] });

    const getPiece = (position: string) => {
        const piece = board[position];
        return piece ? <ChessPiece key={piece.position} type={piece.type} color={piece.color} position={piece.position} /> : null;
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('id');
        const targetSquare = event.currentTarget as HTMLDivElement;
        const targetSquareId = targetSquare.id.replace('square_', '');

        if (draggedElementId && targetSquare) {
            const [, pieceType, pieceColor, originalPosition] = draggedElementId.split('-');

            // Actualizar el estado del tablero para reflejar la nueva posición de la pieza arrastrada
            const newBoard = { ...board };
            const newCapturedPieces = { ...capturedPieces };

            // Movimiento en el tablero o captura de una pieza
            const capturedPiece = newBoard[targetSquareId];

            // Evitar capturar una pieza del mismo color
            if (capturedPiece && capturedPiece.color === pieceColor) {
                return;
            }

            if (capturedPiece) {
                // Pieza capturada
                newCapturedPieces[capturedPiece.color] = [...newCapturedPieces[capturedPiece.color], capturedPiece];
            }

            delete newBoard[originalPosition];
            newBoard[targetSquareId] = { type: pieceType as ChessPieceType['type'], color: pieceColor as ChessPieceType['color'], position: targetSquareId };

            // Actualizar el estado del tablero y las piezas capturadas
            setCapturedPieces(newCapturedPieces);
            setBoard(newBoard);
        }
    };

    return (
        <main className="flex flex-col-2 items-center gap-10 mt-20">
            <section className="grid grid-cols-8 gap-px p-6 bg-red-950">
                {row.map((r, rowIndex) => (
                    col.map((c, colIndex) => {
                        const position = `${c}${r}`;
                        const isEven = (colIndex + rowIndex) % 2 === 0;
                        const piece = getPiece(position);

                        return (<div
                            id={"square_" + position}
                            className={`${isEven ? 'bg-amber-100' : 'bg-yellow-950'} text-stone-950 w-20 h-20 flex items-center justify-center`}
                            key={position}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}>
                            {piece}
                        </div>)
                    })
                ))}
            </section>
            <section className='captured grid grid-cols-6 grid-rows-6 bg-blue-100 h-72 w-72'>
                {Object.entries(capturedPieces).flatMap(([color, pieces]) => (
                    pieces.map((piece, index) => (
                        <ChessPiece
                            key={`captured-${color}-${index}`}
                            type={piece.type}
                            color={piece.color}
                            position={`captured-${color}-${index}`}
                            size="size-12"
                        />
                    ))
                ))}
            </section>
        </main>
    );
}

export default Chess;

