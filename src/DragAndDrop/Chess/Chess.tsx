// import { Button } from 'flowbite-react';
// import { HiRefresh } from 'react-icons/hi';

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

    const getPiece = (position: string) => {
        const piece = initialBoard[position];
        return piece ? <ChessPiece type={piece.type} color={piece.color} position={position} /> : null;
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    }

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const draggedElementId = event.dataTransfer.getData('id');
        (event.target as HTMLDivElement).appendChild(document.getElementById(draggedElementId)!);
    };

    return (
        <main className="flex flex-col items-center mt-20">
            <section className="grid grid-cols-8 gap-px p-6 bg-red-950">
                {row.map((r, rowIndex) => (
                    col.map((c, colIndex) => {
                        const position = `${c}${r}`;
                        const isEven = (colIndex + rowIndex) % 2 === 0;
                        const piece = getPiece(position);

                        return (<div
                            id={position}
                            className={`${isEven ? 'bg-amber-100' : 'bg-yellow-950'} text-stone-950 w-20 h-20 flex items-center justify-center`}
                            key={position}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}>
                            {piece}
                        </div>)
                    })
                ))}
            </section>
            {/* <Button gradientMonochrome="cyan" className="mt-3" onClick={resetState}>Reset <HiRefresh className="ml-2 h-5 w-5" /></Button> */}
        </main>
    );
}

export default Chess;