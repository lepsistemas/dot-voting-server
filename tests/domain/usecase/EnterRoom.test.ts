import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import EnterRoom from '../../../src/domain/usecase/EnterRoom';
import CreateUser from '../../../src/domain/usecase/CreateUser';

import Guest from '../../../src/domain/model/Guest';
import Room from '../../../src/domain/model/Room';
import User from '../../../src/domain/model/User';

import RoomEntranceData from '../../../src/domain/usecase/dto/RoomEntranceData';
import UserData from '../../../src/domain/usecase/dto/UserData';

import EnterRoomHandler from '../../../src/domain/usecase/event/EnterRoomHandler';

import AllUsers from '../../../src/domain/usecase/collection/AllUsers';
import AllRooms from '../../../src/domain/usecase/collection/AllRooms';

import RoomNotFoundException from '../../../src/domain/usecase/exception/RoomNotFoundException';
import RoomIsLockedException from '../../../src/domain/usecase/exception/RoomIsLockedException';
import UserAlreadyExistsException from '../../../src/domain/usecase/exception/UserAlreadyExistsException';

describe('When entering a room', () => {

    const handler =  TypeMoq.Mock.ofType<EnterRoomHandler>();
    const createUser = TypeMoq.Mock.ofType<CreateUser>();
    const allUsers = TypeMoq.Mock.ofType<AllUsers>();
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();

    let enterRoom: EnterRoom;

    beforeEach(() => {
        enterRoom = new EnterRoom(handler.object, createUser.object, allUsers.object, allRooms.object);
    });

    it('should throw exception when room does not exist', () => {
        allRooms.setup(mock => mock.byNameAndKey('name', '12345678')).returns(() => undefined);

        const data: RoomEntranceData = {
            name: 'name',
            key: '12345678',
            username: 'username'
        }
        expect(() => enterRoom.with(data)).to.throw(RoomNotFoundException);
    });

    it('should throw exception when room is locked', () => {
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
        allRooms.setup(mock => mock.byNameAndKey('name', '12345678')).returns(() => room);

        const data: RoomEntranceData = {
            name: 'name',
            key: '12345678',
            username: 'guest'
        }
        expect(() => enterRoom.with(data)).to.throw(RoomIsLockedException);
    });

    it('should throw exception when cant create user', () => {
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
        allRooms.setup(mock => mock.byNameAndKey('name', '12345678')).returns(() => room);

        allUsers.setup(mock => mock.byUsername('guest')).returns(() => undefined);
        const userData: UserData = {
            username: 'guest',
            admin: false
        }
        createUser.setup(mock => mock.with(userData)).throws(new UserAlreadyExistsException('guest'));

        const data: RoomEntranceData = {
            name: 'name',
            key: '12345678',
            username: 'guest'
        }
        expect(() => enterRoom.with(data)).to.throw(UserAlreadyExistsException);
    });

    it('should return guest that just entered', () => {
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
        allRooms.setup(mock => mock.byNameAndKey('name', '12345678')).returns(() => room);

        const guest: User = {
            id: 2,
            username: 'guest'
        }
        allUsers.setup(mock => mock.byUsername('guest')).returns(() => guest);

        const data: RoomEntranceData = {
            name: 'name',
            key: '12345678',
            username: 'guest'
        }
        const result: Guest = enterRoom.with(data);
        
        expect(result.room.guests).to.be.an('array').with.lengthOf(1);
        expect(result.room.guests[0].id).to.be.equal(2);
        expect(result.room.guests[0].username).to.be.equal('guest');
        expect(result.user.id).to.be.equal(2);
        expect(result.user.username).to.be.equal('guest');

        handler.verify(mock => mock.handle(result), TypeMoq.Times.once());
    });

});