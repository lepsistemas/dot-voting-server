import { expect } from 'chai';

import Guest from '../../../src/domain/model/Guest'
import User from '../../../src/domain/model/User';
import Room from '../../../src/domain/model/Room';

import GuestToResponse from '../../../src/infrastructure/convert/GuestToResponse';
import GuestResponse from '../../../src/infrastructure/presentation/dto/GuestResponse';

describe('When converting', () => {

    it('should convert from Guest to GuestResponse', () => {
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
    
        const guest: Guest = {
            room: room,
            user: user
        }
    
        const result: GuestResponse = GuestToResponse.convert(guest);
    
        expect(result.user.id).to.be.equal(2);
        expect(result.room.id).to.be.equal(3);
    });

});