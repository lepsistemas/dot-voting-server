import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import DeleteRoom from '../../../src/domain/usercase/DeleteRoom';

import DeleteRoomHandler from '../../../src/domain/usercase/event/DeleteRoomHandler';

import AllRooms from '../../../src/domain/usercase/collection/AllRooms';
import AllUsers from '../../../src/domain/usercase/collection/AllUsers';
import AllCards from '../../../src/domain/usercase/collection/AllCards';
import AllVotes from '../../../src/domain/usercase/collection/AllVotes';

import RoomNotFoundException from '../../../src/domain/usercase/exception/RoomNotFoundException';
import Room from '../../../src/domain/model/Room';
import User from '../../../src/domain/model/User';
import Card from '../../../src/domain/model/Card';
import Vote from '../../../src/domain/model/Vote';

describe('When deleting a room', () => {
    
    const handler = TypeMoq.Mock.ofType<DeleteRoomHandler>();
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();
    const allUsers = TypeMoq.Mock.ofType<AllUsers>();
    const allCards = TypeMoq.Mock.ofType<AllCards>();
    const allVotes = TypeMoq.Mock.ofType<AllVotes>();

    let deleteRoom: DeleteRoom;

    beforeEach(() => {
        deleteRoom = new DeleteRoom(handler.object, allRooms.object, allUsers.object, allCards.object, allVotes.object);
    });

    it('should throw exception when room does not exist', () => {
        allRooms.setup(mock => mock.byId(1)).returns(() => undefined);

        expect(() => deleteRoom.by(1)).throw(RoomNotFoundException);
    });

    it('should also delete its dependencies', () => {
        const owner: User = {
            id: 1,
            username: 'owner'
        }
        const guest: User = {
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
            owner: owner,
            guests: [guest]
        }
        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const cards: Card[] = [
            {
                id: 1,
                title: 'Title',
                description: 'Description',
                votes: 1,
                room: room,
                author: owner
            }
        ]
        allCards.setup(mock => mock.belongingTo(1)).returns(() => cards);

        const votes: Vote[] = [
            {
                id: 1,
                voter: guest,
                card: cards[0]
            }
        ]
        allVotes.setup(mock => mock.forCard(1)).returns(() => votes);

        deleteRoom.by(1);

        allUsers.verify(mock => mock.remove(2), TypeMoq.Times.once());
        allUsers.verify(mock => mock.remove(1), TypeMoq.Times.once());
        allCards.verify(mock => mock.remove(1), TypeMoq.Times.once());
        allVotes.verify(mock => mock.remove(1), TypeMoq.Times.once());
        allRooms.verify(mock => mock.remove(1), TypeMoq.Times.once());
        handler.verify(mock => mock.handle(room), TypeMoq.Times.once());
    });
});
