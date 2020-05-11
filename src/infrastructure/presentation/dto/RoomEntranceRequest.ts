class RoomEntranceRequest {

    owner: string;
    name: string;
    username: string;

    constructor(body: any) {
        this.owner = body.owner;
        this.name = body.name;
        this.username = body.username;
    }

}

export default RoomEntranceRequest;