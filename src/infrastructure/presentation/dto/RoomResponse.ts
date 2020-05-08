import UserResponse from "./UserResponse";

interface RoomResponse {

    id: number;
    name: string;
    numberOfGuests: number;
    owner: UserResponse;
}

export default RoomResponse;