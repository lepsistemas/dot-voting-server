import Room from "./Room";
import User from "./User";

interface Card {

    id?: number;
    title: string;
    description: string;
    author: User;
    room: Room;

}

export default Card;