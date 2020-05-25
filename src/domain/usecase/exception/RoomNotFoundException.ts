class RoomNotFoundException extends Error {

    constructor() {
        super();
        this.message = 'Room not found.';
    }

}

export default RoomNotFoundException;