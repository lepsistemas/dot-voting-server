import User from "./User";

interface Room {

    id?: number;
    key: string;
    name: string;
    owner: User;
    locked: boolean;
    guests?: User[];
    numberOfVotes: number;
    allowMultipleVotesPerCard: boolean;
    showResults: boolean;

}

export default Room;