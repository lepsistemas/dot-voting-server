class RoomEntranceRequest {

    name: string;
    key: string;
    username: string;

    constructor(body: any) {
        this.name = body.name;
        this.key = body.key;
        this.username = body.username;
    }

}

export default RoomEntranceRequest;