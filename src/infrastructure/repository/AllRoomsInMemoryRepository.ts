import AllRooms from '../../domain/usercase/collection/AllRooms';
import Room from '../../domain/model/Room';
import User from '../../domain/model/User';
import UserAlreadyInRoomException from '../../domain/usercase/exception/UserAlreadyInRoomException';

class AllRoomsInMemoryRepository implements AllRooms {

    private rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    get(): Room[] {
        return this.rooms;
    }
    
    add(room: Room): Room {
        const owner: User = room.owner;
        
        const ownersRoom: Room = this.rooms.find(r => r.owner.username === owner.username);
        if (ownersRoom) {
            throw new UserAlreadyInRoomException(owner.username);
        }

        const otherRoom: Room = this.rooms.find(r => r.name === room.name);
        if (otherRoom) {
            throw new Error(`Room ${room.name} already exists.`);
        }

        const lastId: number = this.rooms.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        room.id = lastId + 1;
        this.rooms.push(room);

        return room;
    }

}

export default AllRoomsInMemoryRepository;