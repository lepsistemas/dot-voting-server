import AllRooms from "./collection/AllRooms";
import RoomEntranceData from "../model/RoomEntranceData";
import Room from "../model/Room";
import User from "../model/User";
import RoomNotFoundException from "./exception/RoomNotFoundException";
import UserAlreadyInRoomException from "./exception/UserAlreadyInRoomException";
import RoomIsFullException from "./exception/RoomIsFullException";

class EnterRoom {

    private allRooms: AllRooms;

    constructor(allRooms: AllRooms) {
        this.allRooms = allRooms;
    }

    with(data: RoomEntranceData): void {
        const room: Room = this.allRooms.byOwnerAndName(data.owner, data.name);
        if (!room) {
            throw new RoomNotFoundException();
        }
        if (room.owner.username === data.username) {
            throw new UserAlreadyInRoomException(data.username);
        }
        if (!room.guests) {
            room.guests = [];
        }
        const user: User = room.guests.find(guest => guest.username === data.username);
        if (user) {
            throw new UserAlreadyInRoomException(data.username);
        }
        if (room.numberOfGuests == room.guests.length) {
            throw new RoomIsFullException();
        }
        const guest: User = {
            username: data.username,
            admin: false
        }
        room.guests.push(guest);
        this.allRooms.put(room.id, room);
    }

}

export default EnterRoom;