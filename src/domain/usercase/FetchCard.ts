import AllCards from "./collection/AllCards";
import Card from "../model/Card";
import AllRooms from "./collection/AllRooms";
import Room from "../model/Room";
import RoomNotFoundException from "./exception/RoomNotFoundException";

class FetchCard {

    private allRooms: AllRooms;
    private allCards: AllCards;

    constructor(allRooms: AllRooms, allCards: AllCards) {
        this.allRooms = allRooms;
        this.allCards = allCards;
    }

    public fromRoom(roomId: number): Card[] {
        const room: Room = this.allRooms.byId(roomId);
        if (!room) {
            throw new RoomNotFoundException();
        }

        return this.allCards.belongingTo(roomId);
    }

}

export default FetchCard;