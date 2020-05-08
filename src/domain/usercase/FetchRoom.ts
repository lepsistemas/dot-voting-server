import Room from '../model/Room';
import AllRooms from './collection/AllRooms';

class FetchRoom {

    private allRooms: AllRooms;

    constructor(allRooms: AllRooms) {
        this.allRooms = allRooms;
    }
    
    public all(): Room[] {
        return this.allRooms.get();
    }

    public by(id: number): Room {
        try {
            return this.allRooms.by(id);
        } catch(e) {
            throw e;
        }
    }

}

export default FetchRoom;