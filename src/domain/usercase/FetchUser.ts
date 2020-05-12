import AllUsers from "./collection/AllUsers";
import User from "../model/User";

class FetchUser {

    private allUsers: AllUsers;

    constructor(allUsers: AllUsers) {
        this.allUsers = allUsers;
    }

    all(): User[] {
        return this.allUsers.all();
    }

}

export default FetchUser;