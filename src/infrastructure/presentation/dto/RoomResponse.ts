import UserResponse from "./UserResponse";

interface RoomResponse {

    id: number;
    name: string;
    numberOfGuests: number;
    owner: UserResponse;
    guests?: UserResponse[]
}

export default RoomResponse;