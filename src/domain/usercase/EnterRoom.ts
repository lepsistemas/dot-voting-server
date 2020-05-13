import AllRooms from "./collection/AllRooms";

import Room from "../model/Room";
import RoomEntrance from "../model/RoomEntrance";
import User from "../model/User";

import RoomEntranceData from "./RoomEntranceData";
import UserData from "./UserData";

import CreateUser from "./CreateUser";

import AllUsers from "./collection/AllUsers";

import RoomNotFoundException from "./exception/RoomNotFoundException";
import RoomIsLockedException from "./exception/RoomIsLockedException";

class EnterRoom {

    private createUser: CreateUser;
    private allUsers: AllUsers;
    private allRooms: AllRooms;

    constructor(createUser: CreateUser, allUsers: AllUsers, allRooms: AllRooms) {
        this.allUsers = allUsers;
        this.createUser = createUser;
        this.allRooms = allRooms;
    }

    with(data: RoomEntranceData): RoomEntrance {
        const room: Room = this.allRooms.byNameAndKey(data.name, data.key);
        if (!room) {
            throw new RoomNotFoundException();
        }

        if (room.owner.username !== data.username && room.locked) {
            throw new RoomIsLockedException(room.owner.username);
        }

        if (!room.guests) {
            room.guests = [];
        }

        let guest: User = this.allUsers.byUsername(data.username);
        if (!guest) {
            const userData: UserData = {
                username: data.username,
                admin: false
            }
            
            try {
                guest = this.createUser.with(userData);
            } catch(e) {
                throw e;
            }
            room.guests.push(guest);
        }
        this.allRooms.put(room.id, room);

        const entrance: RoomEntrance = {
            id: room.id,
            guest: guest
        }

        return entrance;
    }

}

export default EnterRoom;