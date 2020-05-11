class RoomIsFullException extends Error {

    constructor() {
        super();
        this.message = 'Room is full.';
    }

}

export default RoomIsFullException;