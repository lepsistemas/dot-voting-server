import Guest from "../../domain/model/Guest";
import GuestResponse from "../presentation/dto/GuestResponse";
import RoomToResponse from "./RoomToResponse";
import UserToResponse from "./UserToResponse";

class GuestToResponse {

    static convert(guest: Guest): GuestResponse {
        const converted: GuestResponse = {
            room: RoomToResponse.convert(guest.room),
            user: UserToResponse.convert(guest.user)
        }

        return converted;
    }

}

export default GuestToResponse;