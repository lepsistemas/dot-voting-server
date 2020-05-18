import ErrorResponse from "./dto/ErrorResponse";
import CardResponse from "./dto/CardResponse";
import CardCreationRequest from "./dto/CardCreationRequest";

import Card from "../../domain/model/Card";
import CreateCard from "../../domain/usercase/CreateCard";
import CardCreationData from "../../domain/usercase/dto/CardCreationData";

import FetchCard from "../../domain/usercase/FetchCard";

import RequestToCardCreationData from "../convert/RequestToCardCreationData";
import CardToResponse from "../convert/CardToResponse";

class CardController {

    private fetchCard: FetchCard;
    private createCard: CreateCard;

    constructor(fetchCard: FetchCard, createCard: CreateCard) {
        this.fetchCard = fetchCard;
        this.createCard = createCard;
    }

    public create(request: CardCreationRequest): CardResponse | ErrorResponse {
        const data: CardCreationData = RequestToCardCreationData.convert(request);
        try {
            const card: Card = this.createCard.with(data);
            return CardToResponse.convert(card);
        } catch(e) {
            return {
                error: {
                    status: 400,
                    message: e.message
                }
            };
        }
    }

    public fromRoom(roomId: number): CardResponse[] | ErrorResponse {
        try {
            const cards: Card[] = this.fetchCard.fromRoom(roomId);
            return cards.map(card => CardToResponse.convert(card));
        } catch(e) {
            return {
                error: {
                    status: 400,
                    message: e.message
                }
            };
        }
    }

}

export default CardController;