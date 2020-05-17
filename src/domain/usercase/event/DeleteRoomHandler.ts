import EventBus from './EventBus';
import EventMessage from './EventMessage';
import Room from "../../model/Room";

class DeleteRoomHandler {

    private static KEY: string = 'ROOM-DELETED';

    private eventBus: EventBus<Room>

    constructor(eventBus: EventBus<Room>) {
        this.eventBus = eventBus;
    }

    public handle(data: Room): void {
        const message: EventMessage<Room> = {
            key: `ROOM:${data.id}_${DeleteRoomHandler.KEY}`,
            data: data
        }
        this.eventBus.publish(message);
    }
}

export default DeleteRoomHandler;