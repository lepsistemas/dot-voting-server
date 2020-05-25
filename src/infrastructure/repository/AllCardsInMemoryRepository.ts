import AllCards from "../../domain/usecase/collection/AllCards";
import Card from "../../domain/model/Card";

class AllCardsInMemoryRepository implements AllCards {

    private cards: Card[];

    constructor() {
        this.cards = [];
    }

    public byId(id: number): Card {
        return this.cards.find(card => card.id === id);
    }
    
    public add(card: Card): Card {
        const lastId: number = this.cards.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        card.id = lastId + 1;
        this.cards.push(card);

        return card;
    }

    public belongingTo(roomId: number): Card[] {
        return this.cards
            .filter(card => card.room.id === roomId)
            // .sort((previous, current) => previous.votes < current.votes ? 1 : -1);
    }

    public remove(id: number): void {
        this.cards = this.cards.filter(c => c.id !== id);
    }

    public put(id: number, card: Card): void {
        this.cards.map(c => {
            if (c.id === id) {
                return card;
            }
            return c;
        });
    }

}

export default AllCardsInMemoryRepository;