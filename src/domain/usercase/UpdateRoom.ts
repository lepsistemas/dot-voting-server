import RoomNotFoundException from "./exception/RoomNotFoundException";
import AllRooms from "./collection/AllRooms";
import Room from "../model/Room";
import RoomUpdateData from "./dto/RoomUpdateData";

class UpdateRoom {

    private allRooms: AllRooms;

    constructor(allRooms: AllRooms) {
        this.allRooms = allRooms;
    }
    
    public with(id: number, data: RoomUpdateData): Room {
        const room: Room = this.allRooms.byId(id);
        if (!room) {
            throw new RoomNotFoundException();
        }

        if (data.numberOfVotes) {
            room.numberOfVotes = data.numberOfVotes;
        }
        if (data.allowMultipleVotesPerCard !== undefined) {
            room.allowMultipleVotesPerCard = data.allowMultipleVotesPerCard === false ? false : true;
        }
        if (data.showResults !== undefined) {
            room.showResults = data.showResults === false ? false : true;
        }

        this.allRooms.put(room.id, room);

        return room;
    }

}

export default UpdateRoom;