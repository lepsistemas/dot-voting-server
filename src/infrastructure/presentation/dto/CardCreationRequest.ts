class CardCreationRequest {

    roomId: number;
    userId: number;
    title: string;
    description: string;

    constructor(body: any) {
        this.roomId = body.roomId;
        this.userId = body.userId;
        this.title = body.title;
        this.description = body.description;
    }

}

export default CardCreationRequest;