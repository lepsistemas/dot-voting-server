import AllRooms from "./collection/AllRooms";

import Room from "../model/Room";
import User from "../model/User";
import Guest from "../model/Guest";

import RoomEntranceData from "./dto/RoomEntranceData";
import UserData from "./dto/UserData";

import CreateUser from "./CreateUser";

import AllUsers from "./collection/AllUsers";

import RoomNotFoundException from "./exception/RoomNotFoundException";
import RoomIsLockedException from "./exception/RoomIsLockedException";

import EnterRoomHandler from "./event/EnterRoomHandler";

class EnterRoom {

    private createUser: CreateUser;
    private allUsers: AllUsers;
    private allRooms: AllRooms;
    private handler: EnterRoomHandler;

    constructor(handler: EnterRoomHandler, createUser: CreateUser, allUsers: AllUsers, allRooms: AllRooms) {
        this.allUsers = allUsers;
        this.createUser = createUser;
        this.allRooms = allRooms;
        this.handler = handler;
    }

    with(data: RoomEntranceData): Guest {
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

        let user: User = this.allUsers.byUsername(data.username);
        if (!user) {
            const userData: UserData = {
                username: data.username,
                admin: false
            }
            
            try {
                user = this.createUser.with(userData);
            } catch(e) {
                throw e;
            }
        }
        room.guests.push(user);
        this.allRooms.put(room.id, room);

        const guest: Guest = {
            room: room,
            user: user
        }

        this.handler.handle(guest);

        return guest;
    }

}

export default EnterRoom;