import AllRooms from "./collection/AllRooms";
import Room from "../model/Room";
import RoomNotFoundException from "./exception/RoomNotFoundException";
import AllUsers from "./collection/AllUsers";
import DeleteRoomHandler from "./event/DeleteRoomHandler";

class DeleteRoom {

    private handler: DeleteRoomHandler;
    private allRooms: AllRooms;
    private allUsers: AllUsers;

    constructor(handler: DeleteRoomHandler, allRooms: AllRooms, allUsers: AllUsers) {
        this.handler = handler;
        this.allRooms = allRooms;
        this.allUsers = allUsers;
    }

    by(id: number): void {
        const room: Room = this.allRooms.byId(id);
        if (!room) {
            throw new RoomNotFoundException();
        }

        if (room.guests) {
            room.guests.forEach(guest => this.allUsers.remove(guest.id));
        }
        this.allUsers.remove(room.owner.id);
        this.allRooms.remove(id);

        this.handler.handle(room);
    }

}

export default DeleteRoom;