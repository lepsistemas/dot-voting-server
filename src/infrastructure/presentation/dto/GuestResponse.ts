import RoomResponse from "./RoomResponse";
import UserResponse from "./UserResponse";

interface GuestResponse {

    room: RoomResponse;
    user: UserResponse;
}

export default GuestResponse;