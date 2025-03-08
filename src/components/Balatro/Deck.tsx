import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Card from "./Card";
import CardType from "./types";

interface DeckProps {
    deck: CardType[];
}

const Deck: React.FC<DeckProps> = ({ deck }) => {
    const [openModal, setOpenModal] = useState(false);

    // Group cards by suit
    const groupedBySuit = deck.slice().sort((a, b) => a.compare(b)).reverse().reduce((acc, card) => {
        if (!acc[card.suit]) {
            acc[card.suit] = [];
        }
        acc[card.suit].push(card);
        return acc;
    }, {} as Record<string, CardType[]>);


    return (
        <>
            <Button onClick={() => setOpenModal(true)}>VIEW DECK</Button>
            <Modal dismissible show={openModal} size="3xl" onClose={() => setOpenModal(false)}>
                <Modal.Header>Deck</Modal.Header>
                <Modal.Body>
                    <div className="space-y-5">
                        {deck.length === 0 ? (
                            <p className="text-gray-500 dark:text-gray-400">The deck is empty.</p>
                        ) : (
                            Object.entries(groupedBySuit).map(([, cards], suitIndex) => (
                                <div key={suitIndex}>
                                    <div className="deck-group">
                                        {cards.map((card, index) => (
                                            <Card key={index} suit={card.suit} rank={card.rank} />
                                        ))}
                                    </div>
                                    {suitIndex < Object.keys(groupedBySuit).length - 1 }
                                </div>
                            ))
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Deck;