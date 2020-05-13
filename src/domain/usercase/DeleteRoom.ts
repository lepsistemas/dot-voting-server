import AllRooms from "./collection/AllRooms";
import Room from "../model/Room";
import RoomNotFoundException from "./exception/RoomNotFoundException";
import AllUsers from "./collection/AllUsers";

class DeleteRoom {

    private allRooms: AllRooms;
    private allUsers: AllUsers;

    constructor(allRooms: AllRooms, allUsers: AllUsers) {
        this.allRooms = allRooms;
        this.allUsers = allUsers;
    }

    by(id: number): void {
        const room: Room = this.allRooms.byId(id);
        if (!room) {
            throw new RoomNotFoundException();
        }
        this.allUsers.remove(room.owner.id);
        this.allRooms.remove(id);
    }

}

export default DeleteRoom;