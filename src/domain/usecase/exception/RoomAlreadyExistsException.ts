class RoomAlreadyExistsException extends Error {

    constructor(name: string) {
        super();
        this.message = `Room ${name} already exists.`;
    }

}

export default RoomAlreadyExistsException;