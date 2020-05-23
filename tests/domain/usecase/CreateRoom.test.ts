import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import CreateRoom from '../../../src/domain/usercase/CreateRoom';
import CreateUser from '../../../src/domain/usercase/CreateUser';
import GenerateKey from '../../../src/domain/usercase/GenerateKey';

import AllRooms from '../../../src/domain/usercase/collection/AllRooms';

import RoomCreationData from '../../../src/domain/usercase/dto/RoomCreationData';
import UserData from '../../../src/domain/usercase/dto/UserData';

import Room from '../../../src/domain/model/Room';
import User from '../../../src/domain/model/User';

import UserAlreadyInRoomException from '../../../src/domain/usercase/exception/UserAlreadyInRoomException';
import RoomAlreadyExistsException from '../../../src/domain/usercase/exception/RoomAlreadyExistsException';
import UserAlreadyExistsException from '../../../src/domain/usercase/exception/UserAlreadyExistsException';

describe('When creating a room', () => {

    const createUser = TypeMoq.Mock.ofType<CreateUser>();
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();
    
    const generateKey = TypeMoq.Mock.ofType<GenerateKey>();
    generateKey.setup(mock => mock.withSize(8)).returns(() => '12345678');
    
    let createRoom: CreateRoom;

    beforeEach(() => {
        createRoom = new CreateRoom(createUser.object, allRooms.object, generateKey.object);
    });

    it('should throw exception if create user throws exception', () => {
        const user: User = {
            id: 1,
            username: 'username'
        };
        const userData: UserData = {
            username: 'username',
            admin: true
        }
        createUser.setup(mock => mock.with(userData)).throws(new UserAlreadyExistsException('username'));

        const data: RoomCreationData = {
            name: 'room',
            username: 'username'
        }
        expect(() => createRoom.with(data)).to.throw(UserAlreadyExistsException);
    });
    
    it('should throw exception if user already exists in this room', () => {
        const user: User = {
            id: 1,
            username: 'username'
        };
        const userData: UserData = {
            username: 'username',
            admin: true
        }
        createUser.setup(mock => mock.with(userData)).returns(() => user);

        const rooms: Room[] = [
            {
                key: 'key',
                locked: true,
                name: 'name',
                numberOfVotes: 0,
                allowMultipleVotesPerCard: false,
                showResults: false,
                owner: user
            }
        ];
        allRooms.setup(mock => mock.all()).returns(() => rooms);

        const data: RoomCreationData = {
            name: 'room',
            username: 'username'
        }
        expect(() => createRoom.with(data)).to.throw(UserAlreadyInRoomException);
    });

    it('should throw exception if room already exists with given name', () => {
        const user: User = {
            id: 2,
            username: 'username'
        };
        const userData: UserData = {
            username: 'username',
            admin: true
        }
        createUser.setup(mock => mock.with(userData)).returns(() => user);

        const owner: User = {
            id: 1,
            username: 'owner'
        };
        const rooms: Room[] = [
            {
                key: 'key',
                locked: true,
                name: 'name',
                numberOfVotes: 0,
                allowMultipleVotesPerCard: false,
                showResults: false,
                owner: owner
            }
        ];
        allRooms.setup(mock => mock.all()).returns(() => rooms);

        const data: RoomCreationData = {
            name: 'name',
            username: 'username'
        }
        expect(() => createRoom.with(data)).to.throw(RoomAlreadyExistsException);
    });

    it('should return the created room', () => {
        const user: User = {
            id: 2,
            username: 'username'
        };
        const userData: UserData = {
            username: 'username',
            admin: true
        }
        createUser.setup(mock => mock.with(userData)).returns(() => user);

        const rooms: Room[] = [];
        allRooms.setup(mock => mock.all()).returns(() => rooms);

        const room: Room = {
            key: '12345678',
            locked: true,
            name: 'name',
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: user
        };
        const addedRoom: Room = {
            id: 1,
            ...room
        }
        allRooms.setup(mock => mock.add(room)).returns(() => addedRoom);

        const data: RoomCreationData = {
            name: 'name',
            username: 'username'
        }

        const result: Room = createRoom.with(data);

        expect(result).to.be.equal(addedRoom);
    });

});