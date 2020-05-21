import GiveVote from "../../domain/usercase/GiveVote";
import VoteGivenData from "../../domain/usercase/dto/VoteGivenData";
import Vote from "../../domain/model/Vote";

import VoteGivenRequest from "./dto/VoteGivenRequest";

import RequestToVoteGivenData from "../convert/RequestToVoteGivenData";
import VoteToResponse from "../convert/VoteToResponse";

import VoteResponse from "./dto/VoteResponse";
import ErrorResponse from "./dto/ErrorResponse";

class VoteController {

    private giveVote: GiveVote;

    constructor(giveVote: GiveVote) {
        this.giveVote = giveVote;
    }

    public give(request: VoteGivenRequest): VoteResponse | ErrorResponse {
        const data: VoteGivenData = RequestToVoteGivenData.convert(request);
        try {
            const vote: Vote = this.giveVote.with(data);
            return VoteToResponse.convert(vote);
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

export default VoteController;