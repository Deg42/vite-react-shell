import React from 'react';
import CardType from './types';
import Card from './Card';

interface TableProps {
    cards: CardType[];
}

const Table: React.FC<TableProps> = ({ cards }) => {
    return (
        <div id='table' className='justify-center flex flex-row gap-2'>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    suit={card.suit}
                    rank={card.rank}
                />
            ))}
        </div>
    )
};

export default Table;