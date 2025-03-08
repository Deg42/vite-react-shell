import React, { useEffect, useState } from 'react';
import Hand from './Hand';
import './Balatro.css';
import { Button, Navbar } from 'flowbite-react';
import Deck from './Deck';
import DeckService from './service/balatroService';
import CardType from './types';
import Table from './Table';

const Balatro: React.FC = () => {
    const [sortBy, setSortBy] = useState<string>('rank');
    const [reloadState, setReloadState] = useState<number>(0);
    const [deck, setDeck] = useState<CardType[]>([]);
    const [hand, setHand] = useState<CardType[]>([]);
    const [table, setTable] = useState<CardType[]>([]); // Nuevo estado para la mesa
    const [selectedCards, setSelectedCards] = useState<CardType[]>([]); // Estado para cartas seleccionadas



    // Generar el mazo al montar el componente
    useEffect(() => {
        const newDeck = DeckService.generateDeck();
        setDeck(newDeck);
    }, []);

    // Función para robar cartas del mazo y agregarlas a la mano
    const handleReloadHand = () => {
        try {
            // discard first
            DeckService.resetHand();
            DeckService.drawCards();
            setDeck(DeckService.getDeck());
            setHand(DeckService.getHand());
            setReloadState(reloadState + 1);
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message); // Acceso seguro a `error.message`
            } else {
                alert("An unknown error occurred."); // Manejo de errores no esperados
            }
        }
    };

    const handleReset = () => {
        const newDeck = DeckService.generateDeck();
        setDeck(newDeck);
        setHand([]);
        setTable([]);
        setReloadState(prev => prev + 1);
    }

    // Función para cambiar el criterio de ordenación
    const handleSortByChange = (sortOption: string) => {
        setSortBy(sortOption);
    };

    const handleSelectCard = (card: CardType) => {
        if (selectedCards.includes(card)) {
            // Si la carta ya está seleccionada, la deseleccionamos
            setSelectedCards(selectedCards.filter((c) => c !== card));
        } else {
            // Si la carta no está seleccionada, la agregamos a la selección
            setSelectedCards([...selectedCards, card]);
        }
    };

    const handlePlayHand = () => {
        setTable([...table, ...selectedCards]); // Mover las cartas seleccionadas a la mesa
        setHand(hand.filter((card) => !selectedCards.includes(card))); // Eliminar las cartas seleccionadas de la mano
        setSelectedCards([]); // Limpiar la selección
    };

    return (
        <main className="flex flex-col gap-10 gameboard">
            <Navbar className="mb-10">
                <Button onClick={() => handleSortByChange('rank')}>Sort by Rank</Button>
                <Button onClick={() => handleSortByChange('suit')}>Sort by Suit</Button>
                <Button onClick={() => handleReset()}>Reset</Button>
                <Button onClick={handleReloadHand}>Shuffle</Button>
                <Button onClick={() => handlePlayHand()} disabled={selectedCards.length === 0}>Play Hand</Button>
            </Navbar>
            <Table cards={table} />
            <Hand
                sortBy={sortBy}
                hand={hand}
                key={reloadState}
                selectedCards={selectedCards} // Pasar las cartas seleccionadas
                onSelectCard={handleSelectCard} />
            <Deck deck={deck} />
        </main>
    );
};

export default Balatro;