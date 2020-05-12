import Room from "../model/Room";
import RoomData from "../model/RoomData";
import AllRooms from "./collection/AllRooms";

class CreateRoom {

    private allRooms: AllRooms;

    constructor(allRooms: AllRooms) {
        this.allRooms = allRooms;
    }

    public with(data: RoomData): Room {
        const room: Room = {
            name: data.name,
            numberOfGuests: data.numberOfGuests,
            owner: {
                username: data.username,
                admin: true
            },
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