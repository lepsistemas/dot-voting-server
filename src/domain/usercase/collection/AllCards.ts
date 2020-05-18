import Card from "../../../domain/model/Card";

interface AllCards {

    add(card: Card): Card;

    belongingTo(roomId: number): Card[];

}

export default AllCards;