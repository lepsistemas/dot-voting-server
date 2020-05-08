import RoomResponse from "../presentation/dto/RoomResponse";
import Room from "../../domain/model/Room";

class RoomToResponse {

    static convert(room: Room): RoomResponse {
        const converted: RoomResponse = {
            id: room.id,
            name: room.name,
            numberOfGuests: room.numberOfGuests,
            owner: {
                username: room.owner.username,
                admin: room.owner.admin
            }
        }

        return converted;
    }

}

export default RoomToResponse;