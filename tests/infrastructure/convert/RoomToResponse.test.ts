import { expect } from 'chai';

import User from '../../../src/domain/model/User';
import Room from '../../../src/domain/model/Room';

import RoomToResponse from '../../../src/infrastructure/convert/RoomToResponse';
import RoomResponse from '../../../src/infrastructure/presentation/dto/RoomResponse';

describe('When converting', () => {

    it('should convert from Room to RoomResponse', () => {
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
            owner: user,
            guests: [user]
        }
    
        const result: RoomResponse = RoomToResponse.convert(room);
    
        expect(result.guests[0].id).to.be.equal(2);
        expect(result.id).to.be.equal(3);
    });

});