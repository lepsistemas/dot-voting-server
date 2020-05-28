import { expect } from 'chai';
import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import CardsChangedHandler from '../../../../src/domain/usecase/event/CardsChangedHandler';

import Card from '../../../../src/domain/model/Card';

import EventBus from '../../../../src/domain/usecase/event/EventBus';
import EventMessage from '../../../../src/domain/usecase/event/EventMessage';
import Room from '../../../../src/domain/model/Room';

describe('When giving a vote', () => {
    
    const eventBus = TypeMoq.Mock.ofType<EventBus<Card>>();

    let handler: CardsChangedHandler;

    beforeEach(() => {
        handler = new CardsChangedHandler(eventBus.object);
    });

    it('should publish event', () => {
        const room: Room = {
            id: 1,
            name: 'name',
            key: '12345678',
            locked: false,
            numberOfVotes: 1,
            allowMultipleVotesPerCard: false,
            showResults: false,
            owner: {id: 1, username: 'username'}
        }
        const card: Card = {
            id: 1,
            title: 'Title',
            description: 'Description',
            author: null,
            room: room,
            votes: 0
        }
        handler.handle(card);

        const message: EventMessage<Card> = {
            key: 'ROOM:1_CARDS-CHANGED',
            data: card
        }
        eventBus.verify(mock => mock.publish(message), TypeMoq.Times.once());
    });

});
