import ErrorResponse from "./dto/ErrorResponse";
import CardResponse from "./dto/CardResponse";
import CardCreationRequest from "./dto/CardCreationRequest";

import Card from "../../domain/model/Card";
import CreateCard from "../../domain/usercase/CreateCard";
import CardCreationData from "../../domain/usercase/dto/CardCreationData";

import RequestToCardCreationData from "../convert/RequestToCardCreationData";
import CardToResponse from "../convert/CardToResponse";

class CardController {

    private createCard: CreateCard;

    constructor(createCard: CreateCard) {
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

}

export default CardController;