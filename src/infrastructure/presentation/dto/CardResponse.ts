import RoomResponse from "./RoomResponse";
import UserResponse from "./UserResponse";

interface CardResponse {

    id: number;
    room: RoomResponse;
    author: UserResponse;
    title: string;
    description: string;
    votes: number;

}

export default CardResponse;