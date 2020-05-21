import UserResponse from "./UserResponse";
import CardResponse from "./CardResponse";

interface VoteResponse {

    id: number;
    card: CardResponse;
    voter: UserResponse;

}

export default VoteResponse;