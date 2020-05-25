import Room from "../model/Room";
import RoomCreationData from "./dto/RoomCreationData";
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
    private generateKey: GenerateKey;

    constructor(createUser: CreateUser, allRooms: AllRooms, generateKey: GenerateKey) {
        this.createUser = createUser;
        this.allRooms = allRooms;
        this.generateKey = generateKey;
    }

    public with(data: RoomCreationData): Room {
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
        
        const key: string = this.generateKey.withSize(8);

        const room: Room = {
            name: data.name,
            key: key,
            owner: owner,
            locked: true,
            numberOfVotes: 0,
            allowMultipleVotesPerCard: false,
            showResults: false
        }
        return this.allRooms.add(room);
    }

}

export default CreateRoom;