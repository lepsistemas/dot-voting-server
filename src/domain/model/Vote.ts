import User from "./User";
import Card from "./Card";

interface Vote {
    
    id?: number;
    voter: User;
    card: Card;

}

export default Vote;