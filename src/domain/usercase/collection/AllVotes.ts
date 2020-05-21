import Vote from "../../../domain/model/Vote";

interface AllVotes {
    
    ofVoter(id: number): Vote[];
    
    forCard(id: number): Vote[];

    add(vote: Vote): Vote;

}

export default AllVotes;