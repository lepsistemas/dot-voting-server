import AllRooms from "./collection/AllRooms";
import AllUsers from "./collection/AllUsers";

import RoomExitData from "./dto/RoomExitData";

import Room from "../model/Room";
import User from "../model/User";
import Guest from "../model/Guest";

import RoomNotFoundException from "./exception/RoomNotFoundException";
import UserNotFoundException from "./exception/UserNotFoundException";

import ExitRoomHandler from "./event/ExitRoomHandler";

import DeleteRoom from "./DeleteRoom";

class ExitRoom {

    private handler: ExitRoomHandler;
    private deleteRoom: DeleteRoom;
    private allRooms: AllRooms;
    private allUsers: AllUsers;

    constructor(handler: ExitRoomHandler, deleteRoom: DeleteRoom, allRooms: AllRooms, allUsers: AllUsers) {
        this.handler = handler;
        this.deleteRoom = deleteRoom;
        this.allRooms = allRooms;
        this.allUsers = allUsers;
    }

    with(data: RoomExitData): Guest {
        const room: Room = this.allRooms.byId(data.id);
        if (!room) {
            throw new RoomNotFoundException();
        }
        
        const user: User = this.allUsers.byId(data.userId);
        if (!user) {
            throw new UserNotFoundException();
        }

        if (room.owner.id === user.id) {
            this.deleteRoom.by(room.id);
        } else {
            if (!room.guests) {
                throw new UserNotFoundException();
            }
            room.guests = room.guests.filter(u => u.id !== user.id);
            this.allRooms.put(room.id, room);
        }

        const guest: Guest = {
            room: room,
            user: user
        }

        this.handler.handle(guest);

        return guest;
    }

}

export default ExitRoom;