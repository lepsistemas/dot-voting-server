import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import UpdateRoom from '../../../src/domain/usercase/UpdateRoom';

import RoomChangedHandler from '../../../src/domain/usercase/event/RoomChangedHandler';

import AllRooms from '../../../src/domain/usercase/collection/AllRooms';

import RoomNotFoundException from '../../../src/domain/usercase/exception/RoomNotFoundException';
import RoomUpdateData from '../../../src/domain/usercase/dto/RoomUpdateData';
import Room from '../../../src/domain/model/Room';

describe('When updating a room', () => {
    
    const handler = TypeMoq.Mock.ofType<RoomChangedHandler>();
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();

    let updateRoom: UpdateRoom;

    beforeEach(() => {
        updateRoom = new UpdateRoom(handler.object, allRooms.object);
    });

    it('should throw exception if room does not exist', () => {
        allRooms.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: RoomUpdateData = {}
        expect(() => updateRoom.with(1, data)).throws(RoomNotFoundException);
    });

    it('should change room\'s configuration', () => {
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: {id: 1, username: 'owner'}
        }
        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const data: RoomUpdateData = {
            numberOfVotes: 5,
            allowMultipleVotesPerCard: true,
            showResults: true
        }
        const result: Room = updateRoom.with(1, data);
        expect(result.numberOfVotes).to.be.equal(5);
        expect(result.allowMultipleVotesPerCard).to.be.true;
        expect(result.showResults).to.be.true;

        allRooms.verify(mock => mock.put(1, room), TypeMoq.Times.once());
        handler.verify(mock => mock.handle(room), TypeMoq.Times.once());
    });
});