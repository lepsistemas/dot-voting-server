import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import FetchCard from '../../../src/domain/usecase/FetchCard';

import Room from '../../../src/domain/model/Room';
import Card from '../../../src/domain/model/Card';

import AllRooms from '../../../src/domain/usecase/collection/AllRooms';
import AllCards from '../../../src/domain/usecase/collection/AllCards';

import RoomNotFoundException from '../../../src/domain/usecase/exception/RoomNotFoundException';
import User from '../../../src/domain/model/User';

describe('When fecthing cards', () => {
    
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();
    const allCards = TypeMoq.Mock.ofType<AllCards>();

    let fetchCard: FetchCard;

    beforeEach(() => {
        fetchCard = new FetchCard(allRooms.object, allCards.object);
    });

    it('should throw exception if room dows not exist', () => {
        allRooms.setup(mock => mock.byId(1)).returns(() => undefined);

        expect(() => fetchCard.fromRoom(1)).to.throw(RoomNotFoundException);
    });

    it('should return cards from a specific room', () => {
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
            owner: user
        }
        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const cards: Card[] = [
            {
                id: 1,
                title: 'Title',
                description: 'Description',
                author: user,
                room: room,
                votes: 0
            }
        ]
        allCards.setup(mock => mock.belongingTo(1)).returns(() => cards);

        const result: Card[] = fetchCard.fromRoom(1);

        expect(result).to.be.an('array').with.lengthOf(1);
    });

});
