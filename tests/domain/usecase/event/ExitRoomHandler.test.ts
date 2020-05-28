import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import ExitRoomHandler from '../../../../src/domain/usecase/event/ExitRoomHandler';
import EventMessage from '../../../../src/domain/usecase/event/EventMessage';
import EventBus from '../../../../src/domain/usecase/event/EventBus';

import Guest from '../../../../src/domain/model/Guest';
import Room from '../../../../src/domain/model/Room';

describe('When entering a room', () => {
    
    const eventBus = TypeMoq.Mock.ofType<EventBus<Guest>>();

    let handler: ExitRoomHandler;

    beforeEach(() => {
        handler = new ExitRoomHandler(eventBus.object);
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

        const guest: Guest = {
            room: room,
            user: null
        }

        handler.handle(guest);

        const message: EventMessage<Guest> = {
            key: 'ROOM:1_ROOM-CHANGED',
            data: guest
        }
        eventBus.verify(mock => mock.publish(message), TypeMoq.Times.once());
    });

});