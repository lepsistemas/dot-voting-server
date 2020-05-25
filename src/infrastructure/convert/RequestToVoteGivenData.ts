import VoteGivenData from "../../domain/usecase/dto/VoteGivenData";
import VoteGivenRequest from "../presentation/dto/VoteGivenRequest";

class RequestToVoteGivenData {

    public static convert(request: VoteGivenRequest): VoteGivenData {
        const converted: VoteGivenData = {
            cardId: request.cardId,
            voterId: request.voterId
        }

        return converted;
    }

}

export default RequestToVoteGivenData;