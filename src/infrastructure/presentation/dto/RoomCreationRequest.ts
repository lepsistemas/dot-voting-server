class RoomCreationRequest {
    
    name: string;
    username: string;

    constructor(body: any) {
        this.name = body.name;
        this.username = body.username;
    }
}

export default RoomCreationRequest;