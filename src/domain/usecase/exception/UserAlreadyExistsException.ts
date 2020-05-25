class UserAlreadyExistsException extends Error {

    constructor(username: string) {
        super();
        this.message = `User ${username} already exists.`;
    }

}

export default UserAlreadyExistsException;