import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { HiRefresh } from 'react-icons/hi';
import './Chess.css';
import ChessPiece, { ChessPieceType } from './ChessPiece';

const Chess: React.FC = () => {
    const col = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const row = ['8', '7', '6', '5', '4', '3', '2', '1'];

    const initialBoard: { [key: string]: ChessPieceType } = {
        'h8': { type: 'rook', color: 'black', position: 'h8' }, 'g8': { type: 'knight', color: 'black', position: 'g8' }, 'f8': { type: 'bishop', color: 'black', position: 'f8' }, 'e8': { type: 'queen', color: 'black', position: 'e8' }, 'd8': { type: 'king', color: 'black', position: 'd8' }, 'c8': { type: 'bishop', color: 'black', position: 'c8' }, 'b8': { type: 'knight', color: 'black', position: 'b8' }, 'a8': { type: 'rook', color: 'black', position: 'a8' },
        'h7': { type: 'pawn', color: 'black', position: 'h7' }, 'g7': { type: 'pawn', color: 'black', position: 'g7' }, 'f7': { type: 'pawn', color: 'black', position: 'f7' }, 'e7': { type: 'pawn', color: 'black', position: 'e7' }, 'd7': { type: 'pawn', color: 'black', position: 'd7' }, 'c7': { type: 'pawn', color: 'black', position: 'c7' }, 'b7': { type: 'pawn', color: 'black', position: 'b7' }, 'a7': { type: 'pawn', color: 'black', position: 'a7' },
        'h2': { type: 'pawn', color: 'white', position: 'h2' }, 'g2': { type: 'pawn', color: 'white', position: 'g2' }, 'f2': { type: 'pawn', color: 'white', position: 'f2' }, 'e2': { type: 'pawn', color: 'white', position: 'e2' }, 'd2': { type: 'pawn', color: 'white', position: 'd2' }, 'c2': { type: 'pawn', color: 'white', position: 'c2' }, 'b2': { type: 'pawn', color: 'white', position: 'b2' }, 'a2': { type: 'pawn', color: 'white', position: 'a2' },
        'h1': { type: 'rook', color: 'white', position: 'h1' }, 'g1': { type: 'knight', color: 'white', position: 'g1' }, 'f1': { type: 'bishop', color: 'white', position: 'f1' }, 'e1': { type: 'queen', color: 'white', position: 'e1' }, 'd1': { type: 'king', color: 'white', position: 'd1' }, 'c1': { type: 'bishop', color: 'white', position: 'c1' }, 'b1': { type: 'knight', color: 'white', position: 'b1' }, 'a1': { type: 'rook', color: 'white', position: 'a1' }
    };

    const [board, setBoard] = useState<{ [key: string]: ChessPieceType }>(initialBoard);
    const [capturedPieces, setCapturedPieces] = useState<{ [color in 'white' | 'black']: ChessPieceType[] }>({ white: [], black: [] });

    const getPiece = (position: string) => {
        const piece = board[position];
        return piece ? <ChessPiece key={piece.position} type={piece.type} color={piece.color} position={piece.position} size="w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20"/> : null;
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('id');
        const targetSquare = event.currentTarget as HTMLDivElement;
        const targetSquareId = targetSquare.id.replace('square_', '');
    
        if (draggedElementId && targetSquare) {
            const [, pieceType, pieceColor, originalPosition] = draggedElementId.split('-');
    
            // Update the board status to reflect the new position of the dragged piece
            console.log(board);
            
            const newBoard = { ...board };
            const newCapturedPieces = { ...capturedPieces };
    
            // Moving or capturing a piece
            const targetPiece = newBoard[targetSquareId];
    
            // Allow piece capture and move only if target square is empty or captures enemy piece
            if (!targetPiece || targetPiece.color !== pieceColor) {
                if (targetPiece) {
                    // Capture the enemy piece
                    newCapturedPieces[targetPiece.color].push(targetPiece);
                }
    
                if (originalPosition.startsWith('captured')) {
                    // Move piece from the capture area to the board
                    const color = pieceColor as 'black' | 'white';
                    const index = parseInt(originalPosition.split('-')[2]);
    
                    // Remove the piece from the capture area
                    const pieceToMove = newCapturedPieces[color].splice(index, 1)[0];
                    newBoard[targetSquareId] = { ...pieceToMove, position: targetSquareId };
                } else {
                    // Move piece within the board
                    newBoard[targetSquareId] = { type: pieceType as ChessPieceType['type'], color: pieceColor as ChessPieceType['color'], position: targetSquareId };
                    delete newBoard[originalPosition];
                }
    
                // Update board state and captured pieces
                setCapturedPieces(newCapturedPieces);
                setBoard(newBoard);
            }
        }
    };
    
    const handleReset = () => {
        setBoard(initialBoard);
        setCapturedPieces({ white: [], black: [] });
    }

    return (
        <main className="flex flex-col lg:flex-row flex-col-2 items-center gap-10 mt-20 ">
            <section className="chess grid grid-cols-8 gap-px p-6">
                {row.map((r, rowIndex) => (
                    col.map((c, colIndex) => {
                        const position = `${c}${r}`;
                        const isEven = (colIndex + rowIndex) % 2 === 0;
                        const piece = getPiece(position);

                        return (<div
                            id={"square_" + position}
                            className={`square ${isEven ? 'even' : 'odd'} w-8 h-8 md:w-12 md:h-12 lg:w-20 lg:h-20 flex items-center justify-center`}
                            key={position}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}>
                            {piece}
                        </div>)
                    })
                ))}
            </section>
            <section className='captured grid grid-cols-6 grid-rows-6 h-72 w-72'>
                {['white', 'black'].flatMap(color => (
                    capturedPieces[color as 'white' | 'black'].map((piece, index) => (
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
            <Button gradientMonochrome="cyan" className="mt-3" onClick={handleReset}>Reset <HiRefresh className="ml-2 h-5 w-5" /></Button>
        </main>
    );
};

export default Chess;
