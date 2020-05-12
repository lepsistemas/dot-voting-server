import Room from '../model/Room';
import AllRooms from './collection/AllRooms';
import RoomNotFoundException from './exception/RoomNotFoundException';

class FetchRoom {

    private allRooms: AllRooms;

    constructor(allRooms: AllRooms) {
        this.allRooms = allRooms;
    }
    
    public all(): Room[] {
        return this.allRooms.all();
    }

    public byId(id: number): Room {
        const room: Room = this.allRooms.byId(id);
        if (!room) {
            throw new RoomNotFoundException();
        }
        return room;
    }

    public byNameAndKey(name: string, key: string): Room {
        const room: Room = this.allRooms.byNameAndKey(name, key);
        if (!room) {
            throw new RoomNotFoundException();
        }
        return room;
    }

}

export default FetchRoom;