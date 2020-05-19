class RoomLockerRequest {

    id: number;
    lock: boolean;

    constructor(body: any) {
        this.lock = body.lock === false ? false : true;
    }

}

export default RoomLockerRequest;