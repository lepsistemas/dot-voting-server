import EventBus from './EventBus';
import EventMessage from './EventMessage';
import Guest from "../../model/Guest";

class EnterRoomHandler {

    private static KEY: string = 'ROOM-CHANGED';

    private eventBus: EventBus<Guest>

    constructor(eventBus: EventBus<Guest>) {
        this.eventBus = eventBus;
    }

    public handle(data: Guest): void {
        const message: EventMessage<Guest> = {
            key: `ROOM:${data.room.id}_${EnterRoomHandler.KEY}`,
            data: data
        }
        this.eventBus.publish(message);
    }
}

export default EnterRoomHandler;