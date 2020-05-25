import AllUsers from "./collection/AllUsers";
import User from "../model/User";
import UserNotFoundException from "./exception/UserNotFoundException";

class FetchUser {

    private allUsers: AllUsers;

    constructor(allUsers: AllUsers) {
        this.allUsers = allUsers;
    }

    public all(): User[] {
        return this.allUsers.all();
    }

    public byId(id: number): User {
        const user: User = this.allUsers.byId(id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

    public byUsername(username: string): User {
        const user: User = this.allUsers.byUsername(username);
        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

}

export default FetchUser;