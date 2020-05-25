import RoomLockerData from "./dto/RoomLockerData";
import Room from "../model/Room";
import AllRooms from "./collection/AllRooms";
import RoomNotFoundException from "./exception/RoomNotFoundException";

class LockerRoom {

    private allRooms: AllRooms;

    constructor(allRooms: AllRooms) {
        this.allRooms = allRooms;
    }

    public with(data: RoomLockerData): Room {
        const room: Room = this.allRooms.byId(data.id);
        if (!room) {
            throw new RoomNotFoundException();
        }
        room.locked = data.lock === false ? false : true;
        this.allRooms.put(room.id, room);
        return this.allRooms.byId(room.id);
    }

}

export default LockerRoom;