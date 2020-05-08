import AllRooms from '../../domain/usercase/collection/AllRooms';
import Room from '../../domain/model/Room';
import User from '../../domain/model/User';
import UserAlreadyInRoomException from '../../domain/usercase/exception/UserAlreadyInRoomException';
import RoomAlreadyExistsException from '../../domain/usercase/exception/RoomAlreadyExistsException';
import RoomNotFoundException from '../../domain/usercase/exception/RoomNotFoundException';

class AllRoomsInMemoryRepository implements AllRooms {

    private rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    get(): Room[] {
        return this.rooms;
    }

    by(id: number): Room {
        const room: Room = this.rooms.find(room => room.id === id);
        if (!room) {
            throw new RoomNotFoundException();
        }
        return room;
    }
    
    add(room: Room): Room {
        const owner: User = room.owner;
        
        const ownersRoom: Room = this.rooms.find(r => r.owner.username === owner.username);
        if (ownersRoom) {
            throw new UserAlreadyInRoomException(owner.username);
        }

        const otherRoom: Room = this.rooms.find(r => r.name === room.name);
        if (otherRoom) {
            throw new RoomAlreadyExistsException(room.name);
        }

        const lastId: number = this.rooms.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        room.id = lastId + 1;
        this.rooms.push(room);

        return room;
    }

}

export default AllRoomsInMemoryRepository;