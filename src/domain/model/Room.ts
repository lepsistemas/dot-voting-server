import User from "./User";

interface Room {

    id?: number;
    key: string;
    name: string;
    owner: User;
    locked: boolean;
    guests?: User[];

}

export default Room;