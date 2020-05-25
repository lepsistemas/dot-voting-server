import UserResponse from "./dto/UserResponse";
import User from "../../domain/model/User";
import UserToResponse from "../convert/UserToResponse";
import FetchUser from "../../domain/usecase/FetchUser";
import ErrorResponse from "./dto/ErrorResponse";

class UserController {
    
    private fetchUser: FetchUser;

    constructor(fetchUser: FetchUser) {
        this.fetchUser = fetchUser;
    }

    public all(): UserResponse[] {
        const users: User[] = this.fetchUser.all();
        return users.map(user => UserToResponse.convert(user));
    }

    public id(id: number): UserResponse | ErrorResponse {
        try {
            const user: User = this.fetchUser.byId(id);
            return UserToResponse.convert(user);
        } catch(e) {
            return {
                error: {
                    status: 400,
                    message: e.message
                }
            };
        }
    }

}

export default UserController;