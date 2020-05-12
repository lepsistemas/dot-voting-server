class UserNotFoundException extends Error {

    constructor() {
        super();
        this.message = 'User not found.';
    }

}

export default UserNotFoundException;