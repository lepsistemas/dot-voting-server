import UserResponse from "./UserResponse";

interface RoomResponse {

    id: number;
    key: string;
    name: string;
    owner: UserResponse;
    locked: boolean;
    guests?: UserResponse[];
    numberOfVotes: number;
    allowMultipleVotesPerCard: boolean;
    showResults: boolean;
}

export default RoomResponse;