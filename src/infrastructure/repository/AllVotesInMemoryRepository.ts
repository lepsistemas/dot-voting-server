import AllVotes from "../../domain/usecase/collection/AllVotes";
import Vote from "../../domain/model/Vote";

class AllVotesInMemoryRepository implements AllVotes {

    private votes: Vote[];

    constructor() {
        this.votes = [];
    }

    ofVoter(id: number): Vote[] {
        return this.votes.filter(vote => vote.voter.id === id);
    }
    
    forCard(id: number): Vote[] {
        return this.votes.filter(vote => vote.card.id === id);
    }

    add(vote: Vote): Vote {
        const lastId: number = this.votes.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        vote.id = lastId + 1;
        this.votes.push(vote);

        return vote;
    }

    public remove(id: number): void {
        this.votes = this.votes.filter(v => v.id !== id);
    }

}

export default AllVotesInMemoryRepository;