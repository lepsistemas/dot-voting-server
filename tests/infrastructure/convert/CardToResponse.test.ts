import { expect } from 'chai';

import Card from '../../../src/domain/model/Card'
import User from '../../../src/domain/model/User';
import Room from '../../../src/domain/model/Room';

import CardToResponse from '../../../src/infrastructure/convert/CardToResponse';
import CardResponse from '../../../src/infrastructure/presentation/dto/CardResponse';

describe('When converting', () => {

    it('should convert from Card to CardResponse', () => {
        const user: User = {
            id: 2,
            username: 'author'
        }
    
        const room: Room = {
            id: 3,
            name: 'room',
            key: '12345678',
            locked: false,
            numberOfVotes: 1,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: user
        }
    
        const card: Card = {
            id: 1,
            title: 'Title',
            description: 'Description',
            votes: 1,
            author: user,
            room: room
        }
    
        const result: CardResponse = CardToResponse.convert(card);
    
        expect(result.id).to.be.equal(1);
        expect(result.author.id).to.be.equal(2);
        expect(result.room.id).to.be.equal(3);
    });

});