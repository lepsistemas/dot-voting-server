import { beforeEach } from 'mocha';
import * as TypeMoq from 'typemoq';

import DeleteRoomHandler from '../../../../src/domain/usecase/event/DeleteRoomHandler';
import EventMessage from '../../../../src/domain/usecase/event/EventMessage';
import EventBus from '../../../../src/domain/usecase/event/EventBus';

import Room from '../../../../src/domain/model/Room';

describe('When deleting room', () => {
    
    const eventBus = TypeMoq.Mock.ofType<EventBus<Room>>();

    let handler: DeleteRoomHandler;

    beforeEach(() => {
        handler = new DeleteRoomHandler(eventBus.object);
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

        handler.handle(room);

        const message: EventMessage<Room> = {
            key: 'ROOM:1_ROOM-DELETED',
            data: room
        }
        eventBus.verify(mock => mock.publish(message), TypeMoq.Times.once());
    });

});