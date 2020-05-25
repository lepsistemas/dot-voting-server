import CardCreationData from "../../domain/usecase/dto/CardCreationData";
import CardCreationRequest from "../presentation/dto/CardCreationRequest";

class RequestToCardCreationData {

    public static convert(request: CardCreationRequest): CardCreationData {
        const converted: CardCreationData = {
            userId: request.userId,
            roomId: request.roomId,
            title: request.title,
            description: request.description
        }

        return converted;
    }

}

export default RequestToCardCreationData;