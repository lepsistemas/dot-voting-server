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

}

export default FetchRoom;