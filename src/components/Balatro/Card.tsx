import React from 'react'


interface CardProps {
    suit: string;
    rank: string;
    canHighlight?: boolean;
    isSelected?: boolean;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ suit, rank, canHighlight, isSelected, onClick }) => {

    return (
        <div
            className={`card ${rank} ${suit}${canHighlight && isSelected ? ' highlight' : ''} `} onClick={onClick}
        >
        </div>
    )
};

export default Card;