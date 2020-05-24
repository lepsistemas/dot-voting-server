import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import LockerRoom from '../../../src/domain/usercase/LockerRoom';

import RoomLockerData from '../../../src/domain/usercase/dto/RoomLockerData';

import Room from '../../../src/domain/model/Room';

import AllRooms from '../../../src/domain/usercase/collection/AllRooms';

import RoomNotFoundException from '../../../src/domain/usercase/exception/RoomNotFoundException';

describe('When locking or unlocking a room', () => {
    
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();

    let lockerRoom: LockerRoom;

    beforeEach(() => {
        lockerRoom = new LockerRoom(allRooms.object);
    });

    it('should throw exception if room does not exist', () => {
        allRooms.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: RoomLockerData = {
            id: 1,
            lock: false
        }
        expect(() => lockerRoom.with(data)).throws(RoomNotFoundException);
    });

    it('should unlock the room', () => {
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: true,
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: {id: 1, username: 'owner'}
        }
        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const data: RoomLockerData = {
            id: 1,
            lock: false
        }
        lockerRoom.with(data);

        allRooms.verify(mock => mock.put(1, {...room, locked: false}), TypeMoq.Times.once());
    });

});