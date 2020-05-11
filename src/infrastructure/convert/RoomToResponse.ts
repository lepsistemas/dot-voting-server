import RoomResponse from "../presentation/dto/RoomResponse";
import Room from "../../domain/model/Room";
import UserResponse from "../presentation/dto/UserResponse";
import UserToResponse from "./UserToResponse";

class RoomToResponse {

    static convert(room: Room): RoomResponse {
        let guests: UserResponse[] = [];
        if (room.guests) {
            guests = room.guests.map(guest => UserToResponse.convert(guest));
        }
        const converted: RoomResponse = {
            id: room.id,
            name: room.name,
            numberOfGuests: room.numberOfGuests,
            owner: UserToResponse.convert(room.owner),
            guests: guests
        }

        return converted;
    }

}

export default RoomToResponse;