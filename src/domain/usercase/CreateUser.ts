import User from "../model/User";
import UserData from "./dto/UserData";
import AllUsers from "./collection/AllUsers";
import UserAlreadyExistsException from "./exception/UserAlreadyExistsException";

class CreateUser {

    private allUsers: AllUsers;

    constructor(allUsers: AllUsers) {
        this.allUsers = allUsers;
    }

    public with(data: UserData): User {
        const existingUser: User = this.allUsers.withUsername(data.username);
        if (existingUser) {
            throw new UserAlreadyExistsException(data.username);
        }

        const user: User = {
            username: data.username
        }

        return this.allUsers.add(user);
    }

}

export default CreateUser;