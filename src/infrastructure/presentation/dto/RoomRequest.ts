class RoomRequest {
    
    name: string;
    username: string;

    constructor(body: any) {
        this.name = body.name;
        this.username = body.username;
    }
}

export default RoomRequest;