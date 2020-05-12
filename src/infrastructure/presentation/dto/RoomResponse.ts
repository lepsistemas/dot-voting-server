import UserResponse from "./UserResponse";

interface RoomResponse {

    id: number;
    name: string;
    numberOfGuests: number;
    owner: UserResponse;
    locked: boolean;
    guests?: UserResponse[]
}

export default RoomResponse;