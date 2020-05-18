import CardResponse from "../presentation/dto/CardResponse";
import Card from "../../domain/model/Card";
import RoomToResponse from "./RoomToResponse";
import UserToResponse from "./UserToResponse";

class CardToResponse {

    public static convert(card: Card): CardResponse {
        const converted: CardResponse = {
            id: card.id,
            title: card.title,
            description: card.description,
            room: RoomToResponse.convert(card.room),
            author: UserToResponse.convert(card.author),
            votes: card.votes
        }

        return converted;
    }

}

export default CardToResponse;