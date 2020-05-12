import UserResponse from "./dto/UserResponse";
import User from "../../domain/model/User";
import UserToResponse from "../convert/UserToResponse";
import FetchUser from "../../domain/usercase/FetchUser";

class UserController {
    
    private fetchUser: FetchUser;

    constructor(fetchUser: FetchUser) {
        this.fetchUser = fetchUser;
    }

    public all(): UserResponse[] {
        const users: User[] = this.fetchUser.all();
        return users.map(user => UserToResponse.convert(user));
    }

}

export default UserController;