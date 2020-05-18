import Card from "../../../domain/model/Card";

interface AllCards {

    add(card: Card): Card;

    belongingTo(roomId: number): Card[];
    
    remove(id: number): void;

}

export default AllCards;