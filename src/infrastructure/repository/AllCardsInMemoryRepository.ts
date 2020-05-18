import AllCards from "../../domain/usercase/collection/AllCards";
import Card from "../../domain/model/Card";

class AllCardsInMemoryRepository implements AllCards {

    private cards: Card[];

    constructor() {
        this.cards = [];
    }
    
    public add(card: Card): Card {
        const lastId: number = this.cards.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        card.id = lastId + 1;
        this.cards.push(card);

        return card;
    }

    belongingTo(roomId: number): Card[] {
        return this.cards
            .filter(card => card.room.id === roomId)
            .sort(({ votes: previous }, { votes: current }) => previous >  current ? previous : current);
    }

    remove(id: number): void {
        this.cards = this.cards.filter(c => c.id !== id);
    }

}

export default AllCardsInMemoryRepository;