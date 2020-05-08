class RoomRequest {
    
    name: string;
    username: string;
    numberOfGuests: number;

    constructor(body: any) {
        this.name = body.name;
        this.username = body.username;
        this.numberOfGuests = body.numberOfGuests;
    }
}

export default RoomRequest;