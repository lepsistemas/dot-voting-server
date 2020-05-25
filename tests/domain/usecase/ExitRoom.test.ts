import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import Room from '../../../src/domain/model/Room';
import User from '../../../src/domain/model/User';

import ExitRoom from '../../../src/domain/usecase/ExitRoom';
import DeleteRoom from '../../../src/domain/usecase/DeleteRoom';

import ExitRoomHandler from '../../../src/domain/usecase/event/ExitRoomHandler';

import AllRooms from '../../../src/domain/usecase/collection/AllRooms';
import AllUsers from '../../../src/domain/usecase/collection/AllUsers';

import RoomExitData from '../../../src/domain/usecase/dto/RoomExitData';

import RoomNotFoundException from '../../../src/domain/usecase/exception/RoomNotFoundException';
import UserNotFoundException from '../../../src/domain/usecase/exception/UserNotFoundException';
import Guest from '../../../src/domain/model/Guest';

describe('When leaving a room', () => {

    const handler = TypeMoq.Mock.ofType<ExitRoomHandler>();
    const deleteRoom = TypeMoq.Mock.ofType<DeleteRoom>();
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();
    const allUsers = TypeMoq.Mock.ofType<AllUsers>();

    let exitRoom: ExitRoom;

    beforeEach(() => {
        exitRoom = new ExitRoom(handler.object, deleteRoom.object, allRooms.object, allUsers.object);
    });

    it('should throw exception when room does not exist', () => {
        allRooms.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: RoomExitData = {
            id: 1,
            userId: 1
        }
        expect(() => exitRoom.with(data)).to.throw(RoomNotFoundException);
    });

    it('should throw exception when user does not exist', () => {
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

        allUsers.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: RoomExitData = {
            id: 1,
            userId: 1
        }
        expect(() => exitRoom.with(data)).to.throw(UserNotFoundException);
    });

    it('should throw exception when room has no guests', () => {
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

        const user: User = {
            id: 2,
            username: 'username'
        }
        allUsers.setup(mock => mock.byId(2)).returns(() => user);

        const data: RoomExitData = {
            id: 1,
            userId: 2
        }
        expect(() => exitRoom.with(data)).to.throw(UserNotFoundException);
    });

    it('should return guest that just left', () => {
        const user: User = {
            id: 2,
            username: 'guest'
        }
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: {id: 1, username: 'owner'},
            guests: [user]
        }
        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        allUsers.setup(mock => mock.byId(2)).returns(() => user);

        const data: RoomExitData = {
            id: 1,
            userId: 2
        }
        const result: Guest = exitRoom.with(data);
        
        expect(result.room.guests).to.be.an('array').that.is.empty;
        expect(result.user.id).to.be.equal(2);
        expect(result.user.username).to.be.equal('guest');

        allRooms.verify(mock => mock.put(1, room), TypeMoq.Times.once());
        handler.verify(mock => mock.handle(result), TypeMoq.Times.once());
    });

    it('should return admin that just left and delete room', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
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

        allUsers.setup(mock => mock.byId(1)).returns(() => user);

        const data: RoomExitData = {
            id: 1,
            userId: 1
        }
        const result: Guest = exitRoom.with(data);
        
        deleteRoom.verify(mock => mock.by(1), TypeMoq.Times.once());
        handler.verify(mock => mock.handle(result), TypeMoq.Times.once());
    });

});
