import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import GiveVote from '../../../src/domain/usecase/GiveVote';

import VoteGivenData from '../../../src/domain/usecase/dto/VoteGivenData';

import Card from '../../../src/domain/model/Card';
import Room from '../../../src/domain/model/Room';
import User from '../../../src/domain/model/User';
import Vote from '../../../src/domain/model/Vote';

import CardsChangedHandler from '../../../src/domain/usecase/event/CardsChangedHandler';

import AllVotes from '../../../src/domain/usecase/collection/AllVotes';
import AllCards from '../../../src/domain/usecase/collection/AllCards';
import AllUsers from '../../../src/domain/usecase/collection/AllUsers';
import AllRooms from '../../../src/domain/usecase/collection/AllRooms';


import CardNotFoundException from '../../../src/domain/usecase/exception/CardNotFoundException';
import UserNotFoundException from '../../../src/domain/usecase/exception/UserNotFoundException';
import NumberOfVotesExceededException from '../../../src/domain/usecase/exception/NumberOfVotesExceededException';
import CardAlreadyVotedException from '../../../src/domain/usecase/exception/CardAlreadyVotedException';

describe('When giving a vote', () => {
    
    const handler = TypeMoq.Mock.ofType<CardsChangedHandler>();
    const allVotes = TypeMoq.Mock.ofType<AllVotes>();
    const allCards = TypeMoq.Mock.ofType<AllCards>();
    const allUsers = TypeMoq.Mock.ofType<AllUsers>();
    const allRooms = TypeMoq.Mock.ofType<AllRooms>();

    let giveVote: GiveVote;

    beforeEach(() => {
        giveVote = new GiveVote(handler.object, allVotes.object, allCards.object, allUsers.object, allRooms.object);
    });

    it('should throw exception if card does not exist', () => {
        allCards.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: VoteGivenData = {
            cardId: 1,
            voterId: 1
        }
        expect(() => giveVote.with(data)).to.throw(CardNotFoundException);
    });

    it('should throw exception if voter does not exist', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 1,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: user
        }
        const card: Card = {
            title: 'Title',
            description: 'Description',
            room: room,
            author: user,
            votes: 0
        }
        allCards.setup(mock => mock.byId(1)).returns(() => card);

        allUsers.setup(mock => mock.byId(1)).returns(() => undefined);

        const data: VoteGivenData = {
            cardId: 1,
            voterId: 1
        }
        expect(() => giveVote.with(data)).to.throw(UserNotFoundException);
    });

    it('should throw exception if number of votes exceeded', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 1,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: user
        }
        const card: Card = {
            title: 'Title',
            description: 'Description',
            room: room,
            author: user,
            votes: 0
        }
        allCards.setup(mock => mock.byId(1)).returns(() => card);

        allUsers.setup(mock => mock.byId(1)).returns(() => user);

        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const votes: Vote[] = [
            {
                voter: user,
                card: card
            }
        ];
        allVotes.setup(mock => mock.ofVoter(1)).returns(() => votes);

        const data: VoteGivenData = {
            cardId: 1,
            voterId: 1
        }
        expect(() => giveVote.with(data)).to.throw(NumberOfVotesExceededException);
    });

    it('should throw exception if card has alreaby been voted', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 2,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: user
        }
        const card: Card = {
            title: 'Title',
            description: 'Description',
            room: room,
            author: user,
            votes: 0
        }
        allCards.setup(mock => mock.byId(1)).returns(() => card);

        allUsers.setup(mock => mock.byId(1)).returns(() => user);

        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const votes: Vote[] = [
            {
                voter: user,
                card: card
            }
        ];
        allVotes.setup(mock => mock.ofVoter(1)).returns(() => votes);

        const data: VoteGivenData = {
            cardId: 1,
            voterId: 1
        }
        expect(() => giveVote.with(data)).to.throw(CardAlreadyVotedException);
    });

    it('a vote should be given', () => {
        const user: User = {
            id: 1,
            username: 'username'
        }
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 2,
            allowMultipleVotesPerCard: true,
            showResults: false,
            owner: user
        }
        const card: Card = {
            title: 'Title',
            description: 'Description',
            room: room,
            author: user,
            votes: 0
        }
        allCards.setup(mock => mock.byId(1)).returns(() => card);

        allUsers.setup(mock => mock.byId(1)).returns(() => user);

        allRooms.setup(mock => mock.byId(1)).returns(() => room);

        const votes: Vote[] = [
            {
                voter: user,
                card: card
            }
        ];
        allVotes.setup(mock => mock.ofVoter(1)).returns(() => votes);

        const data: VoteGivenData = {
            cardId: 1,
            voterId: 1
        }
        const result: Vote = giveVote.with(data);

        allCards.verify(mock => mock.put(card.id, card), TypeMoq.Times.once());
        handler.verify(mock => mock.handle(card), TypeMoq.Times.once());
    });

});