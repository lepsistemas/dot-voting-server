import VoteResponse from "../presentation/dto/VoteResponse";
import Vote from "../../domain/model/Vote";
import CardToResponse from "./CardToResponse";
import UserToResponse from "./UserToResponse";

class VoteToResponse {

    public static convert(vote: Vote): VoteResponse {
        const converted: VoteResponse = {
            id: vote.id,
            card: CardToResponse.convert(vote.card),
            voter: UserToResponse.convert(vote.voter)
        }

        return converted;
    }

}

export default VoteToResponse;