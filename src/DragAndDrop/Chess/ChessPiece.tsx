import React from "react";
import blackBishop from "../../assets/chess/black-bishop.svg";
import blackKing from "../../assets/chess/black-king.svg";
import blackKnight from "../../assets/chess/black-knight.svg";
import blackPawn from "../../assets/chess/black-pawn.svg";
import blackQueen from "../../assets/chess/black-queen.svg";
import blackRook from "../../assets/chess/black-rook.svg";
import whiteBishop from "../../assets/chess/white-bishop.svg";
import whiteKing from "../../assets/chess/white-king.svg";
import whiteKnight from "../../assets/chess/white-knight.svg";
import whitePawn from "../../assets/chess/white-pawn.svg";
import whiteQueen from "../../assets/chess/white-queen.svg";
import whiteRook from "../../assets/chess/white-rook.svg";

export interface ChessPieceType {
    type: 'pawn' | 'rook' | 'knight' | 'bishop' | 'queen' | 'king';
    color: 'white' | 'black';
    position: string;
}
const ChessPiece: React.FC<ChessPieceType> = ({ type, color, position }) => {
    const pieceComponents = {
        pawn: color === 'white' ? whitePawn : blackPawn,
        rook: color === 'white' ? whiteRook : blackRook,
        knight: color === 'white' ? whiteKnight : blackKnight,
        bishop: color === 'white' ? whiteBishop : blackBishop,
        queen: color === 'white' ? whiteQueen : blackQueen,
        king: color === 'white' ? whiteKing : blackKing,
    };
    const pieceIcon = pieceComponents[type];

    const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        event.dataTransfer.setData('id', (event.target as HTMLDivElement).id);
    }

    return <img
        id={type + "-" + color + "-" + position}
        src={pieceIcon}
        draggable="true"
        onDragStart={handleDragStart}
        className="size-16" />;
};

export default ChessPiece;
