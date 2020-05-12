import User from "../model/User";
import UserData from "./UserData";
import AllUsers from "./collection/AllUsers";
import UserAlreadyExistsException from "./exception/UserAlreadyExistsException";

class CreateUser {

    private allUsers: AllUsers;

    constructor(allUsers: AllUsers) {
        this.allUsers = allUsers;
    }

    with(data: UserData): User {
        const existingUser: User = this.allUsers.withUsername(data.username);
        if (existingUser) {
            throw new UserAlreadyExistsException(data.username);
        }

        const user: User = {
            username: data.username,
            admin: data.admin
        }

        return this.allUsers.add(user);
    }

}

export default CreateUser;