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

    public byId(id: number): Room {
        try {
            return this.allRooms.byId(id);
        } catch(e) {
            throw e;
        }
    }

    public byOwnerAndName(owner: string, name: string): Room {
        try {
            return this.allRooms.byOwnerAndName(owner, name);
        } catch(e) {
            throw e;
        }
    }

}

export default FetchRoom;