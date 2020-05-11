import User from "./User";

interface Room {

    id?: number;
    name: string;
    numberOfGuests: number;
    owner: User;
    guests?: User[];

}

export default Room;