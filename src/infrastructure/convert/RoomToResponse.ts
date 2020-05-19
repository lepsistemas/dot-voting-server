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
            key: room.key,
            name: room.name,
            owner: UserToResponse.convert(room.owner),
            locked: room.locked === false ? false : true,
            guests: guests,
            maxVotes: room.maxVotes,
            allowMultipleVotesPerCard: room.allowMultipleVotesPerCard
        }

        return converted;
    }

}

export default RoomToResponse;