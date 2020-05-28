import { expect } from 'chai';

import Card from '../../../src/domain/model/Card';
import Vote from '../../../src/domain/model/Vote'
import User from '../../../src/domain/model/User';
import Room from '../../../src/domain/model/Room';

import VoteToResponse from '../../../src/infrastructure/convert/VoteToResponse';
import VoteResponse from '../../../src/infrastructure/presentation/dto/VoteResponse';

describe('When converting', () => {

    it('should convert from Vote to VoteResponse', () => {
        const user: User = {
            id: 2,
            username: 'author'
        }
    
        const room: Room = {
            id: 3,
            name: 'room',
            key: '12345678',
            locked: true,
            numberOfVotes: 1,
            allowMultipleVotesPerCard: true,
            showResults: true,
            owner: user
        }

        const card: Card = {
            id: 4,
            title: 'Title',
            description: 'Description',
            votes: 1,
            author: user,
            room: room
        }
    
        const vote: Vote = {
            id: 1,
            voter: user,
            card: card
        }
    
        const result: VoteResponse = VoteToResponse.convert(vote);
    
        expect(result.id).to.be.equal(1);
        expect(result.voter.id).to.be.equal(2);
        expect(result.card.id).to.be.equal(4);
    });

});