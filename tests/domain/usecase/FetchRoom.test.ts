import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import FetchRoom from '../../../src/domain/usecase/FetchRoom';

import Room from '../../../src/domain/model/Room';

import AllRooms from '../../../src/domain/usecase/collection/AllRooms';

import RoomNotFoundException from '../../../src/domain/usecase/exception/RoomNotFoundException';

describe('When fetching all rooms', () => {

    const allRooms = TypeMoq.Mock.ofType<AllRooms>();

    let fetchRoom: FetchRoom;

    beforeEach(() => {
        fetchRoom = new FetchRoom(allRooms.object);
    });

    it('should return empty when there are no rooms', () => {
        allRooms.setup(mock => mock.all()).returns(() => []);

        const result: Room[] = fetchRoom.all();

        expect(result).to.be.an('array').that.is.empty;
    });

    it('should return all rooms', () => {
        const rooms: Room[] = [
            {
                id: 1,
                key: '12345678',
                locked: true,
                name: 'name',
                numberOfVotes: 0,
                allowMultipleVotesPerCard: false,
                showResults: false,
                owner: {id: 1, username: 'username'}
            }
        ];
        allRooms.setup(mock => mock.all()).returns(() => rooms);

        const result: Room[] = fetchRoom.all();

        expect(result).to.be.equal(rooms);
    });

});

describe('When fetching room by id', () => {

    const allRooms = TypeMoq.Mock.ofType<AllRooms>();

    let fetchRoom: FetchRoom;

    beforeEach(() => {
        fetchRoom = new FetchRoom(allRooms.object);
    });

    it('should throw exception if room does not exist', () => {
        allRooms.setup(mock => mock.byId(1)).returns(() => undefined);

        expect(() => fetchRoom.byId(1)).to.throw(RoomNotFoundException);
    });

    it('should return the room with given id', () => {
        const room: Room = {
            id: 1,
            key: '12345678',
            locked: true,
            name: 'name',
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: {id: 1, username: 'username'}
        }
        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const result: Room = fetchRoom.byId(1);

        expect(result).to.be.equal(room);
    });

});

describe('When fetching room by name and key', () => {

    const allRooms = TypeMoq.Mock.ofType<AllRooms>();

    let fetchRoom: FetchRoom;

    beforeEach(() => {
        fetchRoom = new FetchRoom(allRooms.object);
    });

    it('should throw exception if room does not exist', () => {
        allRooms.setup(mock => mock.byNameAndKey('name', '12345678')).returns(() => undefined);

        expect(() => fetchRoom.byNameAndKey('name', '12345678')).to.throw(RoomNotFoundException);
    });

    it('should return the room with given name and key', () => {
        const room: Room = {
            id: 1,
            key: '12345678',
            locked: true,
            name: 'name',
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: {id: 1, username: 'username'}
        }
        allRooms.setup(mock => mock.byNameAndKey('name', '12345678')).returns(() => room);

        const result: Room = fetchRoom.byNameAndKey('name', '12345678');

        expect(result).to.be.equal(room);
    });

});