import User from "../../domain/model/User";
import UserResponse from "../presentation/dto/UserResponse";

class UserToResponse {

    static convert(user: User): UserResponse {
        const converted: UserResponse= {
            id: user.id,
            username: user.username,
            admin: user.admin
        }
        return converted;
    }

}

export default UserToResponse;