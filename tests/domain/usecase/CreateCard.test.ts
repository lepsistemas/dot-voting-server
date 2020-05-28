import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import CreateCard from '../../../src/domain/usecase/CreateCard';

import Room from '../../../src/domain/model/Room';
import User from '../../../src/domain/model/User';
import Card from '../../../src/domain/model/Card';

import CardsChangedHandler from '../../../src/domain/usecase/event/CardsChangedHandler';

import AllUsers from '../../../src/domain/usecase/collection/AllUsers';
import AllRooms from '../../../src/domain/usecase/collection/AllRooms';
import AllCards from '../../../src/domain/usecase/collection/AllCards';
import CardCreationData from '../../../src/domain/usecase/dto/CardCreationData';

import RoomNotFoundException from '../../../src/domain/usecase/exception/RoomNotFoundException';
import UserNotFoundException from '../../../src/domain/usecase/exception/UserNotFoundException';

describe('When creating a card', () => {
    
    const handler = TypeMoq.Mock.ofType<CardsChangedHandler>();
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();
    const allUsers = TypeMoq.Mock.ofType<AllUsers>();
    const allCards = TypeMoq.Mock.ofType<AllCards>();

    let createCard: CreateCard;

    beforeEach(() => {
        createCard = new CreateCard(handler.object, allRooms.object, allUsers.object, allCards.object);
    });

    it('should throw exception if room does not exist', () => {
        allRooms.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: CardCreationData = {
            roomId: 1,
            userId: 1,
            title: 'Title',
            description: 'Description'
        }
        expect(() => createCard.with(data)).to.throw(RoomNotFoundException);
    });

    it('should throw exception if user does not exist', () => {
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: {id: 1, username: 'username'}
        }
        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        allUsers.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: CardCreationData = {
            roomId: 1,
            userId: 1,
            title: 'Title',
            description: 'Description'
        }
        expect(() => createCard.with(data)).to.throw(UserNotFoundException);
    });

    it('should return the created card', () => {
        const user: User = {
            id: 1,
            username: 'owner'
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
        allUsers.setup(mock => mock.byId(1)).returns(() => user);

        const card: Card = {
            title: 'Title',
            description: 'Description',
            author: user,
            room: room,
            votes: 0
        }
        const addedCard: Card = {
            id: 1,
            title: 'Title',
            description: 'Description',
            author: user,
            room: room,
            votes: 0
        }
        allCards.setup(mock => mock.add(card)).returns(() => addedCard);

        const data: CardCreationData = {
            title: 'Title',
            description: 'Description',
            roomId: 1,
            userId: 1
        }
        const result: Card = createCard.with(data);

        expect(result.id).to.be.equal(1);

        handler.verify(mock => mock.handle({ ...addedCard }), TypeMoq.Times.once());
    });

});