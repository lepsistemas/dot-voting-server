class VoteGivenRequest {

    cardId: number;
    voterId: number;

    constructor(body: any) {
        this.cardId = body.cardId;
        this.voterId = body.voterId;
    }

}

export default VoteGivenRequest;