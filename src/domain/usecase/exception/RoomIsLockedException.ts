class RoomIsLockedException extends Error {

    constructor(owner: string) {
        super();
        this.message = `Room is locked. Owner ${owner} must open it first.`;
    }

}

export default RoomIsLockedException;