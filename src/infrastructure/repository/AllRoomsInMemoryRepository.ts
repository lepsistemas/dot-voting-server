import AllRooms from '../../domain/usercase/collection/AllRooms';
import Room from '../../domain/model/Room';

class AllRoomsInMemoryRepository implements AllRooms {

    private rooms: Room[];

    constructor() {
        this.rooms = [];
    }

    all(): Room[] {
        return this.rooms;
    }

    byId(id: number): Room {
        return this.rooms.find(room => room.id === id);
    }

    byNameAndKey(name: string, key: string): Room {
        return this.rooms.find(room => room.name === name && room.key === key);
    }
    
    add(room: Room): Room {
        const lastId: number = this.rooms.reduce((previous, current) => (previous > current.id) ? previous : current.id, 0);
        room.id = lastId + 1;
        this.rooms.push(room);

        return room;
    }

    put(id: number, room: Room): void {
        this.rooms.map(r => {
            if (r.id === id) {
                return room;
            }
            return r;
        })
    }

}

export default AllRoomsInMemoryRepository;