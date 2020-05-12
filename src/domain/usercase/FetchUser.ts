import AllUsers from "./collection/AllUsers";
import User from "../model/User";
import UserNotFoundException from "./exception/UserNotFoundException";

class FetchUser {

    private allUsers: AllUsers;

    constructor(allUsers: AllUsers) {
        this.allUsers = allUsers;
    }

    all(): User[] {
        return this.allUsers.all();
    }

    byId(id: number): User {
        const user: User = this.allUsers.byId(id);
        if (!user) {
            throw new UserNotFoundException();
        }
        return user;
    }

}

export default FetchUser;