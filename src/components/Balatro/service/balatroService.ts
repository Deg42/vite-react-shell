import CardType from '../types';

class DeckService {
    private deck: CardType[] = [];
    private hand: CardType[] = [];
    private readonly maxHandSize: number = 7;

    // Generar un nuevo mazo
    generateDeck(): CardType[] {
        const newDeck: CardType[] = [];
        for (const suit of CardType.SUITS) {
            for (const rank of CardType.RANKS) {
                newDeck.push(new CardType(rank, suit));
            }
        }
        // randomize the deck
        for (let i = newDeck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newDeck[i], newDeck[j]] = [newDeck[j], newDeck[i]];
        }
        this.deck = newDeck;
        this.hand = []; // Reiniciar la mano al generar un nuevo mazo
        return this.deck;
    }

    // Robar cartas del mazo y agregarlas a la mano
    drawCards(): CardType[] {
        if (this.deck.length === 0) {
            throw new Error('No hay más cartas en el mazo.');
        }

        // Calcular cuántas cartas se pueden robar (máximo `maxHandSize`)
        const cardsToDraw = Math.min(this.maxHandSize, this.deck.length);

        // Robar cartas del mazo
        const drawnCards = this.deck.slice(0, cardsToDraw);
        this.deck = this.deck.slice(cardsToDraw);

        // Agregar las cartas robadas a la mano
        this.hand = [...this.hand, ...drawnCards];

        return drawnCards;
    }

    // Obtener el mazo actual
    getDeck(): CardType[] {
        return this.deck;
    }

    // Obtener la mano actual
    getHand(): CardType[] {
        return this.hand;
    }

    // Reiniciar la mano
    resetHand(): void {
        this.hand = [];
    }
}

export default new DeckService();