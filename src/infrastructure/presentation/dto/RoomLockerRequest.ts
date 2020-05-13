class RoomLockerRequest {

    id: number;
    lock: boolean;

    constructor(body: any) {
        this.lock = body.lock;
    }

}

export default RoomLockerRequest;