import RoomEntranceResponse from "../presentation/dto/RoomEntranceResponse";
import RoomEntrance from "../../domain/model/RoomEntrance";
import UserToResponse from "./UserToResponse";

class RoomEntranceToResponse {

    static convert(entrance: RoomEntrance): RoomEntranceResponse {
        const converted: RoomEntranceResponse = {
            id: entrance.id,
            guest: UserToResponse.convert(entrance.guest)
        }

        return converted;
    }

}

export default RoomEntranceToResponse;