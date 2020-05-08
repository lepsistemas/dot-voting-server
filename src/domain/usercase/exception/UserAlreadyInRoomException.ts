class UserAlreadyInRoomException extends Error {

    constructor(username: string) {
        super();
        this.message = `User ${username} is already in a room.`;
    }

}

export default UserAlreadyInRoomException;