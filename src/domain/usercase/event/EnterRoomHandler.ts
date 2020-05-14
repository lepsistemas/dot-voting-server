import EnterRoom from "../EnterRoom";
import RoomEntranceData from "../dto/RoomEntranceData";

import User from "../../../domain/model/User";
import RoomEntrance from "../../../domain/model/RoomEntrance";

import EventBus from './EventBus';
import EventMessage from './EventMessage';
import Room from "../../../domain/model/Room";

class EnterRoomHandler {

    private static KEY: string = "ROOM-ENTERED";

    private eventBus: EventBus<RoomEntrance>

    constructor(eventBus: EventBus<RoomEntrance>) {
        this.eventBus = eventBus;
    }

    public handle(data: RoomEntrance): void {
        const message: EventMessage<RoomEntrance> = {
            key: `ROOM:${data.id}_${EnterRoomHandler.KEY}`,
            data: data
        }
        this.eventBus.publish(message);
    }
}

export default EnterRoomHandler;