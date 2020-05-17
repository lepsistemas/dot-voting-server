class RoomExitRequest {

    id: number;
    userId: number;

    constructor(body: any) {
        this.id = body.id;
        this.userId = body.userId;
    }

}

export default RoomExitRequest;