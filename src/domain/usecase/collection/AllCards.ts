import Card from "../../model/Card";

interface AllCards {
    
    byId(cardId: number): Card;

    add(card: Card): Card;

    belongingTo(roomId: number): Card[];
    
    remove(id: number): void;

    put(id: number, card: Card): void;
}

export default AllCards;