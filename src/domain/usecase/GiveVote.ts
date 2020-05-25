import Card from "../model/Card";
import User from "../model/User";
import Room from "../model/Room";
import Vote from "../model/Vote";

import VoteGivenData from "./dto/VoteGivenData";

import AllCards from "./collection/AllCards";
import AllUsers from "./collection/AllUsers";
import AllRooms from "./collection/AllRooms";
import AllVotes from "./collection/AllVotes";

import CardsChangedHandler from "./event/CardsChangedHandler";

import CardNotFoundException from "./exception/CardNotFoundException";
import UserNotFoundException from "./exception/UserNotFoundException";
import NumberOfVotesExceededException from "./exception/NumberOfVotesExceededException";
import CardAlreadyVotedException from "./exception/CardAlreadyVotedException";

class GiveVote {

    private handler: CardsChangedHandler;
    private allVotes: AllVotes;
    private allCards: AllCards;
    private allUsers: AllUsers;
    private allRooms: AllRooms;

    constructor(handler: CardsChangedHandler, allVotes: AllVotes, allCards: AllCards, allUsers: AllUsers, allRooms: AllRooms) {
        this.handler = handler;
        this.allVotes = allVotes;
        this.allCards = allCards;
        this.allUsers = allUsers;
        this.allRooms = allRooms;
    }

    public with(data: VoteGivenData): Vote {
        const card: Card = this.allCards.byId(data.cardId);
        if (!card) {
            throw new CardNotFoundException();
        }

        const voter: User = this.allUsers.byId(data.voterId);
        if (!voter) {
            throw new UserNotFoundException();
        }

        const room: Room = this.allRooms.byId(card.room.id);

        const votesOfVoter: Vote[] = this.allVotes.ofVoter(voter.id);
        if (room.numberOfVotes <= votesOfVoter.length) {
            throw new NumberOfVotesExceededException();
        }
        
        if (!room.allowMultipleVotesPerCard) {
            const votesForCard: Vote[] = votesOfVoter.filter(vote => vote.card.id === card.id);
            if (votesForCard.length > 0) {
                throw new CardAlreadyVotedException();
            }
        }

        card.votes++;
        this.allCards.put(card.id, card);

        this.handler.handle(card);

        const vote: Vote = {
            voter: voter,
            card: card
        }

        return this.allVotes.add(vote);
    }

}

export default GiveVote;