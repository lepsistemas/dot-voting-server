import AllRooms from "./collection/AllRooms";

import Room from "../model/Room";
import RoomEntrance from "../model/RoomEntrance";
import User from "../model/User";

import RoomEntranceData from "./RoomEntranceData";
import UserData from "./UserData";

import CreateUser from "./CreateUser";

import RoomNotFoundException from "./exception/RoomNotFoundException";

class EnterRoom {

    private createUser: CreateUser;
    private allRooms: AllRooms;

    constructor(createUser: CreateUser, allRooms: AllRooms) {
        this.createUser = createUser;
        this.allRooms = allRooms;
    }

    with(data: RoomEntranceData): RoomEntrance {
        const room: Room = this.allRooms.byNameAndKey(data.name, data.key);
        if (!room) {
            throw new RoomNotFoundException();
        }

        const userData: UserData = {
            username: data.username,
            admin: false
        }
        
        let guest: User = null;
        try {
            guest = this.createUser.with(userData);
        } catch(e) {
            throw e;
        }

        if (!room.guests) {
            room.guests = [];
        }
        room.guests.push(guest);
        this.allRooms.put(room.id, room);

        const entrance: RoomEntrance = {
            id: room.id,
            guest: guest
        }

        return entrance;
    }

}

export default EnterRoom;