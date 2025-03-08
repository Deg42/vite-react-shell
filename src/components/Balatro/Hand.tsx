import React, { useState, useEffect } from 'react';
import Card from './Card';
import CardType from './types';

interface HandProps {
    sortBy: string;
    hand: CardType[]; // Recibir la mano como prop
    selectedCards: CardType[]; // Recibir las cartas seleccionadas
    onSelectCard: (card: CardType) => void; // Función para manejar la selección
}

const Hand: React.FC<HandProps> = ({ sortBy, hand, selectedCards, onSelectCard }) => {
    const [sortedHand, setSortedHand] = useState<CardType[]>([]);

    // Ordenar la mano cuando cambie `sortBy` o `hand`
    useEffect(() => {
        if (hand.length > 0) {
            const sorted = sortHand(hand, sortBy);
            setSortedHand(sorted);
        }
    }, [hand, sortBy]);

    // Función para ordenar la mano
    const sortHand = (hand: CardType[], sortBy: string) => {
        return [...hand].sort((a, b) => a.compare(b, sortBy)).reverse();
    };
    return (
        <div id='hand' className='justify-center flex flex-row gap-2'>
            {sortedHand.map((card, index) => (
                <Card
                key={index}
                suit={card.suit}
                rank={card.rank}
                canHighlight
                isSelected={selectedCards.includes(card)} // Resaltar si está seleccionada
                onClick={() => onSelectCard(card)} // Manejar clic en la carta
            />))}
        </div>
    )
};

export default Hand;