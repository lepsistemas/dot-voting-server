import Card from "../model/Card";
import CardCreationData from "./dto/CardCreationData";
import Room from "../model/Room";
import AllRooms from "./collection/AllRooms";
import RoomNotFoundException from "./exception/RoomNotFoundException";

class CreateCard {

    private allRooms: AllRooms;

    constructor(allRooms: AllRooms) {
        this.allRooms = allRooms;
    }

    public with(data: CardCreationData): Card {
        const room: Room = this.allRooms.byId(data.roomId);
        if (!room) {
            throw new RoomNotFoundException();
        }
        return null;
    }

}

export default CreateCard;