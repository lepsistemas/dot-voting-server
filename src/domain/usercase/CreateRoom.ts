import Room from "../model/Room";
import RoomData from "./dto/RoomData";
import User from "../model/User";

import AllRooms from "./collection/AllRooms";
import CreateUser from "./CreateUser";
import UserData from "./dto/UserData";

import UserAlreadyInRoomException from "./exception/UserAlreadyInRoomException";
import RoomAlreadyExistsException from "./exception/RoomAlreadyExistsException";
import GenerateKey from "./GenerateKey";

class CreateRoom {

    private createUser: CreateUser;
    private allRooms: AllRooms;

    constructor(createUser: CreateUser, allRooms: AllRooms) {
        this.createUser = createUser;
        this.allRooms = allRooms;
    }

    public with(data: RoomData): Room {
        let owner: User = null;
        try {
            const user: UserData = {
                username: data.username,
                admin: true
            }
            owner = this.createUser.with(user);
        } catch(e) {
            throw e;
        }

        const rooms: Room[] = this.allRooms.all();
        const ownersRoom: Room = rooms.find(r => r.owner.username === owner.username);
        if (ownersRoom) {
            throw new UserAlreadyInRoomException(owner.username);
        }

        const otherRoom: Room = rooms.find(r => r.name === data.name);
        if (otherRoom) {
            throw new RoomAlreadyExistsException(otherRoom.name);
        }
        
        const key: string = GenerateKey.withSize(8);

        const room: Room = {
            name: data.name,
            key: key,
            owner: owner,
            locked: true
        }
        try {
            return this.allRooms.add(room);
        } catch(e) {
            throw e;
        }
    }

}

export default CreateRoom;